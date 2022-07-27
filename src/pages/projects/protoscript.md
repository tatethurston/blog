---
layout: "../../layouts/Page.astro"
title: "ProtoScript"
description: "A protocol buffers runtime and code generation tool for JavaScript and TypeScript."
keywords: "protocol buffers, protobuf, javascript, typescript"
publishDate: "6 Jul 2022"
---

tl;dr I launched [ProtoScript](https://www.npmjs.com/package/protoscript), a modern protocol buffers runtime and code generation tool for JavaScript and TypeScript.

## why

I took a look at the existing [protobuf](https://developers.google.com/protocol-buffers) implementations in JavaScript and nothing _quite_ matched what I was looking for. In particular I wanted the following:

- TypeScript types.
- [JavaScript Modules (ESM)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules).
- [JSON support](https://developers.google.com/protocol-buffers/docs/proto3#json). Ideally with an identical generated interface to the generated protobuf serializers so Protobuf and JSON serializers can be swapped out trivially, whichis particularly useful when debugging messages over the wire.
- First classed dead code elimination, so any unused messages or serialization code are dropped from builds. I'm serializing protobuf or json (usually only when debugging), but almost never both and I don't want to ship unused serialization code to clients.
- Doc comments generated from comments in the `proto` file.
- A small runtime. Reliance on modern browser / node capabilities instead of polyfills targeting lowest common denominator web clients. Eg `bigint` instead of something like [numbers.js](https://github.com/numbers/numbers.js).
- Sensible defaults. Zero configuration out of the box.

Looking at that list seems like a lot, but it largely boils down to a modern JavaScript runtime and target, first classed TypeScript support, and preserving `proto` comments as [TSDoc](https://tsdoc.org/) or [JSDoc](https://jsdoc.app/).

## better code generation

Google's [google-protobuf](https://www.npmjs.com/package/google-protobuf) is by far the most popular protobuf runtime for JavaScript. It leverages the `protoc` compiler to generate JavaScript source code when used with the `--js-out` option. Originally I sought out to leverage the `google-protobuf` runtime, and replace the JavaScript code generation from `protoc` because:

1. It doesn't generate TypeScript types (though there are plugins to achieve this).
1. It doesn't generate JSON serializes (this is a long outstanding issue on the project's GitHub).
1. It doesn't preserve `proto` comments in the generated JavaScript.
1. And my biggest complaint: the generated JavaScript is not idiomatic. The generated interfaces are heavily Java-esque with `getX` and `setX` methods for every attribute and even `XList` suffix naming for array attributes.

So, I wrote a code generation tool. Given the following `proto` message:

```proto
syntax = "proto3";

// A Hat is a piece of headwear made by a Haberdasher.
message Hat {
  int32 inches = 1;
  // anything but "invisible"
  string color = 2;
  // i.e. "bowler"
  string name = 3;
}
```

ProtoScript will generate an interface like the following (omitting serialization code to focus on the generated interface developers work with):

```ts
/**
 * A Hat is a piece of headwear made by a Haberdasher.
 */
export interface Hat {
  inches: number;
  /**
   * anything but "invisible"
   */
  color: string;
  /**
   * i.e. "bowler"
   */
  name: string;
}

export const Hat = {
  /**
   * Initializes Hat with all fields set to their default value.
   */
  initialize: function (): Hat {
    return {
      inches: 0,
      color: "",
      name: "",
    };
  },
};
```

And `protoc` will generate the following (again omitting serialization code to focus on the generated interface developers work with):

```js
proto.Hat = function (opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.Hat, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.Hat.displayName = "proto.Hat";
}

proto.Hat.prototype.getInches = function () {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};

proto.Hat.prototype.setInches = function (value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};

proto.Hat.prototype.getColor = function () {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};

proto.Hat.prototype.setColor = function (value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};

proto.Hat.prototype.getName = function () {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};

proto.Hat.prototype.setName = function (value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};
```

You can do a more in depth comparison including the generated serialization code by comparing [protoc's generated file](https://github.com/tatethurston/ProtoScript/blob/main/examples/protoc/src/haberdasher_pb.js) to [protoscript's generated file](https://github.com/tatethurston/ProtoScript/blob/main/examples/protoc/src/haberdasher.pb.js). Note that `protoc` does not generate a JSON runtime and `ProtoScript` does.

## a smaller runtime

Once I began using ProtoScript, I noticed it was contributing more weight to my client bundle size than I wanted for my application's serialization layer. I also noted a number of webpack warnings about a particularly large chunk: `google-protobuf`.

So, I expanded ProtoScript to include a runtime. I rewrote many pieces of `google-protobuf`, most notably replacing all of the bundled closure compiler runtime pieces with modern browser / nodejs APIs like `bigint`, `TextEncoder`, and `TextDecoder`, and converting the source to use JavaScript modules (ESM) instead of closure compiler exports.

The final result was `ProtoScript` clocking in at 67KB (9.6KB gzipped) compared to `google-protobuf`'s 231KB (46KB gzipped). Because ProtoScript is written in ESM, actual bundle size may be even smaller and nearly the entire runtime will tree shake out for JSON only clients.

There is still room for improvement to slim ProtoScript further, particularly because the runtime can break from the interface expectations of `protoc`.

## the final result

[ProtoScript](https://github.com/tatethurston/ProtoScript/) highlights:

1. Idiomatic JavaScript / TypeScript code. None of the Java idioms that `protoc --js_out` generates such as the `List` suffix naming for repeated fields, `Map` suffix for maps, or the various getter and setter methods. ProtoScript generates and consumes plain JavaScript objects over classes. Compare the [TypeScript example](https://github.com/tatethurston/ProtoScript/blob/main/examples/typescript/src/haberdasher.pb.ts) to the [protoc example](https://github.com/tatethurston/ProtoScript/blob/main/examples/protoc/src/haberdasher_pb.js).

2. In-editor API documentation. Comments in your `.proto` files become [TSDoc](https://github.com/microsoft/tsdoc) comments in the generated code and will show inline documentation in supported editors.

3. JSON Serialization/Deserialization. Unlike `protoc`, ProtoScript's code generation generates JSON serialization and deserialization methods.

4. Small. ProtoScript's runtime and generated code are built with [tree shaking](https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking) to minimize bundle sizes. This results in a significantly smaller bundle size than [google-protobuf](https://www.npmjs.com/package/google-protobuf). ProtoScript's runtime is 67KB (9.6KB gzipped) compared to google-protobuf's 231KB (46KB gzipped).

5. Isomorphic. ProtoScript's generated serializers/deserializers can be consumed in the browser or Node.js runtimes.

6. No additional runtime dependencies.

If you'd like to try it out, see the [installation instructions](https://github.com/tatethurston/ProtoScript#installation-).

Any questions? Hop into the Reddit [announcement thread](https://www.reddit.com/r/javascript/comments/vt0fn3/protoscript_a_protocol_buffers_runtime_and_code/). Or, [open an issue](https://github.com/tatethurston/ProtoScript/issues/new).
