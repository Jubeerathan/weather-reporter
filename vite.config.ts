import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
    test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts', 
    deps: {
    inline: [/^@mui/] // Inline MUI modules to avoid too many file opens
  },
  },
});
