import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/messiah-meal-planner',
  server: {
    host: true,
    port: 5173
  }
});
