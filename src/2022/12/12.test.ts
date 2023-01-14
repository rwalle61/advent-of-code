import puzzleInput from './puzzleInput';

const exampleInput = `
Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi
`;

type Map = string[][];

type Position = { x: number; y: number };

const START = 'S';
const END = 'E';

const LOWEST_HEIGHT = 'a';
const HIGHEST_HEIGHT = 'z';

const parseInput = (
  input: string,
): {
  map: Map;
  end: Position;
} => {
  const end: Position = { x: 0, y: 0 };

  const map = input
    .trim()
    .split('\n')
    .map((line, j) =>
      line.split('').map((square, i) => {
        if (square === END) {
          end.x = i;
          end.y = j;
        }
        return square;
      }),
    );

  return { map, end };
};

const serialise = (position: Position) => `${position.x},${position.y}`;

const countFewestStepsToTargets = (
  targets: string[],
  searchStart: Position,
  map: Map,
): number => {
  const isInMap = ({ x, y }: Position): boolean => {
    const width = map[0].length;
    const { length } = map;
    return x >= 0 && x < width && y >= 0 && y < length;
  };

  const getHeight = (position: Position): string => {
    const square = map[position.y][position.x];
    if (square === START) {
      return LOWEST_HEIGHT;
    }
    if (square === END) {
      return HIGHEST_HEIGHT;
    }
    return square;
  };

  const numStepsUp = (a: Position, b: Position): number =>
    getHeight(b).charCodeAt(0) - getHeight(a).charCodeAt(0);

  const queue = [[searchStart]];
  const visited = new Set([serialise(searchStart)]);
  let steps = 0;

  while (queue.length) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const positionsSameStepsAwayFromEnd = queue.shift()!;

    const positionsOneMoreStepAwayFromEnd: Position[] = [];

    for (const position of positionsSameStepsAwayFromEnd) {
      if (targets.includes(map[position.y][position.x])) {
        return steps;
      }

      const up: Position = { x: position.x, y: position.y - 1 };
      const down: Position = { x: position.x, y: position.y + 1 };
      const left: Position = { x: position.x - 1, y: position.y };
      const right: Position = { x: position.x + 1, y: position.y };

      const options = [up, down, left, right].filter(
        (option) =>
          isInMap(option) &&
          numStepsUp(position, option) >= -1 &&
          !visited.has(serialise(option)),
      );

      options.forEach((option) => {
        visited.add(serialise(option));
        positionsOneMoreStepAwayFromEnd.push(option);
      });
    }
    queue.push(positionsOneMoreStepAwayFromEnd);

    steps += 1;
  }

  throw new Error('should have found target by now');
};

describe('part 1', () => {
  const countFewestStepsToBestSignal = (input: string): number => {
    const { map, end } = parseInput(input);

    return countFewestStepsToTargets([START], end, map);
  };

  it('example', () => {
    expect(countFewestStepsToBestSignal(exampleInput)).toBe(31);
  });

  it('answer', () => {
    expect(countFewestStepsToBestSignal(puzzleInput)).toBe(437);
  });
});

describe('part 2', () => {
  const countFewestStepsToBestSignal = (input: string): number => {
    const { map, end } = parseInput(input);

    return countFewestStepsToTargets([START, LOWEST_HEIGHT], end, map);
  };

  it('example', () => {
    expect(countFewestStepsToBestSignal(exampleInput)).toBe(29);
  });

  it('answer', () => {
    expect(countFewestStepsToBestSignal(puzzleInput)).toBe(430);
  });
});
