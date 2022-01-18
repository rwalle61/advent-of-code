import {
  addAndReduce,
  calculateMagnitude,
  parseSnailfishNumbers,
} from './part1';

export const maxMagnitudeOfSumOf2Numbers = (rawNumbers: string): number => {
  const snailfishNumbers = parseSnailfishNumbers(rawNumbers);
  const magnitudes: number[] = [];

  snailfishNumbers.forEach((number1, i) => {
    snailfishNumbers.forEach((number2, j) => {
      if (i !== j) {
        magnitudes.push(calculateMagnitude(addAndReduce(number1, number2)));
        magnitudes.push(calculateMagnitude(addAndReduce(number2, number1)));
      }
    });
  });
  return Math.max(...magnitudes);
};
