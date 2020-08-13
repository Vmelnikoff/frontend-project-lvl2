// JS-YAML parser - https://github.com/nodeca/js-yaml
import yaml from 'js-yaml';
// INI parser - https://github.com/npm/ini
import ini from 'ini';

import buildDiff from './buildDiff.js';

const getJsonObj = (content, extension) => {
  switch (extension) {
    case '.json':
      return JSON.parse(content);
    case '.yml':
      return yaml.safeLoad(content);
    case '.ini':
      return ini.parse(content);
    default:
      throw new Error(`No parser for this extension - ${extension.slice(1)}!`);
  }
};

export default (oldContent, newContent, extension) => {
  const oldJsonObj = getJsonObj(oldContent, extension);
  const newJsonObj = getJsonObj(newContent, extension);

  return buildDiff(oldJsonObj, newJsonObj);
};
