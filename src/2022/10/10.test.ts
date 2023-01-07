import { chunkArray, parseDecimalInt } from '../../utils';
import exampleInput from './exampleInput';
import puzzleInput from './puzzleInput';

const parseInput = (input: string): string[] => input.trim().split('\n');

describe('part 1', () => {
  const INTERESTING_CYCLES = [20, 60, 100, 140, 180, 220];

  const sumSignalStrengths = (input: string): number => {
    const instructions = parseInput(input);

    let cycle = 0;
    let x = 1;
    let sumStrengths = 0;

    const addInterestingSignalStrength = () => {
      if (INTERESTING_CYCLES.includes(cycle)) {
        const signalStrength = cycle * x;
        sumStrengths += signalStrength;
      }
    };

    instructions.forEach((instruction) => {
      if (instruction === 'noop') {
        cycle += 1;
        addInterestingSignalStrength();
        return;
      }

      for (let i = 0; i < 2; i++) {
        cycle += 1;
        addInterestingSignalStrength();
      }
      const addX = parseDecimalInt(instruction.split(' ')[1]);
      x += addX;
    });

    return sumStrengths;
  };

  it('example', () => {
    expect(sumSignalStrengths(exampleInput)).toBe(13140);
  });

  it('answer', () => {
    expect(sumSignalStrengths(puzzleInput)).toBe(11720);
  });
});

describe('part 2', () => {
  const draw = (input: string): string => {
    const instructions = parseInput(input);

    let cycle = 0;
    let x = 1;
    let pixels = '';

    const getPixel = () => ([x - 1, x, x + 1].includes(cycle % 40) ? '#' : '.');

    instructions.forEach((instruction) => {
      if (instruction === 'noop') {
        pixels += getPixel();
        cycle += 1;
        return;
      }

      for (let i = 0; i < 2; i++) {
        pixels += getPixel();
        cycle += 1;
      }
      const addX = parseDecimalInt(instruction.split(' ')[1]);
      x += addX;
    });

    const output = chunkArray([...pixels], 40)
      .map((line) => line.join(''))
      .join('\n');

    return output;
  };

  it('example', () => {
    expect(draw(exampleInput)).toBe(
      `
##..##..##..##..##..##..##..##..##..##..
###...###...###...###...###...###...###.
####....####....####....####....####....
#####.....#####.....#####.....#####.....
######......######......######......####
#######.......#######.......#######.....
`.trim(),
    );
  });

  it('answer', () => {
    expect(draw(puzzleInput)).toBe(
      `
####.###...##..###..####.###...##....##.
#....#..#.#..#.#..#.#....#..#.#..#....#.
###..#..#.#....#..#.###..#..#.#.......#.
#....###..#....###..#....###..#.......#.
#....#.#..#..#.#.#..#....#....#..#.#..#.
####.#..#..##..#..#.####.#.....##...##..
`.trim(),
    );
  });
});
