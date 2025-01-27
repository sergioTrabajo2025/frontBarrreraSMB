import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://15.228.48.3:8080',
        changeOrigin: true,
        secure: false, // Permitir conexiones no seguras
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
