/**
 * This script designed to create a pdf of a document preserving
 * as much of its designs as possible
 *
 * In order to run it, remove every markup from src/routes/+page.svelte until you have
 *
 * <div class="container">
 *   <div id="document-body">
 *     <RebisTheory/>
 *   </div>
 * </div>
 *
 * Then, build it with:
 *
 * npm run build
 *
 * Then start a preview:
 *
 * npm run preview
 *
 * Without closing this process/terminal,
 * start this script with:
 *
 * npm run build:pdf
 *
 * The resulting file will be placed in repository's root as 'Rebis Theory.pdf'
 */

import { readFile } from 'fs/promises';

import puppeteer from 'puppeteer';

function main() {
  generatePDF()
    .then(pdf => {
      console.log('PDF generated successfully');
      console.log('PDF buffer length:', pdf.length);
    })
    .catch(error => {
      console.error('Error generating PDF:', error);
      process.exit(1);
    });
}

async function injectCss(pathToStylesheet, page) {
  const css = await readFile(pathToStylesheet, 'utf8');
  await page.addStyleTag({
    content: css
  });
}

async function generatePDF() {
  try {
    console.log('Starting PDF generation...');

    console.log('Launching browser...');
    const browser = await puppeteer.launch({
      headless: true,
    });

    const page = await browser.newPage();
    console.log('Browser launched, setting content...');

    // Turn off all timeouts for navigation, waiting, and most page operations
    page.setDefaultNavigationTimeout(0);
    page.setDefaultTimeout(0);

    const url = `http://127.0.0.1:4173/entries/rebis-theory/`;
    await page.goto(url, {
      waitUntil: 'networkidle0',
      timeout: 0
    });

    // console.log('Sanitizing...')
    // const selectors = [
    //   '.sidebar-container',
    //   '.group-right',
    //   'script',
    // ]
    // for (let sl of selectors) {
    //   const el = await page.waitForSelector(sl);
    //   await el.evaluate(el => el.remove());
    // }

    console.log('Injecting CSS...');
    const stylesheets = [
  		// override earlier defined css rules specifically for pdf format
  		'utils/pdf.overrides.css',
    ]
    for (let s of stylesheets) {
      await injectCss(s, page)
    }
    console.log('Content set, generating PDF...');

    const pdf = await page.pdf({
      path: './Rebis Theory.pdf',
      format: 'A4',
      printBackground: true,
      margin: {
        top: '10mm',
        right: '10mm',
        bottom: '10mm',
        left: '10mm',
      }
    });

    console.log('PDF generated, closing browser...');
    await browser.close();

    return pdf;
  } catch (error) {
    console.error('Error in generatePDF:', error);
    throw error;
  }
}

main()
