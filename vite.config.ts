import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({ /* options */ }),
  ],

  css: {
    preprocessorOptions: {
      scss: {
        // 两种方式都可以
        additionalData: '@import "src/global.scss";'
      }
    }
  },
  server: {
    host: '0.0.0.0',
    open: true
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
