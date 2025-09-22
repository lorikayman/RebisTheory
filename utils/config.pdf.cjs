module.exports = {
	stylesheet: [
	  'src/routes/fonts.css',
		'src/routes/layout.css',
		// override earlier defined css rules specifically for pdf format
		'utils/pdf.overrides.css',
	],
	// essential to proper application of layout.css
	body_class: 'container',
	marked_options: {
		headerIds: true,
		smartypants: true,
	},
	pdf_options: {
		format: 'A4',
		margin: '10mm',
		printBackground: true,
	},
	stylesheet_encoding: 'utf-8',
};
