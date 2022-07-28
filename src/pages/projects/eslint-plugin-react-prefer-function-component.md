---
layout: "../../layouts/Page.astro"
title: "eslint-plugin-react-prefer-function-component"
description: "An ESLint plugin that prevents the use of React class components."
keywords: "eslint react class, lint react class, lint jsx class"
publishDate: "7 July 2021"
---

tl;dr I launched [eslint-plugin-react-prefer-function-component](https://www.npmjs.com/package/eslint-plugin-react-prefer-function-component), an [ESLint](https://github.com/eslint/eslint) plugin that prevents the use of React class components. While this plugin specifically calls out React, it will work with Preact, Inferno, or other JSX libraries.

## update Jun 23, 2022

We're using `eslint-plugin-react-prefer-function-component` across frontends at Twitch as we standardize upon function components.

## why

Since the addition of hooks, it has been possible to write stateful React components
using only functions.

Leaving the choice between class or function components up to the community is great, but generally within a codebase I want consistency: either we're writing class components and [HoCs](https://reactjs.org/docs/higher-order-components.html) or we're using function components and hooks. Straddling the two adds unnecessary hurdles for sharing reusable logic.

By default, class components that use `componentDidCatch` are enabled because there is currently no hook alternative for React. This option is configurable via `allowComponentDidCatch`.

This rule is intended to complement the [eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react) rule set.

## the final result

[eslint-plugin-react-prefer-function-component](https://github.com/tatethurston/eslint-plugin-react-prefer-function-component)

If you'd like to try it out, see the [installation instructions](https://github.com/tatethurston/eslint-plugin-react-prefer-function-component#installation--usage-).

Any questions? Hop into the Reddit [announcement thread](https://www.reddit.com/r/reactjs/comments/mrtn9l/an_eslint_lint_rule_to_prevent_the_use_of_class/). Or, [open an issue](https://github.com/tatethurston/eslint-plugin-react-prefer-function-component/issues/new).
