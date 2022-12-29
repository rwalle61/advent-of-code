/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { sum } from '../../utils';
import { parseEntries } from './countUniqueDigits';

const hasLength =
  (length: number) =>
  (pattern: string): boolean =>
    pattern.length === length;

const segments = (pattern: string): string[] => pattern.split('');

const segmentIsInPattern = (pattern: string) => (segment: string) =>
  segments(pattern).includes(segment);

const segmentIsNotInPattern = (pattern: string) => (segment: string) =>
  !segments(pattern).includes(segment);

const decodeOutputValue = (entry: string): number => {
  const [signalPatterns, outputSignalPatterns] = entry
    .split(' | ')
    .map((line) => line.split(' '));

  const ONE = signalPatterns.find(hasLength(2))!;
  const FOUR = signalPatterns.find(hasLength(4))!;
  const SEVEN = signalPatterns.find(hasLength(3))!;
  const EIGHT = signalPatterns.find(hasLength(7))!;

  const twoThreeAndFive = signalPatterns.filter(hasLength(5));

  const THREE = twoThreeAndFive.find((twoThreeOrFive) =>
    segments(ONE).every(segmentIsInPattern(twoThreeOrFive)),
  )!;

  const zeroSixAndNine = signalPatterns.filter(
    (pattern) => pattern.length === 6,
  );

  const SIX = zeroSixAndNine.find((zeroSixOrNine) =>
    segments(ONE).some(segmentIsNotInPattern(zeroSixOrNine)),
  )!;

  const topRightSegment = segments(ONE).find(segmentIsNotInPattern(SIX))!;

  const FIVE = twoThreeAndFive.find((twoOrFive) =>
    segmentIsNotInPattern(twoOrFive)(topRightSegment),
  )!;

  const TWO = twoThreeAndFive.find(
    (pattern) => pattern !== THREE && pattern !== FIVE,
  )!;

  const bottomLeftSegment = segments(SIX).find(segmentIsNotInPattern(FIVE));

  const NINE = zeroSixAndNine.find((zeroOrNine) =>
    segments(zeroOrNine).every((segment) => segment !== bottomLeftSegment),
  )!;

  const ZERO = zeroSixAndNine.find(
    (pattern) => pattern !== SIX && pattern !== NINE,
  )!;

  const sortPattern = (pattern: string): string =>
    pattern.split('').sort().join();

  const patternToDigit = {
    [sortPattern(ZERO)]: 0,
    [sortPattern(ONE)]: 1,
    [sortPattern(TWO)]: 2,
    [sortPattern(THREE)]: 3,
    [sortPattern(FOUR)]: 4,
    [sortPattern(FIVE)]: 5,
    [sortPattern(SIX)]: 6,
    [sortPattern(SEVEN)]: 7,
    [sortPattern(EIGHT)]: 8,
    [sortPattern(NINE)]: 9,
  };

  const outputDigits = outputSignalPatterns.map(
    (pattern) => patternToDigit[sortPattern(pattern)],
  );

  const outputValue = parseInt(outputDigits.join(''), 10);

  return outputValue;
};
export const sumOutputValues = (entriesString: string): number => {
  const entries = parseEntries(entriesString);
  return sum(entries.map(decodeOutputValue));
};
