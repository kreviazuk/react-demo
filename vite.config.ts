import UniManifest from "@uni-helper/vite-plugin-uni-manifest";
import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import UnoCSS from "unocss/vite";
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: process.env.TEST ? [] : [UniManifest(), uni(), UnoCSS()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        additionalData: `@import "@/uni.scss";`,
        logger: {
          warn: () => {}
        }
      }
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.{idea,git,cache,output,temp}/**',
    ],
  },
});
