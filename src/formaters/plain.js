const plainFormat = (diff) => {
  const result = diff.map((obj) => {
    if (obj.type === 'unchanged') {
      return `    ${obj.key}: ${obj.value}\n`;
    }

    if (obj.type === 'added') {
      return `  + ${obj.key}: ${obj.value}\n`;
    }

    if (obj.type === 'removed') {
      return `  - ${obj.key}: ${obj.value}\n`;
    }

    return `  - ${obj.key}: ${obj.value.oldValue}\n  + ${obj.key}: ${obj.value.newValue}\n`;
  });

  return ['\n{\n', ...result, '}'].join('');
};

export default plainFormat;
