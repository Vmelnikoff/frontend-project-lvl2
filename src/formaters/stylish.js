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
  const iter = (node, depth) => node.flatMap((obj) => {
    const {
      key, value, children, type,
    } = obj;

    switch (type) {
      case 'added':
        return `${getIndent(depth)}+ ${key}: ${stringify(key, value, depth + 1)}`;
      case 'removed':
        return `${getIndent(depth)}- ${key}: ${stringify(key, value, depth + 1)}`;
      case 'changed':
        return [
          `${getIndent(depth)}- ${key}: ${stringify(key, value.oldValue, depth + 1)}`,
          `${getIndent(depth)}+ ${key}: ${stringify(key, value.newValue, depth + 1)}`,
        ];
      case 'unchanged':
        return `${getIndent(depth)}  ${key}: ${stringify(key, value, depth + 1)}`;
      case 'nested':
        return `${getIndent(depth)}  ${key}: {\n${iter(children, depth + 2)
          .join('\n')}\n${getIndent(depth + 1)}}`;
      default:
        throw new Error(`Unknown type - ${type}!`);
    }
  });

  const result = iter(diff, 1);

  return `{\n${result.join('\n')}\n}`;
};

export default stylishFormat;
