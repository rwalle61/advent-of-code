import { sumRiskOfLowPoints } from './part1';
import { multiply3LargestBasinSizes } from './part2';
import puzzleInput from './puzzleInput';

const exampleHeightmap = `
2199943210
3987894921
9856789892
8767896789
9899965678
`;

describe('part 1', () => {
  it('example', () => {
    const risk = sumRiskOfLowPoints(exampleHeightmap);

    expect(risk).toBe(15);
  });

  it('answer', () => {
    const risk = sumRiskOfLowPoints(puzzleInput);

    expect(risk).toBe(423);
  });
});

describe('part 2', () => {
  it('example', () => {
    const productOf3LargestBasinSizes =
      multiply3LargestBasinSizes(exampleHeightmap);

    expect(productOf3LargestBasinSizes).toBe(1134);
  });

  it('answer', () => {
    const productOf3LargestBasinSizes = multiply3LargestBasinSizes(puzzleInput);

    expect(productOf3LargestBasinSizes).toBe(1198704);
  });
});
