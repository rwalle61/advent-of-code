import { simulate } from './part1';
import { findFirstSimultaneousFlash } from './part2';
import puzzleInput from './puzzleInput';

const exampleEnergyGrid1 = `
11111
19991
19191
19991
11111
`;

const exampleEnergyGrid2 = `
5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526
`;

describe('part 1', () => {
  it('example 1', () => {
    expect(simulate(exampleEnergyGrid1, 1)).toMatchObject({
      newRawGrid: `
34543
40004
50005
40004
34543
    `.trim(),
      totalFlashes: 9,
    });

    expect(simulate(exampleEnergyGrid1, 2)).toMatchObject({
      newRawGrid: `
45654
51115
61116
51115
45654
    `.trim(),
      totalFlashes: 9,
    });
  });

  it('example 2', () => {
    expect(simulate(exampleEnergyGrid2, 1)).toMatchObject({
      newRawGrid: `
6594254334
3856965822
6375667284
7252447257
7468496589
5278635756
3287952832
7993992245
5957959665
6394862637
      `.trim(),
      totalFlashes: 0,
    });

    expect(simulate(exampleEnergyGrid2, 2)).toMatchObject({
      newRawGrid: `
8807476555
5089087054
8597889608
8485769600
8700908800
6600088989
6800005943
0000007456
9000000876
8700006848
      `.trim(),
      totalFlashes: 35,
    });

    expect(simulate(exampleEnergyGrid2, 10)).toMatchObject({
      newRawGrid: `
0481112976
0031112009
0041112504
0081111406
0099111306
0093511233
0442361130
5532252350
0532250600
0032240000
      `.trim(),
      totalFlashes: 204,
    });

    expect(simulate(exampleEnergyGrid2, 100)).toMatchObject({
      newRawGrid: `
0397666866
0749766918
0053976933
0004297822
0004229892
0053222877
0532222966
9322228966
7922286866
6789998766
      `.trim(),
      totalFlashes: 1656,
    });
  });

  it('answer', () => {
    expect(simulate(puzzleInput, 100).totalFlashes).toBe(1669);
  });
});

describe('part 2', () => {
  it('example 2 - simulate()', () => {
    expect(simulate(exampleEnergyGrid2, 195).newRawGrid).toBe(
      `
0000000000
0000000000
0000000000
0000000000
0000000000
0000000000
0000000000
0000000000
0000000000
0000000000`.trim(),
    );
  });

  it('example 2 - findFirstSimultaneousFlash()', () => {
    expect(findFirstSimultaneousFlash(exampleEnergyGrid2)).toBe(195);
  });

  it('answer', () => {
    expect(findFirstSimultaneousFlash(puzzleInput)).toBe(351);
  });
});
