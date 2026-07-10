import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/dpt-6421-clinical-decision-interactive/',
  build: {
    manifest: true
  },
  server: {
    port: 5173,
    open: true
  }
})
