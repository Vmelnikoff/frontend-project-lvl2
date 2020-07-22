// File System Node Module - https://nodejs.org/api/fs.html
import fs from 'fs';
// Path Node Module - https://nodejs.org/api/path.html
import path from 'path';
// JS-YAML parser - https://github.com/nodeca/js-yaml
import yaml from 'js-yaml';
// INI parser - https://github.com/npm/ini
import ini from 'ini';

import buildDiff from './buildDiff.js';

const getPath = (filename) => `${path.resolve(process.cwd(), filename)}`;
export const readFile = (filename) => fs.readFileSync(getPath(filename), 'utf-8');

// const parseJsonObj = (jsonObj1, jsonObj2) => {
//   const keys = _.union(Object.keys(jsonObj1), Object.keys(jsonObj2));
//   const result = keys.map((key) => {
//     const [value1, value2] = [jsonObj1[key], jsonObj2[key]];
//
//     if (_.has(jsonObj1, key) && _.has(jsonObj2, key)) {
//       return (value1 === value2)
//         ? `    ${key}: ${jsonObj1[key]}\n`
//         : `  - ${key}: ${jsonObj1[key]}\n  + ${key}: ${jsonObj2[key]}\n`;
//     }
//
//     return (_.has(jsonObj1, key))
//       ? `  - ${key}: ${jsonObj1[key]}\n`
//       : `  + ${key}: ${jsonObj2[key]}\n`;
//   });
//
//   return ['\n{\n', ...result, '}'].join('');
// };

export default (filepath1, filepath2) => {
  switch (path.extname(filepath1) && path.extname(filepath2)) {
    case '.json':
      return buildDiff(
        JSON.parse(readFile(filepath1)),
        JSON.parse(readFile(filepath2)),
      );
    case '.yml':
      return buildDiff(
        yaml.safeLoad(readFile(filepath1)),
        yaml.safeLoad(readFile(filepath2)),
      );
    case '.ini':
      return buildDiff(
        ini.parse(readFile(filepath1)),
        ini.parse(readFile(filepath2)),
      );
    default:
      return 'No parser for this extension or different extension';
  }
};
