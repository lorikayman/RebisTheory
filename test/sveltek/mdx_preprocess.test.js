/**
 *
 */

import fs from 'fs'; // Import the fs module

import { describe, it, expect } from 'vitest';
import { preprocess, compile } from 'svelte/compiler';

import { svelteMarkdown } from '@sveltek/markdown'
import { markdownConfig } from './markdown.config.js'

import mdxPlainText from 'src/lib/rebis_theory.mdx?raw'

import { fileURLToPath } from 'url';
import path from 'path';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDir = path.dirname(currentFilePath);


describe('Sveltek Markdown compiler', () => {
  it('output js-fied html from markdown', async () => {
    const source = mdxPlainText;
    const { code: preprocessed } = await preprocess(
      source,
      [
        svelteMarkdown(markdownConfig)
      ],
      { filename: 'rebis_theory.mdx' }
    );
    const output = compile(preprocessed, { filename: 'rebis_theory.mdx' });

    fs.writeFileSync(currentDir + '/mdx_preprocess.test.result.html', preprocessed);

  }, 20000)
})
