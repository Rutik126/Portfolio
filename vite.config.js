import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        caseStudies: resolve(__dirname, 'case-studies.html'),
      },
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          motion: ['framer-motion'],
          gsap: ['gsap', 'gsap/ScrollTrigger'],
          three: ['three', '@react-three/fiber'],
        },
      },
    },
  },
})
