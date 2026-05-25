import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  ssr: {
    external: ['puppeteer']
  },
  build: {
    modulePreload: false,
    rollupOptions: {},
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    host: true,
    port: 5173,
    strictPort: true,

    hmr: {
      host: 'localhost',
      protocol: 'ws',
      port: 5173,
      clientPort: 5173,
    },
  },
  preview: {
    host: true,
    port: 4173,
    strictPort: true,
  }
});
