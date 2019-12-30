const sum = (array) => array.reduce((a, b) => a + b, 0);

const deepClone = (obj) => (obj
  ? JSON.parse(JSON.stringify(obj))
  : obj);

export {
  sum,
  deepClone,
};
