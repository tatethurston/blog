---
layout: "../../layouts/Page.astro"
title: "REST vs GraphQL vs RPC"
description: "When building an API, which do you choose? `REST`, `GraphQL` or another RPC like `gRPC`?"
publishDate: "27 June 2022"
---

Similar to the [MPA vs SPA](./mpa-vs-spa') debate, there is no shortage of advocates championing [REST](https://htmx.org/essays/rest-explained/), [GraphQL](https://graphql.org/) or an RPC such as [gRPC](https://grpc.io/) as the _the_ way to deliver APIs over a network.

Technically, `GraphQL` belongs under the RPC category -- making the buckets REST or RPC, but due to it's popularity and unique approach to read requests I gave GraphQL explicit consideration. Further clouding taxonomy, the majority of "REST" APIs are [more accurately characterized as JSON over HTTP](https://roy.gbiv.com/untangled/2008/rest-apis-must-be-hypertext-driven), with varying levels of adoption of REST principles. Still, "REST" is the most common descriptor for these JSON APIs, so while [technically inaccurate](https://htmx.org/essays/how-did-rest-come-to-mean-the-opposite-of-rest/), I'll use REST in this article.

So, when building an API, which do you choose? `REST`, `GraphQL` or another RPC like `gRPC`?

Like any architecture decision, the best way to evaluate the trade offs of these approaches is to work backwards from your goal. Who are the consumers of your API? What does your engineering organizational structure look like?

### REST

While varying in levels of conformance to actual REST, JSON REST APIs are by far the most prevalent API considered in this article. All modern languages in wide use have JSON encoding/decoding out of the box, and many libraries implement tooling on top of the HTTP verb semantics prescribed by REST. This makes it especially easy for external clients to consume and instrument your service, and it is likely that consumers are extending tooling they already have in place rather than doing greenfield development to integrate your API. This benefit extends to existing network infrastructure: nearly all CDNs and proxies understand HTTP verb semantics without configuration, so REST semantics can help you leverage a suite of powerful caching semantics out of the box.

I would not use a REST for an API whose only consumers are internal clients, such as an SPA making requests to an internal API. For these clients, the correctness guarantees, API discoverability and autocompletion from a typed RPC provide too many benefits to give up. A JSON API lacks type safety and the developer tooling that builds on static typing. This can be mitigated to an extent with tools like [JSON Schema](https://json-schema.org/), but that route requires stitching together and maintaining a suite of tools only to achieve a similar developer experience that comes out of the box with a typed RPC. RPC's generally enforce consistency, and eliminate bike shedding such as "should this be provided via HTTP headers, the body, or query parameters?" Consistency is good, but these decisions rarely matter for a given application.

Indicated:

- External clients
- Highly cacheable (particularly read only APIs)

Contraindicated:

- Internal clients

### GraphQL

For multiple clients with distinct and varying read requests, I would consider GraphQL. If, for example, I was designing an API for web and native applications (iOS, Android, TV, etc) and the applications had very different UIs with different data requirements. GraphQL especially makes sense in an organization where each of those applications are owned by different teams. In all other circumstances, I would not use GraphQL. I would not use GraphQL for a single client. The primary benefit of GraphQL is decoupling your client read needs from a tailored backend implementation. A secondary benefit is the typed contract between the client and the server, but this benefit is not unique to GraphQL. Solving "n+1" requests from the client is also not unique to GraphQL. Simply craft your read endpoints to your data needs, don't make the client stitch together a number of requests to multiple endpoints. The exception here is if you have multiple service teams and want to present a unified API Gateway (or the Backend for Frontends pattern). In this case, GraphQL works well -- we do this at Twitch, and Netflix does this as well. For a single client, multiple endpoints (eg `POST /comments` or `/comments.create` as opposed to a single `/graphql`) yield a simpler architecture and well defined optimization paths. If you don't need to service arbitrary data requests, don't tackle the unnecessary complexity of building a query engine (GraphQL).

Indicated:

- Multiple clients with varying data needs
- Multiple backend service teams (presenting a unified API Gateway / the Backend for Frontends pattern)

Contraindicated:

- Single client

Possibly Contraindicated:

- Single team. If everyone is full stack, the coordination problem between a backend and client team doesn't exist. You may be better off with creating endpoints per client when they differ. It is much easier to tune the performance of a single endpoint than trying to tune arbitrary requests. Is solving the later problem worth your time?

### RPC

When designing internal APIs, whether for server-to-server communication or for clients (web, cli, iOS and Android, etc) I'll reach for an RPC framework. Popular examples include [gRPC](https://grpc.io/) and [Twirp](https://github.com/twitchtv/twirp). Many languages have RPCs, such as [tRPC](https://trpc.io/docs/v9/) for TypeScript, enabling you to define your API in the semantics provided by your language, with serialization boilerplate abstracted. If your client and server are in the same language, the later are great, but if you have multiple languages in use (or plan to) you should reach for the former.

RPC frameworks abstract much of the important but boilerplate specifics for delivering an API over HTTP such as serialization, error handling, and routing, which drives consistency and lets developers focus on the specifics of the domain instead of rehashing these details.

For internal clients, it is straightforward for an organization to standardize on a single RPC framework. This is not the case for external clients when you provide your API as a service, such as [Stripe](https://stripe.com/docs). There is often more friction for external clients to adopt RPCs (especially with a serialization format other than JSON) [even if you provide an SDK](https://brandur.org/sdk).

Indicated:

- Internal clients

Contraindicated:

- External clients
