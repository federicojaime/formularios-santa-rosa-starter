import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Cuando alguien pida "tailwindcss/version.js"
      // que use nuestro patch.
      'tailwindcss/version.js': path.resolve(
        __dirname,
        'src/patches/tailwind-version.js'
      ),
    },
  },
  // ‼️ quité la parte que deshabilitaba PostCSS
});
