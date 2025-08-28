import { defineConfig } from '@sveltek/markdown'

export const markdownConfig = defineConfig({
  frontmatter: {
    // global data
    defaults: {
      // layout: 'default',
      // author: {
      //   name: 'Sveltek',
      //   url: 'https://github.com/sveltek',
      // },
    },
  },
  extensions: ['.md', '.mdx'],
  layouts: {
    // default: {
    //   path: 'lib/content/layouts/default/layout.svelte',
    // },
    entries_rebis: {
      path: 'src/routes/mdlayout.svelte',
    },
  },
})
