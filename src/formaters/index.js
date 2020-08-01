import plainFormat from './plain.js';
import stylishFormat from './stylish.js';

const formatOutput = (diff, format) => {
  switch (format) {
    case 'plain':
      return plainFormat(diff);
    case 'stylish':
      return stylishFormat(diff);
    default:
      return 'Unknown formatter';
  }
};

export default formatOutput;
