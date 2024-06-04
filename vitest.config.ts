import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
  },
  resolve: {
    alias: {
      '@/ui': resolve(__dirname, './app/ui'),
      '@/lib': resolve(__dirname, './app/lib'),
      '@': resolve(__dirname, './app'),
    },
  },
})
