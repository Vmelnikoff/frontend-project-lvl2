// Lodash utility library - https://lodash.com/
import _ from 'lodash';
// File System Node Module - https://nodejs.org/api/fs.html
import fs from 'fs';
// Path Node Module - https://nodejs.org/api/path.html
import path from 'path';

const parseJsonObj = ([jsonObj1, jsonObj2]) => {
  const keys = _.union(Object.keys(jsonObj1), Object.keys(jsonObj2));
  const result = keys.map((key) => {
    const [value1, value2] = [jsonObj1[key], jsonObj2[key]];

    if (_.has(jsonObj1, key) && _.has(jsonObj2, key)) {
      return (value1 === value2)
        ? `    ${key}: ${jsonObj1[key]}\n`
        : `  - ${key}: ${jsonObj1[key]}\n  + ${key}: ${jsonObj2[key]}\n`;
    }

    return (_.has(jsonObj1, key))
      ? `  - ${key}: ${jsonObj1[key]}\n`
      : `  + ${key}: ${jsonObj2[key]}\n`;
  });

  return ['\n{\n', ...result, '}'].join('');
};

const getObjsFromFiles = (filepath1, filepath2) => {
  // Build absolute paths
  const cwd = process.cwd();
  const absoluteFilePath1 = path.resolve(cwd, filepath1);
  const absoluteFilePath2 = path.resolve(cwd, filepath2);

  // Read data from files
  const file1 = fs.readFileSync(absoluteFilePath1, 'utf-8');
  const file2 = fs.readFileSync(absoluteFilePath2, 'utf-8');
  const jsonObj1 = JSON.parse(file1);
  const jsonObj2 = JSON.parse(file2);

  return [jsonObj1, jsonObj2];
};

export default (filepath1, filepath2) => parseJsonObj(getObjsFromFiles(filepath1, filepath2));
