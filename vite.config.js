import { defineConfig } from 'vite'
import react from '@vitejs/react-devtools'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
  server: {
    historyApiFallback: true,
  }
})
