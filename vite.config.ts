import { resolve } from "path";
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import vueJsx from "@vitejs/plugin-vue-jsx";
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  plugins: [
      vue(),
      vueJsx(),
      Components({
        resolvers: [NaiveUiResolver()]
      })
  ],
  server: {
    port:3340,
    host: "0.0.0.0",
  },
  base: './',
  resolve: {
    alias: {
      "@": resolve(__dirname, "/src"),
    },
  }

})
