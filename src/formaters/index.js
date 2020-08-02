import plainFormat from './plain.js';
import stylishFormat from './stylish.js';
import jsonFormat from './json.js';

const formatOutput = (diff, format) => {
  switch (format) {
    case 'plain':
      return plainFormat(diff);
    case 'stylish':
      return stylishFormat(diff);
    case 'json':
      return jsonFormat(diff);
    default:
      return 'Unknown formatter';
  }
};

export default formatOutput;
