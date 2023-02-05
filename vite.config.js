/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/TDD-React-Vitest-AccuWeatherAPI/',
  test: {
    environment: 'jsdom',
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
  }
})
