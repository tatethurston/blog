import { defineConfig } from "astro/config";
import preact from "@astrojs/preact";
import serviceWorker from "astrojs-service-worker";

// https://astro.build/config
export default defineConfig({
  site: "https://www.tatethurston.com",
  integrations: [preact(), serviceWorker()],
  trailingSlash: "never",
  build: {
    format: "file",
  },
});
