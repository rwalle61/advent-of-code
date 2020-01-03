const sum = (array) => array.reduce((a, b) => a + b, 0);

const deepClone = (obj) => (obj
  ? JSON.parse(JSON.stringify(obj))
  : obj);

const findLast = (arr, condition) => arr
  .slice()
  .reverse()
  .find((element) => condition(element));

export {
  sum,
  deepClone,
  findLast,
};
