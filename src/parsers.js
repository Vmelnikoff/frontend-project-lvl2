import yamlParser from 'js-yaml';
import iniParser from 'ini';

export default (content, type) => {
  switch (type) {
    case 'json':
      return JSON.parse(content);
    case 'yml':
      return yamlParser.safeLoad(content);
    case 'ini':
      return iniParser.parse(content);
    default:
      throw new Error(`No parser for this extension - ${type}!`);
  }
};
