import { parseDecimalInt } from '../../utils';
import puzzleInput from './puzzleInput';

const exampleInput = `
30373
25512
65332
33549
35390
`;

type Forest = number[][];

const parseInput = (input: string): Forest =>
  input
    .trim()
    .split('\n')
    .map((row) => [...row].map(parseDecimalInt));

describe('part 1', () => {
  const isVisibleFromLeft = (forest: Forest, x: number, y: number): boolean => {
    const treeHeight = forest[y][x];
    for (let i = 0; i < x; i++) {
      const neighbouringTreeHeight = forest[y][i];
      if (neighbouringTreeHeight >= treeHeight) {
        return false;
      }
    }
    return true;
  };

  const isVisibleFromRight = (
    forest: Forest,
    x: number,
    y: number,
  ): boolean => {
    const treeHeight = forest[y][x];
    const forestWidth = forest[0].length;
    for (let i = x + 1; i < forestWidth; i++) {
      const neighbouringTreeHeight = forest[y][i];
      if (neighbouringTreeHeight >= treeHeight) {
        return false;
      }
    }
    return true;
  };

  const isVisibleFromTop = (forest: Forest, x: number, y: number): boolean => {
    const treeHeight = forest[y][x];
    for (let j = 0; j < y; j++) {
      const neighbouringTreeHeight = forest[j][x];
      if (neighbouringTreeHeight >= treeHeight) {
        return false;
      }
    }
    return true;
  };

  const isVisibleFromBottom = (
    forest: Forest,
    x: number,
    y: number,
  ): boolean => {
    const treeHeight = forest[y][x];
    const forestHeight = forest.length;
    for (let j = y + 1; j < forestHeight; j++) {
      const neighbouringTreeHeight = forest[j][x];
      if (neighbouringTreeHeight >= treeHeight) {
        return false;
      }
    }
    return true;
  };

  const countVisibleTrees = (input: string): number => {
    const forest = parseInput(input);

    let count = 0;

    forest.forEach((row, y) => {
      row.forEach((_, x) => {
        if (
          isVisibleFromLeft(forest, x, y) ||
          isVisibleFromRight(forest, x, y) ||
          isVisibleFromTop(forest, x, y) ||
          isVisibleFromBottom(forest, x, y)
        ) {
          count += 1;
        }
      });
    });

    return count;
  };

  it('example', () => {
    expect(countVisibleTrees(exampleInput)).toBe(21);
  });

  it('answer', () => {
    expect(countVisibleTrees(puzzleInput)).toBe(1851);
  });
});

describe('part 2', () => {
  const treesVisibleLeft = (forest: Forest, x: number, y: number): number => {
    let count = 0;
    const treeHeight = forest[y][x];
    for (let i = x - 1; i >= 0; i--) {
      count += 1;
      const neighbouringTreeHeight = forest[y][i];
      if (neighbouringTreeHeight >= treeHeight) {
        break;
      }
    }
    return count;
  };

  const treesVisibleRight = (forest: Forest, x: number, y: number): number => {
    let count = 0;
    const treeHeight = forest[y][x];
    const forestWidth = forest[0].length;
    for (let i = x + 1; i < forestWidth; i++) {
      count += 1;
      const neighbouringTreeHeight = forest[y][i];
      if (neighbouringTreeHeight >= treeHeight) {
        break;
      }
    }
    return count;
  };

  const treesVisibleUp = (forest: Forest, x: number, y: number): number => {
    let count = 0;
    const treeHeight = forest[y][x];
    for (let j = y - 1; j >= 0; j--) {
      count += 1;
      const neighbouringTreeHeight = forest[j][x];
      if (neighbouringTreeHeight >= treeHeight) {
        break;
      }
    }
    return count;
  };
  const treesVisibleDown = (forest: Forest, x: number, y: number): number => {
    let count = 0;
    const treeHeight = forest[y][x];
    const forestHeight = forest.length;
    for (let j = y + 1; j < forestHeight; j++) {
      count += 1;
      const neighbouringTreeHeight = forest[j][x];
      if (neighbouringTreeHeight >= treeHeight) {
        break;
      }
    }
    return count;
  };

  const maxScenicScore = (input: string): number => {
    const forest = parseInput(input);

    let currentMax = 0;

    forest.forEach((row, y) => {
      row.forEach((_, x) => {
        const scenicScore =
          treesVisibleLeft(forest, x, y) *
          treesVisibleRight(forest, x, y) *
          treesVisibleUp(forest, x, y) *
          treesVisibleDown(forest, x, y);

        currentMax = Math.max(currentMax, scenicScore);
      });
    });

    return currentMax;
  };

  it('example', () => {
    expect(maxScenicScore(exampleInput)).toBe(8);
  });

  it('answer', () => {
    expect(maxScenicScore(puzzleInput)).toBe(574080);
  });
});
