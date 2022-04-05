import { resolve } from "path";
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from "@vitejs/plugin-vue-jsx";

export default defineConfig({
  plugins: [
      vue(),
      vueJsx()
  ],
  server: {
    port: 3000
  },
  base: './',
  resolve: {
    alias: {
      "@": resolve(__dirname, "/src"),
    },
  },
})
