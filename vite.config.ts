/// <reference types="vitest" />

import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), svgr()],
    server: {
      port: parseInt(env.VITE_PORT, 10)
    },
    css: {
      devSourcemap: true
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./src/setupTest.ts'],
      coverage: {
        include: ['src/**']
      }
    }
  };
});
