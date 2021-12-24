export const parseDecimalInt = (string: string): number => parseInt(string, 10);

export const sum = (array: number[]): number =>
  array.reduce((a, b) => a + b, 0);

export const deepClone = (obj: unknown) =>
  obj ? JSON.parse(JSON.stringify(obj)) : obj;

export const findLast = <T>(arr: T[], condition: (element: T) => boolean): T =>
  arr
    .slice()
    .reverse()
    .find((element) => condition(element));
