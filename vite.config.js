import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import cesium from 'vite-plugin-cesium';

import {fileURLToPath, URL} from 'node:url'
import glsl from 'rollup-plugin-glsl'

const target = {
  local_api:'http://192.168.5.23:8010',
  lacal_base:'http://192.168.5.15:8110/'
}

export default defineConfig({
  plugins: [vue(), cesium(),glsl({
    include: "**/*.glsl",
    exclude: ['**/index.html']
  })],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  },

  build: {},
  server: {
    host: '0.0.0.0',
    port: '8800',
    proxy: {
      '/api': {
        target: target.local_api,
        changeOrigin: true,
      },
    }
  }
})


