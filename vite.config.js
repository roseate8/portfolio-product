import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Enable React plugin for JSX transformation
  plugins: [react()],
  
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
  
  // Optimize Three.js and related dependencies for proper bundling
  optimizeDeps: {
    include: [
      'three',
      'three-stdlib',
      '@react-three/fiber',
      '@shadergradient/react',
      'camera-controls'
    ]
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

