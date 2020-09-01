import _ from 'lodash';

const getIndent = (deep) => ' '.repeat(deep * 2);

const stringify = (key, value, deep) => {
  if (!_.isObject(value)) {
    return value;
  }

  const objs = Object
    .entries(value)
    .map(([key2, value2]) => `${key2}: ${value2}`);

  return `{\n${getIndent(deep + 2)}${objs}\n${getIndent(deep)}}`;
};

const stylishFormat = (diff) => {
  const deep = 1;

  const iter = (node, level) => node.flatMap((obj) => {
    const { key, value, type } = obj;

    switch (type) {
      case 'added':
        return `${getIndent(level)}+ ${key}: ${stringify(key, value, level + 1)}`;
      case 'removed':
        return `${getIndent(level)}- ${key}: ${stringify(key, value, level + 1)}`;
      case 'changed':
        return [
          `${getIndent(level)}- ${key}: ${stringify(key, value.oldValue, level + 1)}`,
          `${getIndent(level)}+ ${key}: ${stringify(key, value.newValue, level + 1)}`,
        ];
      case 'unchanged':
        return `${getIndent(level)}  ${key}: ${stringify(key, value, level + 1)}`;
      case 'nested':
        return `${getIndent(level)}  ${key}: {\n${iter(value, level + 2)
          .join('\n')}\n${getIndent(level + 1)}}`;
      default:
        throw new Error(`Unknown type - ${type}!`);
    }
  });

  const result = iter(diff, deep);

  return `{\n${result.join('\n')}\n}`;
};

export default stylishFormat;
