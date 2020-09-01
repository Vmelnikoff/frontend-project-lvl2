import plainFormat from './plain.js';
import stylishFormat from './stylish.js';
import jsonFormat from './json.js';

const formatOutput = (diff, format) => {
  console.log(diff);

  switch (format) {
    case 'plain':
      return plainFormat(diff);
    case 'stylish':
      return stylishFormat(diff);
    case 'json':
      return jsonFormat(diff);
    default:
      throw new Error(`Unknown formatter - ${format}!`);
  }
};

export default formatOutput;
