import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/fapig': {
        target: 'http://apis.juhe.cn',
        changeOrigin: true,
      },
    },
  },
});
