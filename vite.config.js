import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/three-js-notes/',
  plugins: [
    tailwindcss(),
  ],
})
