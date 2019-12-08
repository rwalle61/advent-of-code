import { readFileSync } from 'fs-extra';
import { resolve } from 'path';

import {
  runProgram,
  runProgramFromFile,
} from '.';

describe('day 2', () => {
  describe('part 1', () => {
    describe('runProgram(<initialState>)', () => {
      const tests = [
        {
          input: [1, 0, 0, 0, 99],
          expectedOutput: [2, 0, 0, 0, 99],
        },
        {
          input: [2, 3, 0, 3, 99],
          expectedOutput: [2, 3, 0, 6, 99],
        },
        {
          input: [2, 3, 0, 3, 99],
          expectedOutput: [2, 3, 0, 6, 99],
        },
        {
          input: [2, 4, 4, 5, 99, 0],
          expectedOutput: [2, 4, 4, 5, 99, 9801],
        },
        {
          input: [1, 1, 1, 4, 99, 5, 6, 0, 99],
          expectedOutput: [30, 1, 1, 4, 2, 5, 6, 0, 99],
        },
        {
          input: [1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50],
          expectedOutput: [3500, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50],
        },
        // my additions
        {
          input: [99, 1, 0, 0, 0],
          expectedOutput: [99, 1, 0, 0, 0],
        },
        {
          input: [1, 0, 0, 0],
          expectedOutput: [2, 0, 0, 0],
        },
        {
          input: [1, 0, 0, 0],
          expectedOutput: [2, 0, 0, 0],
        },
      ];
      for (const t of tests) { // eslint-disable-line no-restricted-syntax
        test(t.input.toString(), () => {
          expect(runProgram(t.input))
            .toStrictEqual(t.expectedOutput);
        });
      }
    });
    test('runProgramFromFile(<fileData>)', () => {
      const input = readFileSync(resolve(__dirname, 'part1TestInput.txt'), 'utf8');
      expect(runProgramFromFile(input))
        .toStrictEqual([3500, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50]);
    });
    test('answer', () => {
      const input = readFileSync(resolve(__dirname, 'realInput.txt'), 'utf8');
      expect(runProgramFromFile(input))
        .toStrictEqual([3166704, 12, 2, 2, 1, 1, 2, 3, 1, 3, 4, 3, 1, 5, 0, 3, 2, 1, 9, 36, 1, 19, 5, 37, 2, 6, 23, 74, 1, 6, 27, 76, 2, 31, 9, 228, 1, 35, 6, 230, 1, 10, 39, 234, 2, 9, 43, 702, 1, 5, 47, 703, 2, 51, 6, 1406, 1, 5, 55, 1407, 2, 13, 59, 7035, 1, 63, 5, 7036, 2, 67, 13, 35180, 1, 71, 9, 35183, 1, 75, 6, 35185, 2, 79, 6, 70370, 1, 83, 5, 70371, 2, 87, 9, 211113, 2, 9, 91, 633339, 1, 5, 95, 633340, 2, 99, 13, 3166700, 1, 103, 5, 3166701, 1, 2, 107, 3166703, 1, 111, 5, 0, 99, 2, 14, 0, 0]); // eslint-disable-line max-len
    });
  });
});
