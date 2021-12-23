import { resolve } from 'path';
import {
  numberOfDangerousPointsPart1,
  numberOfDangerousPointsPart2,
} from './05';
import { parseFile } from './parseFile';

const exampleLines = parseFile(resolve(__dirname, 'example.txt'));

const puzzleInput = parseFile(resolve(__dirname, 'puzzleInput.txt'));

describe('part 1', () => {
  it('example', () => {
    const dangerousPoints = numberOfDangerousPointsPart1(exampleLines);

    expect(dangerousPoints).toBe(5);
  });

  it('answer', () => {
    const dangerousPoints = numberOfDangerousPointsPart1(puzzleInput);

    expect(dangerousPoints).toBe(6005);
  });
});

describe('part 2', () => {
  it('example', () => {
    const dangerousPoints = numberOfDangerousPointsPart2(exampleLines);

    expect(dangerousPoints).toBe(12);
  });

  it('answer', () => {
    const dangerousPoints = numberOfDangerousPointsPart2(puzzleInput);

    expect(dangerousPoints).toBe(23864);
  });
});
