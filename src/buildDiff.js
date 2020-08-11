// Lodash utility library - https://lodash.com/
import _ from 'lodash';

const getCorrectTypeOfValue = (value) => {
  const isIncorrectType = (finalValue) => (((typeof finalValue === 'string')
    && (/^[\d]+$/.test(finalValue))));
  const convertToNumber = (finalValue) => (isIncorrectType(finalValue)
    ? parseInt(finalValue, 10) : finalValue);

  if (!_.isObject(value)) {
    return convertToNumber(value);
  }

  return Object.entries(value).reduce((acc, [key, objValue]) => ({
    ...acc,
    [key]: _.isObject(objValue) ? getCorrectTypeOfValue(objValue) : convertToNumber(objValue),
  }), {});
};

const buildDiff = (oldJsonObj, newJsonObj) => {
  const keys = _.union(Object.keys(oldJsonObj), Object.keys(newJsonObj));

  return keys.map((key) => {
    const [oldValue, newValue] = [oldJsonObj[key], newJsonObj[key]];

    // no key in the old object
    if (!_.has(oldJsonObj, key)) {
      return {
        key,
        value: getCorrectTypeOfValue(newValue),
        type: 'added',
      };
    }

    // no key in the new object
    if (!_.has(newJsonObj, key)) {
      return {
        key,
        value: getCorrectTypeOfValue(oldValue),
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
        value: getCorrectTypeOfValue(oldValue),
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
