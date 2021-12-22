import puzzleInput from './puzzleInput';

const exampleInstructions = [
  'forward 5',
  'down 5',
  'forward 8',
  'up 3',
  'down 8',
  'forward 2',
];

type Position = { horizontalPosition: number; depth: number };

describe('part 1', () => {
  const move = (instructions: string[]): Position => {
    let horizontalPosition = 0;
    let depth = 0;

    instructions.forEach((instruction) => {
      const [direction, unitsString] = instruction.split(' ');
      const units = parseInt(unitsString, 10);
      if (direction === 'forward') {
        horizontalPosition += units;
      } else if (direction === 'down') {
        depth += units;
      } else if (direction === 'up') {
        depth -= units;
      }
    });

    return {
      horizontalPosition,
      depth,
    };
  };

  it('example', () => {
    const position = move(exampleInstructions);

    expect(position).toMatchObject<Position>({
      horizontalPosition: 15,
      depth: 10,
    });
    expect(position.horizontalPosition * position.depth).toBe(150);
  });

  it('answer', () => {
    const position = move(puzzleInput);

    expect(position).toMatchObject<Position>({
      horizontalPosition: 1832,
      depth: 1172,
    });
    expect(position.horizontalPosition * position.depth).toBe(2147104);
  });
});

describe('part 2', () => {
  const move = (instructions: string[]): Position => {
    let horizontalPosition = 0;
    let depth = 0;
    let aim = 0;

    instructions.forEach((instruction) => {
      const [direction, unitsString] = instruction.split(' ');
      const units = parseInt(unitsString, 10);
      if (direction === 'forward') {
        horizontalPosition += units;
        depth += aim * units;
      } else if (direction === 'down') {
        aim += units;
      } else if (direction === 'up') {
        aim -= units;
      }
    });

    return {
      horizontalPosition,
      depth,
    };
  };

  it('example', () => {
    const position = move(exampleInstructions);

    expect(position).toMatchObject<Position>({
      horizontalPosition: 15,
      depth: 60,
    });
    expect(position.horizontalPosition * position.depth).toBe(900);
  });

  it('answer', () => {
    const position = move(puzzleInput);

    expect(position).toMatchObject<Position>({
      horizontalPosition: 1832,
      depth: 1116059,
    });
    expect(position.horizontalPosition * position.depth).toBe(2044620088);
  });
});
