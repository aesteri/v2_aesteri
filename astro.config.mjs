// // @ts-check
// import { defineConfig } from 'astro/config';
// import react from '@astrojs/react';


// // https://astro.build/config
// export default defineConfig({
//   integrations: [react()],
//   vite: {
//     resolve: {
//         alias: {
//             '@': '/src',
//             '@/components': '/src/components',
//             '@/css':'/src/styles',
//         }
//     },
//     optimizeDeps: {
//         include: ["@tabler/icons-react"],
//       },
//   }
// });

// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import path from 'node:path'; // Import the 'path' module
import { fileURLToPath } from 'node:url'; // For ES module __dirname equivalent
import copy from 'rollup-plugin-copy';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://astro.build/config
export default defineConfig({
  base: '/v2_aesteri/',
  integrations: [react({
    experimentalReactChildren: true,
    include: ['**/react/*'],
  })],
  vite: {
    plugins: [
      copy({
        // Copy only on first build. We dont want to trigger additional server reloads.
        copyOnce: true,
        hook: 'buildStart',
        targets: [
          { src: 'node_modules/@shoelace-style/shoelace/dist/assets/*', dest: 'public/shoelace-assets/assets/' }
        ]
      })
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'), // Use path.resolve
        '@components': path.resolve(__dirname, './src/components'), // Consistent naming
        '@styles': path.resolve(__dirname, './src/styles'), // Use path.resolve
      }
    },
  }
});
