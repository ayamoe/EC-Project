import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/

  export default defineConfig({
  base: './', // <== ဒီလိုထည့်မယ်။
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
})
