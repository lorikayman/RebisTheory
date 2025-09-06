/**
 *
 */

import { describe, it, expect } from 'vitest';
import { preprocess, compile } from 'svelte/compiler';

import { svelteMarkdown } from '@sveltek/markdown'
import { markdownConfig } from './markdown.config.js'

import mdxPlainText from 'src/lib/rebis_theory.mdx?raw'

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
    // console.log('preprocessed', preprocessed)
    console.log('output', output.js.code);
  }, 20000)
})
