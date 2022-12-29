import { Dot, foldDot, parseFoldInstructions } from './part1';

const drawLetters = (dots: Dot[]): string => {
  const maxWidth = Math.max(...dots.map(([x]) => x)) + 1;
  const maxHeight = Math.max(...dots.map(([, y]) => y)) + 1;

  const dotsGrid = Array(maxHeight)
    .fill(null)
    .map(() => Array(maxWidth).fill(' '));

  for (let j = 0; j < maxHeight; j += 1) {
    for (let i = 0; i < maxWidth; i += 1) {
      if (dots.some(([x, y]) => x === i && y === j)) {
        dotsGrid[j][i] = '#';
      }
    }
  }

  return dotsGrid.map((row) => row.join('')).join('\n');
};

export const foldIntoLetters = (rawInstructions: string): string => {
  const { dots, foldLines } = parseFoldInstructions(rawInstructions);

  const foldedDots = foldLines.reduce(
    (currentDots, foldLine) => currentDots.map((dot) => foldDot(dot, foldLine)),
    dots,
  );

  const letters = drawLetters(foldedDots);

  return letters;
};
