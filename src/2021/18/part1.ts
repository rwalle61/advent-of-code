import { parseDecimalInt } from '../../utils';

export const parseSnailfishNumbers = (rawNumbers: string) =>
  rawNumbers.trim().split('\n');

export const add = (number1: string, number2: string): string =>
  `[${number1},${number2}]`;

const explodePairAtIndex = (snailfishNumber: string, index: number) => {
  const stringBeforePair = snailfishNumber.substring(0, index);
  const stringAfterPairStart = snailfishNumber.substring(index);
  const indexOfPairEnd = stringAfterPairStart.indexOf(']');

  const pair = stringAfterPairStart.substring(0, indexOfPairEnd + 1);

  const stringAfterPair = stringAfterPairStart.substring(indexOfPairEnd + 1);

  const [pairLeftValue, pairRightValue] = pair
    .slice(1, pair.length)
    .split(',')
    .map(parseDecimalInt);

  const newStringBeforePair = stringBeforePair.replace(
    /([0-9]+)([[\],]+$)/,
    (_, regularNumberToLeft: string, gapBetweenNumberAndPair: string) =>
      `${
        parseDecimalInt(regularNumberToLeft) + pairLeftValue
      }${gapBetweenNumberAndPair}`,
  );

  const newStringAfterPair = stringAfterPair.replace(
    /[0-9]+/,
    (regularNumberToRight: string) =>
      `${parseDecimalInt(regularNumberToRight) + pairRightValue}`,
  );

  return `${newStringBeforePair}0${newStringAfterPair}`;
};

const splitFirstRegularNumber = (
  snailfishNumber: string,
  regularNumber: string,
) => {
  const index = snailfishNumber.indexOf(regularNumber);
  const stringBeforeRegularNumber = snailfishNumber.substring(0, index);
  const stringAfterRegularNumber = snailfishNumber.substring(
    index + regularNumber.length,
  );

  const leftElementOfNewPair = Math.floor(parseDecimalInt(regularNumber) / 2);
  const rightElementOfNewPair = Math.ceil(parseDecimalInt(regularNumber) / 2);

  const newPair = `[${leftElementOfNewPair},${rightElementOfNewPair}]`;
  return `${stringBeforeRegularNumber}${newPair}${stringAfterRegularNumber}`;
};

export const reduceOnce = (snailfishNumber: string): string => {
  // explode number if applicable
  let nestingLevel = 0;

  for (let i = 0; i < snailfishNumber.length; i += 1) {
    if (snailfishNumber.charAt(i) === '[') {
      nestingLevel += 1;
    }
    if (snailfishNumber.charAt(i) === ']') {
      nestingLevel -= 1;
    }
    if (nestingLevel === 5) {
      return explodePairAtIndex(snailfishNumber, i);
    }
  }

  // split number if applicable
  const firstRegularNumberGreaterThanOrEqualTo10 = snailfishNumber
    .replace(/[[\]]/g, '')
    .split(',')
    .find((regularNumber: string) => parseDecimalInt(regularNumber) >= 10);

  if (firstRegularNumberGreaterThanOrEqualTo10) {
    return splitFirstRegularNumber(
      snailfishNumber,
      firstRegularNumberGreaterThanOrEqualTo10,
    );
  }

  // else return number unchanged
  return snailfishNumber;
};

export const reduce = (snailfishNumber: string): string => {
  const newSnailfishNumber = reduceOnce(snailfishNumber);
  if (newSnailfishNumber === snailfishNumber) {
    return snailfishNumber;
  }
  return reduce(newSnailfishNumber);
};

export const addAndReduce = (number1: string, number2: string): string =>
  reduce(add(number1, number2));

export const sumSnailfishNumbers = (snailfishNumbers: string[]): string =>
  snailfishNumbers.reduce((currentSum, snailfishNumber) =>
    addAndReduce(currentSum, snailfishNumber),
  );

const calculateMagnitudeOfPair = (snailfishNumber: string): number => {
  const [leftElement, rightElement] = snailfishNumber
    .replace(/[[\]]/g, '')
    .split(',')
    .map(parseDecimalInt);
  return leftElement * 3 + rightElement * 2;
};

export const calculateMagnitude = (snailfishNumber: string): number => {
  const newSnailfishNumber = snailfishNumber.replace(
    /\[[0-9]+,[0-9]+\]/,
    (pair: string) => `${calculateMagnitudeOfPair(pair)}`,
  );

  if (snailfishNumber === newSnailfishNumber) {
    return parseDecimalInt(snailfishNumber);
  }
  return calculateMagnitude(newSnailfishNumber);
};

export const calculateMagnitudeOfFinalSum = (rawNumbers: string): number => {
  const snailfishNumbers = parseSnailfishNumbers(rawNumbers);
  const finalSum = sumSnailfishNumbers(snailfishNumbers);
  return calculateMagnitude(finalSum);
};
