---
layout: "../../layouts/Page.astro"
title: "nextjs-routes"
description: "Type safe routing for Next.js."
keywords: "nextjs, type safe, route, typescript, next"
publishDate: "15 Apr 2022"
---

tl;dr I launched [nextjs-routes](https://www.npmjs.com/package/nextjs-routes), a code generation tool to make [next/link](https://nextjs.org/docs/api-reference/next/link) and [next/router](https://nextjs.org/docs/api-reference/next/router) routes type safe.

<div class="responsive-image">
  <img alt="nextjs-routes autocompletion" src="https://raw.githubusercontent.com/tatethurston/nextjs-routes/HEAD/images/nextjs-routes.gif" />
</div>

## why

Type checking routes with TypeScript guards against broken links and unexpected `undefined` values from Next.js' `router.query` when refactoring. If I'm using TypeScript, I shouldn't have to manually verify that my application links are valid.

## how does this work?

`nextjs-routes` scans your pages directory and generates a `nextjs-routes.d.ts` file with type definitions for all your routes.

`nextjs-routes` generates types for the `pathname` and `query` for every page in your `pages` directory. The generated types are written to `nextjs-routes.d.ts` which is automatically referenced by your Next project's `tsconfig.json`. `nextjs-routes.d.ts` redefines the types for `next/link` and `next/router` and applies the generated route types.

## the final result

[nextjs-routes](https://github.com/tatethurston/nextjs-routes/) highlights:

1. Zero config

1. Types only -- zero runtime

1. No more broken links

1. Route autocompletion

1. Supports all Next.js route types: static, dynamic, catch all and optional catch all

If you'd like to try it out:

`npm install nextjs-routes` or `yarn add nextjs-routes`

Any questions? Hop into the Reddit [announcement thread](https://www.reddit.com/r/nextjs/comments/u1hjrr/nextjsroutes_type_checked_routing_for_nextjs/). Or, [open an issue](https://github.com/tatethurston/nextjs-routes/issues/new).
