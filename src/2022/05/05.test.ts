import { parseDecimalInt } from '../../utils';
import puzzleInput from './puzzleInput';

const exampleInput = `
    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2
`;

const parseInput = (
  input: string,
): {
  stacks: string[][];
  procedures: {
    numMoves: number;
    fromStack: number;
    toStack: number;
  }[];
} => {
  const [stacksInput, proceduresInput] = input
    .substring(1)
    .trimEnd()
    .split('\n\n')
    .map((inputSection) => inputSection.split('\n'));

  const lastLine = stacksInput[stacksInput.length - 1];
  const numberOfColumns = Math.ceil(lastLine.length / 4);
  const FIRST_STACK_NUMBER = 1;

  const stacks = Array.from(
    Array(numberOfColumns + FIRST_STACK_NUMBER),
    () => [] as string[],
  );

  for (let i = stacksInput.length - 2; i >= 0; i -= 1) {
    let j = 0;
    let stackNumber = FIRST_STACK_NUMBER;

    const row = stacksInput[i];

    while (row[j]) {
      const crate = row[j + 1];
      if (crate !== ' ') {
        stacks[stackNumber].push(crate);
      }
      j += 4;
      stackNumber += 1;
    }
  }

  const procedures = proceduresInput.map((procedure) => {
    const [, numMoves, , fromStack, , toStack] = procedure
      .split(' ')
      .map(parseDecimalInt);
    return {
      numMoves,
      fromStack,
      toStack,
    };
  });

  return { stacks, procedures };
};

const getTopsOfStacks = (stacks: string[][]) => {
  const topsOfStacks = stacks.map((stack) => stack[stack.length - 1]);

  return topsOfStacks.join('');
};

describe('part 1', () => {
  const getCratesAtTopsOfStacks = (input: string): string => {
    const { stacks, procedures } = parseInput(input);

    procedures.forEach((procedure) => {
      const { numMoves, fromStack, toStack } = procedure;

      for (let i = 0; i < numMoves; i += 1) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const crate = stacks[fromStack].pop()!;
        stacks[toStack].push(crate);
      }
    });

    stacks.shift();

    return getTopsOfStacks(stacks);
  };

  it('example', () => {
    expect(getCratesAtTopsOfStacks(exampleInput)).toBe('CMZ');
  });

  it('answer', () => {
    expect(getCratesAtTopsOfStacks(puzzleInput)).toBe('FWSHSPJWM');
  });
});

describe('part 2', () => {
  const getCratesAtTopsOfStacks = (input: string): string => {
    const { stacks, procedures } = parseInput(input);

    procedures.forEach((procedure) => {
      const { numMoves, fromStack, toStack } = procedure;

      const crates = stacks[fromStack].splice(
        stacks[fromStack].length - numMoves,
        numMoves,
      );
      stacks[toStack] = stacks[toStack].concat(crates);
    });

    stacks.shift();

    return getTopsOfStacks(stacks);
  };

  it('example', () => {
    expect(getCratesAtTopsOfStacks(exampleInput)).toBe('MCD');
  });

  it('answer', () => {
    expect(getCratesAtTopsOfStacks(puzzleInput)).toBe('PWPWHGFZS');
  });
});
