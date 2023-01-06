export const parseDecimalInt = (string: string): number => parseInt(string, 10);

export const sum = (array: number[]): number =>
  array.reduce((a, b) => a + b, 0);

export const unique = <T>(array: T[]): T[] => [...new Set(array)];

export const deepClone = <T>(obj: T): T => {
  if (obj && typeof obj !== 'number') {
    if (Array.isArray(obj)) {
      return obj.map(deepClone) as unknown as T;
    }
    return JSON.parse(JSON.stringify(obj));
  }

  return obj;
};

export const findLast = <T>(
  array: T[],
  condition: (element: T) => boolean,
): T | undefined =>
  array
    .slice()
    .reverse()
    .find((element) => condition(element));

export const arrayOf = <T>(element: T, length: number): T[] =>
  Array(length)
    .fill(undefined)
    .map(() => deepClone(element));
