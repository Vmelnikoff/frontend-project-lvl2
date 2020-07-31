// Lodash utility library - https://lodash.com/
import _ from 'lodash';

const getIndent = (deep) => ' '.repeat(deep * 2);

const stringify = (key, value, deep) => {
  if (!_.isObject(value)) {
    return value;
  }

  const objs = Object.entries(value)
    .map(([key2, value2]) => `${key2}: ${value2}`);

  return `{\n${getIndent(deep + 2)}${objs}\n${getIndent(deep)}}`;
};

const stylishFormat = (data) => {
  const deep = 1;

  const iter = (node, level) => {
    const result = node.map((obj) => {
      const { key, value, type } = obj;

      if (type === 'added') {
        return `${getIndent(level)}+ ${key}: ${stringify(key, value, level + 1)}`;
      }

      if (type === 'removed') {
        return `${getIndent(level)}- ${key}: ${stringify(key, value, level + 1)}`;
      }

      if (type === 'unchanged') {
        return `${getIndent(level)}  ${key}: ${stringify(key, value, level + 1)}`;
      }

      if (type === 'changed') {
        return [
          `${getIndent(level)}- ${key}: ${stringify(key, value.oldValue, level + 1)}`,
          `${getIndent(level)}+ ${key}: ${stringify(key, value.newValue, level + 1)}`,
        ];
      }

      // Nested output
      return `${getIndent(level)}  ${key}: {\n${iter(value, level + 2).join('\n')}\n${getIndent(level + 1)}}`;
    });

    return result.flat();
  };

  const result = iter(data, deep);

  return `\n{\n${result.join('\n')}\n}`;
};

export default stylishFormat;
