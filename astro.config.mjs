// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import path from 'node:path'; 
import { fileURLToPath } from 'node:url'; 
import copy from 'rollup-plugin-copy';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://astro.build/config
export default defineConfig({
  site: 'https://aesteri.github.io',
  base: 'v2_aesteri',
  integrations: [react({
    experimentalReactChildren: true,
    include: ['**/react/*'],
  })],
  vite: {
    plugins: [
      copy({
        copyOnce: true,
        hook: 'buildStart',
        targets: [
          { src: 'node_modules/@shoelace-style/shoelace/dist/assets/*', dest: 'public/shoelace-assets/assets/' }
        ]
      })
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'), 
        '@components': path.resolve(__dirname, './src/components'), 
        '@styles': path.resolve(__dirname, './src/styles'), 
      }
    },
  }
});
