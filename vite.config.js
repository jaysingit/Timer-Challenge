import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Served from https://jaysingit.github.io/Timer-Challenge/ on GitHub Pages
  base: '/Timer-Challenge/',
})
