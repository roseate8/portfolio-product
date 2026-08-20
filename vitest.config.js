import { defineConfig } from 'vitest/config';

// Separate from vite.config.js: tests need neither the React plugin nor the SCSS pipeline.
export default defineConfig({
  test: {
    environment: 'jsdom',
    include: ['tests/**/*.test.js'],
    env: {
      VITE_SUPABASE_URL: 'https://test.supabase.co',
      VITE_SUPABASE_ANON_KEY: 'test-anon-key'
    },
    restoreMocks: true,
    clearMocks: true,
    testTimeout: 15000,
    // The app logs verbosely in dev, and vitest runs with DEV=true
    onConsoleLog(text) {
      return !/^(\[\d|\[Data\.js\]|\[DEBUG\]|\[Analytics\]|🎯|📅|🗺️|🔍|✨)/.test(text.trim());
    }
  }
});
