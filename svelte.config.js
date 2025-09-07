import { preprocessMeltUI } from '@melt-ui/pp'
import sequence from 'svelte-sequential-preprocessor'

// import adapter from "@sveltejs/adapter-auto";
import adapter from '@sveltejs/adapter-static'

import { extname } from 'path';


import { marked } from 'marked'


export function md() {
  return {
    async markup({ content, filename }) {
      // only process .md files
      console.log('filename:', filename)
      if (extname(filename) !== '.mdx') {
        return;
      }
      console.log('\n\n\n\n 12312312', filename)


      const renderer = {
        // heading(text, level) {
        //   return `<Heading level="${level}">${text}</Heading>`;
        // },
        link(t) {
          return `<custom-a href="${t.href}" text="${t.text}"></custom-a>`;
        }
      };

      marked.use({renderer});
      let documentHtml = marked(content)
      console.log('documentHtml', documentHtml.replace('\n', '').slice(0, 3000))

      function splitHTMLIntoParagraphs(html) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const body = doc.body;
        const chunks = [];

        var chunk = ''
        var chunkSize = 0
        for (const node of Array.from(body.childNodes)) {

          if (node.nodeType === Node.TEXT_NODE) continue

          // console.log('node:', node, node.nodeType)

          // paragraph node
          if (node.nodeType === Node.ELEMENT_NODE && node.nodeName === "P") {
            if (chunkSize < 20) {
              chunk += node.outerHTML
              chunkSize++
            } else {
              chunks.push(chunk);
              chunk = ''
              chunkSize = 0
            }
          } else {
            chunk += node.outerHTML
            chunkSize++
          }
        }

        return chunks;
      }

      const list = splitHTMLIntoParagraphs(documentHtml)
      console.log('list:', list)


      // wrap the output as a tiny Svelte component
      const code = `
        <script>
        </script>
      `.trim();

      return { code };
    }
  };
}



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
    // md(),
    preprocessMeltUI(),
  ])
}
export default config
