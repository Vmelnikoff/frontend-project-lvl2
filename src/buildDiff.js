// Lodash utility library - https://lodash.com/
import _ from 'lodash';

const buildDiff = (oldJsonObj, newJsonObj) => {
  const keys = _.union(Object.keys(oldJsonObj), Object.keys(newJsonObj));

  return keys.map((key) => {
    const [oldValue, newValue] = [oldJsonObj[key], newJsonObj[key]];

    // no key in the old object
    if (!_.has(oldJsonObj, key)) {
      return {
        key,
        value: newValue,
        type: 'added',
      };
    }

    // no key in the new object
    if (!_.has(newJsonObj, key)) {
      return {
        key,
        value: oldValue,
        type: 'removed',
      };
    }

    // value of the same key in both structures is an object
    if (_.isObject(oldValue) && _.isObject(newValue)) {
      return {
        key,
        value: buildDiff(oldValue, newValue),
        type: 'nested',
      };
    }

    return (oldValue === newValue)
      ? {
        key,
        value: oldValue,
        type: 'unchanged',
      }
      : {
        key,
        value: {
          oldValue,
          newValue,
        },
        type: 'changed',
      };
  });
};

export default buildDiff;
