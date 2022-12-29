export const parseDecimalInt = (string: string): number => parseInt(string, 10);

export const sum = (array: number[]): number =>
  array.reduce((a, b) => a + b, 0);

export const unique = <T>(array: T[]): T[] => [...new Set(array)];

export const deepClone = <T>(obj: T): T =>
  obj ? JSON.parse(JSON.stringify(obj)) : obj;

export const findLast = <T>(
  array: T[],
  condition: (element: T) => boolean,
): T =>
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  array
    .slice()
    .reverse()
    .find((element) => condition(element))!;
