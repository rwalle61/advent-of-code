import { getElementQuantityRangeSlow, growPolymer } from './part1';
import { countElements, getElementQuantityRangeFast } from './part2';
import puzzleInput from './puzzleInput';

const exampleInstructions = `
NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C
`;

describe('part 1', () => {
  it('example 1 - growPolymer().polymer', () => {
    expect(growPolymer(exampleInstructions, 0).polymer).toBe('NNCB');
    expect(growPolymer(exampleInstructions, 1).polymer).toBe('NCNBCHB');
    expect(growPolymer(exampleInstructions, 2).polymer).toBe('NBCCNBBBCBHCB');
    expect(growPolymer(exampleInstructions, 3).polymer).toBe(
      'NBBBCNCCNBBNBNBBCHBHHBCHB',
    );
    expect(growPolymer(exampleInstructions, 4).polymer).toBe(
      'NBBNBNBBCCNBCNCCNBBNBBNBBBNBBNBBCBHCBHHNHCBBCBHCB',
    );
  });

  it('example 1 - growPolymer().elementCounts', () => {
    const quantities = growPolymer(exampleInstructions, 10).elementCounts;

    expect(quantities).toMatchObject({ B: 1749, C: 298, H: 161, N: 865 });
  });

  it('example 1 - getElementQuantityRangeSlow()', () => {
    const quantityRange = getElementQuantityRangeSlow(exampleInstructions, 10);

    expect(quantityRange).toBe(1588);
  });

  it('answer', () => {
    const quantityRange = getElementQuantityRangeSlow(puzzleInput, 10);

    expect(quantityRange).toBe(3406);
  });
});

describe('part 2', () => {
  it('example - countElements()', () => {
    expect(countElements(exampleInstructions, 0)).toStrictEqual({
      N: 2,
      C: 1,
      B: 1,
    });

    expect(countElements(exampleInstructions, 1)).toStrictEqual({
      N: 2,
      C: 2,
      B: 2,
      H: 1,
    });

    expect(countElements(exampleInstructions, 2)).toStrictEqual({
      N: 2,
      C: 4,
      B: 6,
      H: 1,
    });

    expect(countElements(exampleInstructions, 3)).toStrictEqual({
      N: 5,
      C: 5,
      B: 11,
      H: 4,
    });
  });

  it('example - getElementQuantityRangeFast()', () => {
    expect(getElementQuantityRangeFast(exampleInstructions, 10)).toBe(1588);

    expect(getElementQuantityRangeFast(exampleInstructions, 40)).toBe(
      2188189693529,
    );
  });

  it('answer', () => {
    const quantityRange = getElementQuantityRangeFast(puzzleInput, 40);

    expect(quantityRange).toBe(3941782230241);
  });
});
