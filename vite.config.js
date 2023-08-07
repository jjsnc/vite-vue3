import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import { resolve } from "path";

// https://vitejs.dev/config/

// const baseURL = "https://beta.inmad.cn";

const baseURL = "http://172.16.30.211:9090/";

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
      "/adminapi": {
        target: baseURL,
        changeOrigin: true,
      },
    },
  },
});
