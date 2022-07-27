---
layout: "../../layouts/Page.astro"
title: "TwirpScript"
description: "A protocol buffers RPC framework for JavaScript and TypeScript."
keywords: "twirp, rpc, protocol buffers, protobuf, javascript, typescript"
publishDate: "27 Oct 2021"
---

tl;dr I launched [TwirpScript](https://www.npmjs.com/package/twirpscript), a simple protocol buffers RPC framework for JavaScript and TypeScript.

## overview

TwirpScript is a simple RPC framework built on [protocol buffers](https://developers.google.com/protocol-buffers/). TwirpScript is a TypeScript implementation of Twitch's [Twirp](https://blog.twitch.tv/en/2018/01/16/twirp-a-sweet-new-rpc-framework-for-go-5f2febbf35f/). TwirpScript autogenerates service stubs and clients from `.proto` service specifications. The generated clients can be used in the browser or in Node.js runtimes. This enables type safe communication between the client and server, as well as reduced payload sizes when using `protobuf` as the serialization format.

You define your service in a `.proto` specification file, and TwirpScript will generate client and service handlers for that service. You fill in the business logic that powers the server, and TwirpScript handles the boilerplate.

TwirpScript can be used to generate JavaScript or TypeScript clients for an existing Twirp service, a JavaScript or TypeScript Twirp Server, or both.

## why

I couldn't find any maintained Twirp client or server runtimes for JavaScript. If you look at Twirp's [implementation list](https://github.com/twitchtv/twirp), you'll notice Hopin's [excellent implementation](https://github.com/hopin-team/twirp-ts). `TwirpScript` and `twirp-ts` [launched around the same time](https://github.com/tatethurston/TwirpScript/issues/1). The two projects make slightly different trade offs so if you're considering Twirp take a look at their respective documentation to decide which is right for your project.

## why use Twirp instead of GRPC?

[gRPC](https://grpc.io/) has a large runtime (and corresponding complexity) that is unnecessary for the applications I generally develop. Twitch's [Twirp](https://blog.twitch.tv/en/2018/01/16/twirp-a-sweet-new-rpc-framework-for-go-5f2febbf35f/) offers many of the benefits of `gRPC` with a significantly simplified runtime.

## why use Twirp instead of GraphQL or REST?

For multiple clients (eg web, iOS and Android) with distinct views, I would pull in [GraphQL](https://graphql.org/). For a single UI client I prefer the simpler architecture (and well defined optimization paths) found with a more traditional API server approach. A JSON API lacks type safety and the DX that comes from static typing. This can be mitigated to an extent with tools like [JSON Schema](https://json-schema.org/), but that route requires stitching together (and maintaining) a suite of tools to achieve a similar DX.

## the final result

[TwirpScript](https://github.com/tatethurston/TwirpScript/) highlights:

1. Isomorphic. TwirpScript's generated serializers/deserializers can be consumed in the browser or Node.js runtimes.

2. Small. TwirpScript's runtime and generated code are built with [tree shaking](https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking) to minimize bundle sizes. This results in a significantly smaller bundle size than [google-protobuf](https://www.npmjs.com/package/google-protobuf). TwirpScript's runtime is 2KB (1.2 gzipped). The serialization runtime, [ProtoScript](https://github.com/tatethurston/ProtoScript), is 37KB (7.2 gzipped). ProtoScript will be eliminated from bundles when only using the generated JSON clients.

3. In-editor API documentation. Comments in your `.proto` files become [TSDoc](https://github.com/microsoft/tsdoc) comments in the generated code and will show inline documentation in supported editors.

4. Idiomatic JavaScript / TypeScript code. None of the Java idioms that `protoc --js_out` generates such as the `List` suffix naming for repeated fields, `Map` suffix for maps, or the various getter and setter methods. TwirpScript generates and consumes plain JavaScript objects over classes.

If you'd like to try it out, see the [installation instructions](https://github.com/tatethurston/TwirpScript#installation-).

Any questions? Hop into the Reddit [announcement thread](https://www.reddit.com/r/javascript/comments/q8v5w8/twirpscript_a_simple_rpc_framework_for_javascript/). Or, [open an issue](https://github.com/tatethurston/TwirpScript/issues/new).
