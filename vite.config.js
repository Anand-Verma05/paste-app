import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
    base: "/paste-app/", // <-- important
  plugins: [
    tailwindcss(),
  ],
})