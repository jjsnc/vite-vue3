import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import { resolve } from "path";

// https://vitejs.dev/config/

const baseURL = "https://beta.inmad.cn";

export default defineConfig({
  plugins: [vue()],
  publicPath: "/",
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/interface": {
        target: baseURL,
        changeOrigin: true,
      },
    },
  },
});
