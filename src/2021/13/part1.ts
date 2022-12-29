import { parseDecimalInt } from '../../utils';

export type Dot = [number, number];

type FoldLine = readonly [string, number];

export const parseFoldInstructions = (
  rawInstructions: string,
): { dots: Dot[]; foldLines: FoldLine[] } => {
  const [rawDots, rawFoldInstructions] = rawInstructions
    .trim()
    .split('\n\n')
    .map((section) => section.split('\n'));

  const dots = rawDots.map(
    (line) => line.split(',').map(parseDecimalInt) as Dot,
  );

  const foldLines = rawFoldInstructions
    .map((line) => line.split(' ')[2])
    .map((line) => {
      const [xOrY, foldCoordinate] = line.split('=');
      return [xOrY, parseDecimalInt(foldCoordinate)] as const;
    });

  return { dots, foldLines };
};

const foldDotCoordinate = (
  dotCoordinate: number,
  foldCoordinate: number,
): number => {
  const paperLength = 2 * foldCoordinate;
  return dotCoordinate < foldCoordinate
    ? dotCoordinate
    : paperLength - dotCoordinate;
};

export const foldDot = ([x, y]: Dot, foldLine: FoldLine): Dot => {
  const [xOrY, foldCoordinate] = foldLine;

  const foldLeft = xOrY === 'x';

  return foldLeft
    ? [foldDotCoordinate(x, foldCoordinate), y]
    : [x, foldDotCoordinate(y, foldCoordinate)];
};

export const countDotsAfterFirstFold = (rawInstructions: string): number => {
  const { dots, foldLines } = parseFoldInstructions(rawInstructions);

  const dotsAfterFold = dots.map((dot) => foldDot(dot, foldLines[0]));

  const numberOfUniqueDots = new Set(dotsAfterFold.map((dot) => dot.join(',')))
    .size;

  return numberOfUniqueDots;
};
