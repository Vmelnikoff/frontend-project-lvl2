import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import formatOutput from './formaters/index.js';
import buildDiff from './buildDiff.js';
import normalizeContent from './normalizer.js';

const getPath = (filename) => `${path.resolve(process.cwd(), filename)}`;
const readFile = (filename) => fs.readFileSync(getPath(filename), 'utf-8');
const getType = (filepath1, filepath2) => (path.extname(filepath1) && path.extname(filepath2))
  .slice(1);

export default (filepath1, filepath2, format = 'stylish') => {
  const type = getType(filepath1, filepath2);
  const oldContent = parse(readFile(filepath1), type);
  const newContent = parse(readFile(filepath2), type);

  const diff = buildDiff(normalizeContent(oldContent), normalizeContent(newContent));

  return formatOutput(diff, format);
};
