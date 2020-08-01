// File System Node Module - https://nodejs.org/api/fs.html
import fs from 'fs';
// Path Node Module - https://nodejs.org/api/path.html
import path from 'path';
// JS-YAML parser - https://github.com/nodeca/js-yaml
import yaml from 'js-yaml';
// INI parser - https://github.com/npm/ini
import ini from 'ini';

import buildDiff from './buildDiff.js';
import formatOutput from './formaters/index.js';

const getPath = (filename) => `${path.resolve(process.cwd(), filename)}`;
export const readFile = (filename) => fs.readFileSync(getPath(filename), 'utf-8');

export default (filepath1, filepath2, format) => {
  switch (path.extname(filepath1) && path.extname(filepath2)) {
    case '.json':
      return formatOutput(buildDiff(
        JSON.parse(readFile(filepath1)),
        JSON.parse(readFile(filepath2)),
      ), format);
    case '.yml':
      return formatOutput(buildDiff(
        yaml.safeLoad(readFile(filepath1)),
        yaml.safeLoad(readFile(filepath2)),
      ), format);
    case '.ini':
      return formatOutput(buildDiff(
        ini.parse(readFile(filepath1)),
        ini.parse(readFile(filepath2)),
      ), format);
    default:
      return 'No parser for this extension or different extension';
  }
};
