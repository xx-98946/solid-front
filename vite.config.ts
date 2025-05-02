import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

export default defineConfig({
  plugins: [solid(), tailwindcss()],
  resolve: {
    alias: {
      $: path.resolve(__dirname, "src"),
    },
  },
  server: {
    port: 5678,
    proxy: {
      "/api/kv": {
        target: "https://xuxin-kv.deno.dev/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/kv/, ""),
      },
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        dir: "../dist",
      },
    },
  },
});
