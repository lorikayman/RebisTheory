import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: [
      'test/**/*.test.js',
    ],
    exclude: [
      'mdsvex/**',
      'sveltek_markdown/**',
      'node_modules/**',
    ],
    // reporters: ['junit',],
    // outputFile: {
    //   junit: './test_reports/junit/report.xml'
    // }
  }
});
