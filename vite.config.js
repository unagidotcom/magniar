import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        'printing-devices': 'printing-devices/index.html',
        'printing-devices-privacy': 'printing-devices/privacy/index.html',
        'printing-devices-cookies': 'printing-devices/cookies/index.html',
        'printing-devices-terms': 'printing-devices/terms/index.html',
      }
    }
  }
})
