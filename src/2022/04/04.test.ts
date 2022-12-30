import { parseDecimalInt } from '../../utils';
import puzzleInput from './puzzleInput';

const exampleInput = `
2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8
`;

const parseElfPairs = (input: string): number[][][] =>
  input
    .trim()
    .split('\n')
    .map((pair) =>
      pair.split(',').map((section) => section.split('-').map(parseDecimalInt)),
    );

describe('part 1', () => {
  const countPairsContainingOwnSection = (input: string): number => {
    const pairs = parseElfPairs(input);

    const pairsContainingOwnSection = pairs.filter((pair) => {
      const [[firstElfStart, firstElfEnd], [secondElfStart, secondElfEnd]] =
        pair;

      const firstElfSectionContainsSecondElfSection =
        secondElfStart >= firstElfStart && secondElfEnd <= firstElfEnd;
      const secondElfSectionContainsFirstElfSection =
        firstElfStart >= secondElfStart && firstElfEnd <= secondElfEnd;

      return (
        firstElfSectionContainsSecondElfSection ||
        secondElfSectionContainsFirstElfSection
      );
    });
    return pairsContainingOwnSection.length;
  };

  it('example', () => {
    expect(countPairsContainingOwnSection(exampleInput)).toBe(2);
  });

  it('answer', () => {
    expect(countPairsContainingOwnSection(puzzleInput)).toBe(453);
  });
});

describe('part 2', () => {
  const countOverlappingPairs = (input: string): number => {
    const pairs = parseElfPairs(input);

    const overlappingPairs = pairs.filter(
      ([[firstElfStart, firstElfEnd], [secondElfStart, secondElfEnd]]) =>
        firstElfEnd >= secondElfStart && firstElfStart <= secondElfEnd,
    );
    return overlappingPairs.length;
  };

  it('example', () => {
    expect(countOverlappingPairs(exampleInput)).toBe(4);
  });

  it('answer', () => {
    expect(countOverlappingPairs(puzzleInput)).toBe(919);
  });
});
