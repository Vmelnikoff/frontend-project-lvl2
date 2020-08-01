// Lodash utility library - https://lodash.com/
import _ from 'lodash';

const buildOutputStr = (key, value, type) => {
  const prepareValue = (curValue) => {
    if (_.isObject(curValue)) {
      return '[complex value]';
    }

    return _.isBoolean(curValue) ? curValue : `'${curValue}'`;
  };

  let endStr;

  if (type === 'removed') {
    endStr = 'removed';
  }

  if (type === 'added') {
    endStr = `added with value: ${prepareValue(value)}`;
  }

  if (type === 'changed') {
    endStr = `updated. From ${prepareValue(value.oldValue)} to ${prepareValue(value.newValue)}`;
  }

  return `Property '${key}' was ${endStr}`;
};

const plainFormat = (diff) => {
  const iter = (node, oldKey) => {
    const output = node
      .filter((obj) => obj.type !== 'unchanged')
      .map((obj) => {
        const { key, value, type } = obj;
        const newKey = (oldKey === null) ? key : `${oldKey}.${key}`;

        if (type !== 'nested') {
          return `${buildOutputStr(newKey, value, type)}`;
        }

        return iter(value, newKey);
      });

    return output.flat();
  };

  return `\n${iter(diff, null).join('\n')}`;
};

export default plainFormat;
