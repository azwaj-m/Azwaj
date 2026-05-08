import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000, // وارننگ کی حد کو 1000 kB تک بڑھا دیں
    rollupOptions: {
      output: {
        // بڑی لائبریریز کو الگ چنکس میں تقسیم کرنا
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('firebase')) {
              return 'vendor-firebase'; // فائر بیس کا الگ چنک
            }
            if (id.includes('lucide-react')) {
              return 'vendor-icons'; // لوسائڈ آئیکنز کا الگ چنک
            }
            return 'vendor-libs'; // دیگر تمام تھرڈ پارٹی لائبریریز
          }
        }
      }
    }
  }
});
