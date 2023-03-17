import { defineConfig } from "astro/config";
import preact from "@astrojs/preact";
import serviceWorker from "astrojs-service-worker";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://www.tatethurston.com",
  integrations: [preact(), serviceWorker(), sitemap()],
  trailingSlash: "never",
  build: {
    format: "file",
  },
});
