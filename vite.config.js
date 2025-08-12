import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// IMPORTANT: base set for GitHub Pages under /REInvestorTool/
export default defineConfig({
  plugins: [react()],
  base: '/REInvestorTool/',
})