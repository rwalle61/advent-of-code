import puzzleInput from './puzzleInput';

const exampleInput = `

`;

const parseInput = (input: string): string[] => input.trim().split('\n');

describe('part 1', () => {
  const foo = (input: string): number => {
    const bar = parseInput(input);

    return bar && 0;
  };

  it('example', () => {
    expect(foo(exampleInput)).toBe(0);
  });

  it('answer', () => {
    expect(foo(puzzleInput)).toBe(0);
  });
});

describe('part 2', () => {});
