import { arrayOf, parseDecimalInt } from '../../utils';
import puzzleInput from './puzzleInput';

const exampleInput = `
R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2
`;

enum Direction {
  Left = 'L',
  Right = 'R',
  Up = 'U',
  Down = 'D',
}

type Motion = { direction: Direction; distance: number };

const parseInput = (input: string): Motion[] =>
  input
    .trim()
    .split('\n')
    .map((row) => {
      const [direction, distance] = row.split(' ');
      return {
        direction: direction as Direction,
        distance: parseDecimalInt(distance),
      };
    });

type Position = { x: number; y: number };

const serialisePosition = ({ x, y }: Position) => `${x},${y}`;

const moveKnot = ({ x, y }: Position, direction: Direction) => {
  const newPosition: Position = { x, y };

  if (direction === Direction.Left) {
    newPosition.x -= 1;
  } else if (direction === Direction.Right) {
    newPosition.x += 1;
  } else if (direction === Direction.Up) {
    newPosition.y += 1;
  } else if (direction === Direction.Down) {
    newPosition.y -= 1;
  }
  return newPosition;
};

const followKnot = (tail: Position, head: Position): Position => {
  const xDistance = head.x - tail.x;
  const yDistance = head.y - tail.y;

  const newTail: Position = { x: tail.x, y: tail.y };

  if (
    (Math.abs(xDistance) === 2 && Math.abs(yDistance) === 2) ||
    Math.abs(xDistance) === 2 ||
    Math.abs(yDistance) === 2
  ) {
    newTail.x += Math.sign(xDistance);
    newTail.y += Math.sign(yDistance);
  }
  return newTail;
};

describe('part 1', () => {
  const countTailPositions = (input: string): number => {
    const motions = parseInput(input);

    let head: Position = { x: 0, y: 0 };
    let tail: Position = { x: 0, y: 0 };

    const tailPositions = new Set([serialisePosition(tail)]);

    motions.forEach(({ direction, distance }) => {
      for (let step = 0; step < distance; step++) {
        head = moveKnot(head, direction);
        tail = followKnot(tail, head);

        tailPositions.add(serialisePosition(tail));
      }
    });

    return tailPositions.size;
  };

  it('example', () => {
    expect(countTailPositions(exampleInput)).toBe(13);
  });

  it('answer', () => {
    expect(countTailPositions(puzzleInput)).toBe(6212);
  });
});

describe('part 2', () => {
  const NUMBER_OF_KNOTS = 10;

  const getTail = (knots: Position[]) => knots[knots.length - 1];

  const countTailPositions = (input: string): number => {
    const motions = parseInput(input);

    const knots = arrayOf({ x: 0, y: 0 } as Position, NUMBER_OF_KNOTS);

    const tailPositions = new Set([serialisePosition(getTail(knots))]);

    motions.forEach(({ direction, distance }) => {
      for (let step = 0; step < distance; step++) {
        knots[0] = moveKnot(knots[0], direction);
        for (let i = 1; i < knots.length; i++) {
          knots[i] = followKnot(knots[i], knots[i - 1]);
        }

        tailPositions.add(serialisePosition(getTail(knots)));
      }
    });

    return tailPositions.size;
  };

  it('example', () => {
    expect(countTailPositions(exampleInput)).toBe(1);
  });

  it('larger example', () => {
    const largerExampleInput = `
R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20
    `;
    expect(countTailPositions(largerExampleInput)).toBe(36);
  });

  it('answer', () => {
    expect(countTailPositions(puzzleInput)).toBe(2522);
  });
});
