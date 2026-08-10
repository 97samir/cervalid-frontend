import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// para usar @ desde la carpeta src
import path from 'path'

// https://vite.dev/config/
export default defineConfig({

  plugins: [react()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
