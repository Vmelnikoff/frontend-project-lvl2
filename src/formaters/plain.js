import _ from 'lodash';

const prepareValue = (curValue) => {
  if (_.isObject(curValue)) {
    return '[complex value]';
  }

  return _.isBoolean(curValue) ? curValue : `'${curValue}'`;
};

const prepareResultArr = (node, oldKey) => node
  .filter((obj) => obj.type !== 'unchanged')
  .flatMap((obj) => {
    const {
      key, value, children, type,
    } = obj;
    const newKey = (oldKey === null) ? key : `${oldKey}.${key}`;
    const beginStr = `Property '${newKey}' was`;

    switch (type) {
      case 'removed':
        return `${beginStr} removed`;
      case 'added':
        return `${beginStr} added with value: ${prepareValue(value)}`;
      case 'changed':
        return `${beginStr} updated. From ${prepareValue(value.oldValue)} to ${prepareValue(value.newValue)}`;
      case 'nested':
        return prepareResultArr(children, newKey);
      default:
        throw new Error(`Unknown type - ${type}!`);
    }
  });

const plainFormat = (diff) => `${prepareResultArr(diff, null).join('\n')}`;

export default plainFormat;
