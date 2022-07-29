import { defineConfig } from "astro/config";
import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  site: "https://www.tatethurston.com",
  integrations: [preact()],
  // S3 will redirect non trailing slashes
  trailingSlash: "always",
});
