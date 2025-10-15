import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/PersonalWebsite/', // 👈 must exactly match your GitHub repo name (case-sensitive)
})
