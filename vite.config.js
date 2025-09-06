import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'

import { dirname, resolve } from 'node:path'

import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))


export default defineConfig({
  plugins: [
    sveltekit()
  ],
  build: {
    rollupOptions: {
      input: {
        document: resolve(__dirname, 'src/lib/rebis_theory.mdx'),
      },
      output: {
        // manualChunks: {}
        // manualChunks(id) {
        //   if (id.includes('src/lib/rebis_theory')) return 'document'
        //   return undefined;
        // }
      },
    }
  },
})
