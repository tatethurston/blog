---
layout: "../../layouts/Page.astro"
title: "MPAs vs SPAs"
description: "When should you choose a multi-page application or a single-page application?"
keywords: "mpa, spa, multi-page application, single-page application"
publishDate: "27 May 2022"
---

The term Multi-Page Application (MPA) has been coined to draw a distinction from Single-Page Application (SPA), the later being the client side architecture that grew in popularity in the mid 2010s with early tools like Knockout, Backbone, Angular, and later React. MPA is just a new name for an old concept: server rendered HTML pages. MPAs were the only type of webpage on the internet until `XMLHttpRequest` came on the scene and GMail popularized the idea of delivering "apps" through the web instead of content pages that traditionally characterized the web. These new websites were more similar to applications than traditional web pages and became known as Single-Page Apps. This name was chosen because a single HTML page is delivered to the client, and then JavaScript manipulates the page to perform all subsequent UI changes, rather than fetching new pages from a server like an MPA.

The developer tooling for SPAs has been richer than the tooling available for MPAs the last few years. Particularly due to TypeScript and the [ESLint](https://eslint.org/) ecosystem. That, and because of developers following the trends of larger tech companies and replicating their architecture, has led to an abundance of and default selection of SPAs when they might not be the best fit. As a reaction to this trend, a vocal "SPAs are terrible" cohort has emerged.

There are some applications that will be to easier to develop as an MPA or as an SPA. In almost all cases, you can overcome the limitations and trade offs of either selection with the ever-growing tooling available, but you can save yourself (and often your users) a lot of grief by being intentional with the trade offs you consider up front. Traditional content sites like wikis, news sites and blogs work well as an MPA. GMail and YouTube behave more like apps, and thus work well as SPAs. I work on [Twitch's site](https://www.twitch.tv/), which is an SPA.

Bucketing sites into either MPA or SPA categories still leaves some ambiguity. If you picture a venn diagram of sites that work well as an MPA or an SPA, there is a large overlap in the middle. Some problems will be easier to solve in an MPA, some easier in an SPA. When developing applications that are in the middle of that venn diagram, developers naturally pick the tool they are most familiar with. Or, if they're feeling recently burned, they'll pick the opposite of what they used last time.

Frequently, developers championing MPAs or SPAs are talking past each other, developing web delivered assets with very different requirements. As page interactivity increases, and client side / non network persisted state increases, SPA architectures make increasing sense. MPAs make sense across the opposite end of that spectrum. When both are reasonable choices, I'll often pick an MPA because of the simpler architecture that generally comes with it.

### MPA

Indicated:

- Content sites, particularly those that benefit from search: E-Commerce, Wikis, News, Forums, Blogs
- Highly cacheable sites: few infrequent writes or primary user action is readding
- CRUD applications

Contraindicated:

- High interactivity: Email clients, Text editors, "apps"

### SPA

Indicated:

- High interactivity: Email clients, Text editors, "apps"
- Rich integration with device APIs such as the camera, GPS, etc

Contraindicated:

- Content sites, particularly those that benefit from search: E-Commerce, Wikis, News, Forums, Blogs
