import { preprocessMeltUI } from '@melt-ui/pp'
import sequence from 'svelte-sequential-preprocessor'

// import adapter from "@sveltejs/adapter-auto";
import adapter from '@sveltejs/adapter-static'

import { extname } from 'path';

import jsdom from 'jsdom'
import { marked } from 'marked'
import fs from 'fs';
import path from 'path';

export function mdx() {
  return {
    name: 'mdx-opts',
    async markup({ content, filename }) {
      // only process .md files
      console.log('filename:', filename)
      if (extname(filename) !== '.mdx') {
        return;
      }

      // return { code: content }

      const renderer = {
        // heading(text, level) {
        //   return `<Heading level="${level}">${text}</Heading>`;
        // },
        link(t) {
          return `<custom-a href="${t.href}" text="${t.text}"></custom-a>`;
        }
      };

      const documentHtml = marked.use(renderer)(content)


      function splitHTMLIntoParagraphs(html) {
        const doc = new jsdom.JSDOM(html);
        console.log(html.slice(0,400))
        const body = doc.window.document.body.children;

        const nodeList = []
        let index = 0

        for (const node of body) {
          node.dataset.index = index
          nodeList.push(node.outerHtml)
          index++
        }

        return nodeList;
      }

      const listPlain = splitHTMLIntoParagraphs(documentHtml)

      // const fullOutputPath = join(process.cwd(), outputPath);
      // if (!existsSync(fullOutputPath)) {
      //   mkdirSync(fullOutputPath, { recursive: true });
      // }

      // const outputFile = join(fullOutputPath, filename);
      // const moduleContent = generateModuleContent(randomTextArray);
      // writeFileSync(outputFile, moduleContent);
      // console.log('\n\n\nlistPlain:', listPlain)
      // const exportName = path.basename(filename, '.mdx');
      const data = JSON.stringify(listPlain)

      // console.log('\n\n data', data)
      return {
        code: `
          <script>
          /**
          * @type {string[]}
          * Generated from ${path.basename(filename)}
          */
          export const data = ${data};
          </script>`.trim()
      };
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
    '.mdx',
  ],
  compilerOptions: {
    customElement: true
  },
  // compilerOptions: {
  //   customElement: true,
  // },
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
    mdx(),
    preprocessMeltUI(),
  ])
}
export default config
