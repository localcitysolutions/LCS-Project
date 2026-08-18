import fs from 'fs';
const dir = 'src/lib/manage/pdf/fonts';
const reg = fs.readFileSync(`${dir}/Almarai-Regular.ttf`).toString('base64');
const bold = fs.readFileSync(`${dir}/Almarai-Bold.ttf`).toString('base64');
const header = `// AUTO-GENERATED — do not edit by hand.
//
// Almarai (SIL Open Font License 1.1) embedded as base64 so PDF rendering never
// depends on the filesystem layout of the serverless bundle or on a network
// fetch. Regenerate with scripts/build-pdf-fonts.mjs after replacing the .ttf
// files in ./fonts.
//
// Almarai is the same family the public site uses, so invoices match the brand,
// and — unlike Noto Naskh Arabic — its dots are part of the glyph outlines,
// which renders correctly in react-pdf (whose layout engine does not apply
// GPOS mark attachment).

`;
fs.writeFileSync('src/lib/manage/pdf/font-data.ts',
  header +
  `export const ALMARAI_REGULAR_BASE64 =\n  "${reg}";\n\n` +
  `export const ALMARAI_BOLD_BASE64 =\n  "${bold}";\n`);
console.log('written', fs.statSync('src/lib/manage/pdf/font-data.ts').size, 'bytes');
