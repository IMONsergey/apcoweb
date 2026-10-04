import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
  plugins: [react()],
  base: '/apcoweb/',
  build: { target: 'es2022', sourcemap: false, cssCodeSplit: true },
  server: { host: '127.0.0.1', port: 5187, strictPort: true },
  preview: { host: '127.0.0.1', port: 4187, strictPort: true },
});
