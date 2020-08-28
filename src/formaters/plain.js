import _ from 'lodash';

const prepareValue = (curValue) => {
  if (_.isObject(curValue)) {
    return '[complex value]';
  }

  return _.isBoolean(curValue) ? curValue : `'${curValue}'`;
};

const plainFormat = (diff) => {
  const iter = (node, oldKey) => {
    const output = node
      .filter((obj) => obj.type !== 'unchanged')
      .map((obj) => {
        const { key, value, type } = obj;
        const newKey = (oldKey === null) ? key : `${oldKey}.${key}`;
        const beginStr = `Property '${newKey}' was`;

        switch (type) {
          case 'removed':
            return `${beginStr} removed`;
          case 'added':
            return `${beginStr} added with value: ${prepareValue(value)}`;
          case 'changed':
            return `${beginStr} updated. From ${prepareValue(value.oldValue)} to ${prepareValue(value.newValue)}`;
          default:
            return iter(value, newKey);
        }
      });

    return output.flat();
  };

  return `\n${iter(diff, null).join('\n')}`;
};

export default plainFormat;
