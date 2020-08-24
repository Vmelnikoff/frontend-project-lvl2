import _ from 'lodash';

const normalizeContent = (obj) => {
  const isIncorrectType = (value) => (((typeof value === 'string')
    && (/^[\d]+$/.test(value))));
  const normalizeNumber = (value) => (isIncorrectType(value)
    ? parseInt(value, 10) : value);

  if (!_.isObject(obj)) {
    return normalizeNumber(obj);
  }

  return Object.entries(obj).reduce((acc, [key, value]) => ({
    ...acc,
    [key]: _.isObject(value) ? normalizeContent(value) : normalizeNumber(value),
  }), {});
};

export default normalizeContent;
