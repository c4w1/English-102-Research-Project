import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/English-102-Research-Project/',
  plugins: [
    react(),
    tailwindcss(),
  ],
})
