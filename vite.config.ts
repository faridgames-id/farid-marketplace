import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // Base path — relative for PWA compatibility (installable from any path)
  base: './',

  // Path aliases for clean imports
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@lib': path.resolve(__dirname, './src/lib'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@services': path.resolve(__dirname, './src/services'),
      '@stores': path.resolve(__dirname, './src/stores'),
      '@types': path.resolve(__dirname, './src/types'),
      '@assets': path.resolve(__dirname, './src/assets'),
    },
  },

  // Development server config
  server: {
    port: 5175,
    strictPort: true, // Will fail if port is taken, preventing confusion
    host: true, // Allow access from LAN (useful for testing on mobile)
    open: false,
  },

  // Build optimization
  build: {
    target: 'es2020',
    outDir: 'dist',
    sourcemap: false,
  },

  // Preview server (for testing production build)
  preview: {
    port: 4173,
    host: true,
  },
});
