import _ from 'lodash';

const buildDiff = (oldJsonObj, newJsonObj) => {
  const keys = _.union(Object.keys(oldJsonObj), Object.keys(newJsonObj));

  return keys.map((key) => {
    const oldData = oldJsonObj[key];
    const newData = newJsonObj[key];

    // no key in the old object
    if (!_.has(oldJsonObj, key)) {
      return { key, value: newData, type: 'added' };
    }

    // no key in the new object
    if (!_.has(newJsonObj, key)) {
      return { key, value: oldData, type: 'removed' };
    }

    // value of the same key in both structures is an object
    if (_.isObject(oldData) && _.isObject(newData)) {
      return { key, value: buildDiff(oldData, newData), type: 'nested' };
    }

    return (oldData === newData)
      ? { key, value: oldData, type: 'unchanged' }
      : { key, value: { oldValue: oldData, newValue: newData }, type: 'changed' };
  });
};

export default buildDiff;
