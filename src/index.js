// File System Node Module - https://nodejs.org/api/fs.html
import fs from 'fs';
// Path Node Module - https://nodejs.org/api/path.html
import path from 'path';
import parse from './parsers.js';
import formatOutput from './formaters/index.js';

const getPath = (filename) => `${path.resolve(process.cwd(), filename)}`;
const readFile = (filename) => fs.readFileSync(getPath(filename), 'utf-8');

export default (filepath1, filepath2, format = 'stylish') => {
  const oldContent = readFile(filepath1);
  const newContent = readFile(filepath2);
  const extension = path.extname(filepath1) && path.extname(filepath2);

  const diff = parse(oldContent, newContent, extension);

  return formatOutput(diff, format);
};
