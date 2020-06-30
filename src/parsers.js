// Lodash utility library - https://lodash.com/
import _ from 'lodash';
// File System Node Module - https://nodejs.org/api/fs.html
import fs from 'fs';
// Path Node Module - https://nodejs.org/api/path.html
import path from 'path';
// JS-YAML parser - https://github.com/nodeca/js-yaml
import yaml from 'js-yaml';
// INI parser - https://github.com/npm/ini
import ini from 'ini';

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

const getDataFromFile = (filepath) => {
  // Get current working dir
  const cwd = process.cwd();
  // Read data from file with absolute path
  return fs.readFileSync(path.resolve(cwd, filepath), 'utf-8');
};

export default (filepath1, filepath2) => {
  switch (path.extname(filepath1) && path.extname(filepath2)) {
    case '.json':
      return parseJsonObj([
        JSON.parse(getDataFromFile(filepath1)),
        JSON.parse(getDataFromFile(filepath2)),
      ]);
    case '.yml':
      return parseJsonObj([
        yaml.safeLoad(getDataFromFile(filepath1)),
        yaml.safeLoad(getDataFromFile(filepath2)),
      ]);
    case '.ini':
      return parseJsonObj([
        ini.parse(getDataFromFile(filepath1)),
        ini.parse(getDataFromFile(filepath2)),
      ]);
    default:
      return 'No parser for this extension or different extension';
  }
};
