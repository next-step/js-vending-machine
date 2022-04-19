import eslint from '@rollup/plugin-eslint';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '',
  build: {
    sourcemap: true,
  },
  plugins: [
    {
      ...eslint({
        include: '*/**/*.js',
      }),
      enforce: 'pre',
      apply: 'serve',
    },
  ],
});
