import { resolve } from 'path';
import { calculateFirstWinningScore, calculateLastWinningScore } from './04';
import { parseFile } from './parseFile';

const exampleBingoInstructions = parseFile(resolve(__dirname, 'example.txt'));

const puzzleInput = parseFile(resolve(__dirname, 'puzzleInput.txt'));

describe('part 1', () => {
  it('example', () => {
    const winningScore = calculateFirstWinningScore(exampleBingoInstructions);

    expect(winningScore).toBe(4512);
  });

  it('answer', () => {
    const winningScore = calculateFirstWinningScore(puzzleInput);

    expect(winningScore).toBe(2745);
  });
});

describe('part 2', () => {
  it('example', () => {
    const winningScore = calculateLastWinningScore(exampleBingoInstructions);

    expect(winningScore).toBe(1924);
  });

  it('answer', () => {
    const winningScore = calculateLastWinningScore(puzzleInput);

    expect(winningScore).toBe(6594);
  });
});
