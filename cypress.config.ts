import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:8080",
  },

  component: {
    devServer: {
      framework: "vue",
      bundler: "vite",
    },
  },
});
