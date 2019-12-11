const sum = (array) => array.reduce((a, b) => a + b, 0);

const deepClone = (obj) => JSON.parse(JSON.stringify(obj));

export {
  sum,
  deepClone,
};
