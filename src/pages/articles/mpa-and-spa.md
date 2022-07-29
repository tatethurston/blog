---
layout: "../../layouts/Page.astro"
title: "MPAs and SPAs"
description: "Often times devs championing MPAs or SPAs are talking past each other, developing web delivered assets with very different requirements."
publishDate: "27 May 2022"
---

Multi-Page App (MPA) has been coined to draw a distinction between Single-Page Apps (SPA). MPA is just a new name for an old concept: server rendered HTML pages. MPAs were the only type of webpage on the internet until `XMLHttpRequest` came on the scene and GMail popularized the idea of delivering "apps" through the web instead of content pages. These new websites were more similar to client applications than traditional web pages and became known as Single-Page Apps.

There are some applications that work better as an MPA or an SPA. Traditional content sites like wikis, news sites and blogs work well as an MPA. GMail and YouTube behave more like apps and work well as SPAs. I work on Twitch's site, which is an SPA. But, if you picture a venn diagram of sites that work well as an MPA or an SPA, there is a large overlap in the middle. Some problems are easier to solve in an MPA, some are easier in an SPA.

When developing applications that are in the middle of that venn diagram, developers naturally pick the tool they are most familiar with. Or, if they're feeling recently burned, they'll pick the opposite of what they used last time.

The tooling for SPAs has been richer the last few years. Particularly due to TypeScript and the [ESLint](https://eslint.org/) ecosystem. That, and because of architectures that larger tech companies have selected, has led to an abundance of and default selection of SPAs when they might not be the best fit. This accounts for a large portion of the "SPAs are terrible" cohort.

Often times devs championing MPAs or SPAs are talking past each other, developing web delivered assets with very different requirements. As page interactivity increases, and client side / non networked persisted state increases, SPA architectures make increasing sense. MPAs make sense across the opposite end of that spectrum. When both are reasonable choices, I'll often pick an MPA because of the simpler architecture that generally comes with it.
