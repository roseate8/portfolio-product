import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: './index.html'
      }
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "./assets/css/_variables.scss";
          @import "./assets/css/_defaults.scss";
          @import "./assets/css/_type.scss";
        `
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
});

