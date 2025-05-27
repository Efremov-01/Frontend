import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    port: 3000,
    proxy: {
      '/opticbox': 'http://localhost:8000', // проксируем запросы на Django
    },
  },
  plugins: [react()],
});
