import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    minify: 'esbuild',
    sourcemap: false,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },
  server: {
    hmr: {
      overlay: false,
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },

  base: process.env.VITE_BASE_PATH ||  '/Nevin_Nijanthan',
})
