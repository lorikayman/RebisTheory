import { preprocessMeltUI } from '@melt-ui/pp'
import sequence from 'svelte-sequential-preprocessor'

// import adapter from "@sveltejs/adapter-auto";
import adapter from '@sveltejs/adapter-static'


const APP_HOSTING_PATH = '/entries/rebis-theory'
// if in development mode, no need for custom path
const APP_BASE_PATH = process.argv.includes('dev') ? '' : APP_HOSTING_PATH

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: [
    '.svelte',
  ],
  compilerOptions: {
    customElement: true,
  },
  kit: {
    adapter: adapter({
      pages: './../../static/entries/rebis-theory',
      assets: './../../static/entries/rebis-theory',
      fallback: undefined,
      precompress: false,
      strict: true
    }),
    paths: {
      base: APP_BASE_PATH
    }
  },
  preprocess: sequence([
    preprocessMeltUI(),
  ])
}
export default config
