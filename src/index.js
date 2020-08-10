import parserFactory from './parsers.js';

export default (filepath1, filepath2, format = 'stylish') => parserFactory(filepath1, filepath2, format);
