import { parseDecimalInt, range } from '../../utils';
import puzzleInput from './puzzleInput';

const exampleInput = `
Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0

Monkey 2:
  Starting items: 79, 60, 97
  Operation: new = old * old
  Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 3

Monkey 3:
  Starting items: 74
  Operation: new = old + 3
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 1
`;

type Monkey = {
  items: number[];
  inspect: (item: number) => number;
  inspectionDivisor: number;
  chooseNextMonkey: (item: number) => number;
  numItemsInspected: number;
};

const parseInput = (input: string): Monkey[] =>
  input
    .trim()
    .split('\n\n')
    .map((monkeyBlock) => {
      const [, startingItems, operation, test, ifTrue, ifFalse] = monkeyBlock
        .split('\n')
        .map((line) => line.trim());

      const items = startingItems
        .split('Starting items: ')[1]
        .replace(',', '')
        .split(' ')
        .map(parseDecimalInt);

      const inspect = (item: number) => {
        const [operator, operand] = operation
          .split('Operation: new = old ')[1]
          .split(' ');
        enum Operator {
          '*' = '*',
          '+' = '+',
        }
        const operatorToFunction = {
          [Operator['*']]: (a: number, b: number) => a * b,
          [Operator['+']]: (a: number, b: number) => a + b,
        } as const;

        return operatorToFunction[operator as Operator](
          item,
          operand === 'old' ? item : parseDecimalInt(operand),
        );
      };

      const inspectionDivisor = parseDecimalInt(
        test.split('Test: divisible by ')[1],
      );

      const chooseNextMonkey = (item: number) =>
        item % inspectionDivisor === 0
          ? parseDecimalInt(ifTrue.split('If true: throw to monkey ')[1])
          : parseDecimalInt(ifFalse.split('If false: throw to monkey ')[1]);

      return {
        items,
        inspect,
        inspectionDivisor,
        chooseNextMonkey,
        numItemsInspected: 0,
      };
    });

describe('part 1', () => {
  const NUM_ROUNDS = 20;

  const getMonkeyBusinessLevel = (input: string): number => {
    const monkeys = parseInput(input);

    range(NUM_ROUNDS).forEach(() => {
      monkeys.forEach((monkey) => {
        monkey.items.forEach((item) => {
          const newWorryLevel = Math.floor(monkey.inspect(item) / 3);
          // eslint-disable-next-line no-param-reassign
          monkey.numItemsInspected += 1;

          const nextMonkey = monkey.chooseNextMonkey(newWorryLevel);
          monkeys[nextMonkey].items.push(newWorryLevel);
        });
        // eslint-disable-next-line no-param-reassign
        monkey.items = [];
      });
    });

    monkeys.sort((a, b) => b.numItemsInspected - a.numItemsInspected);

    return monkeys[0].numItemsInspected * monkeys[1].numItemsInspected;
  };

  it('example', () => {
    expect(getMonkeyBusinessLevel(exampleInput)).toBe(10605);
  });

  it('answer', () => {
    expect(getMonkeyBusinessLevel(puzzleInput)).toBe(110264);
  });
});

describe('part 2', () => {
  const product = (numbers: number[]): number =>
    numbers.reduce((currentProduct, number) => currentProduct * number, 1);

  const NUM_ROUNDS = 10000;

  const getMonkeyBusinessLevel = (input: string): number => {
    const monkeys = parseInput(input);

    const worryLevelDivisor = product(
      monkeys.map((monkey) => monkey.inspectionDivisor),
    );

    range(NUM_ROUNDS).forEach(() => {
      monkeys.forEach((monkey) => {
        monkey.items.forEach((item) => {
          const newWorryLevel = monkey.inspect(item) % worryLevelDivisor;
          // eslint-disable-next-line no-param-reassign
          monkey.numItemsInspected += 1;

          const nextMonkey = monkey.chooseNextMonkey(newWorryLevel);
          monkeys[nextMonkey].items.push(newWorryLevel);
        });
        // eslint-disable-next-line no-param-reassign
        monkey.items = [];
      });
    });

    monkeys.sort((a, b) => b.numItemsInspected - a.numItemsInspected);

    return monkeys[0].numItemsInspected * monkeys[1].numItemsInspected;
  };

  it('example', () => {
    expect(getMonkeyBusinessLevel(exampleInput)).toBe(2713310158);
  });

  it('answer', () => {
    expect(getMonkeyBusinessLevel(puzzleInput)).toBe(23612457316);
  });
});
