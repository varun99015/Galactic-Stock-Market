import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // For production build, ensures paths are correct
  base: '/', 
  // For local development, proxies API calls to your backend
  server: {
    proxy: {
      '/api': 'http://localhost:5000' 
    }
  }
})
