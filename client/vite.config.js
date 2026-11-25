import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        
      },
    },
  },
  test: {                                                  //Seperate test configuration for vitest
  include: ['src/**/*.unit.test.{js,jsx}'],
  environment: 'jsdom',
},
})
