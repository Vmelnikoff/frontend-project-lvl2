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
  const iter = (node, deep) => node.flatMap((obj) => {
    const {
      key, value, children, type,
    } = obj;

    switch (type) {
      case 'added':
        return `${getIndent(deep)}+ ${key}: ${stringify(key, value, deep + 1)}`;
      case 'removed':
        return `${getIndent(deep)}- ${key}: ${stringify(key, value, deep + 1)}`;
      case 'changed':
        return [
          `${getIndent(deep)}- ${key}: ${stringify(key, value.oldValue, deep + 1)}`,
          `${getIndent(deep)}+ ${key}: ${stringify(key, value.newValue, deep + 1)}`,
        ];
      case 'unchanged':
        return `${getIndent(deep)}  ${key}: ${stringify(key, value, deep + 1)}`;
      case 'nested':
        return `${getIndent(deep)}  ${key}: {\n${iter(children, deep + 2)
          .join('\n')}\n${getIndent(deep + 1)}}`;
      default:
        throw new Error(`Unknown type - ${type}!`);
    }
  });

  const result = iter(diff, 1);

  return `{\n${result.join('\n')}\n}`;
};

export default stylishFormat;
