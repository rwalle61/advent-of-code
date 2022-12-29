import { sum } from '../../utils';
import puzzleInput from './puzzleInput';

const exampleInput = `
1000
2000
3000

4000

5000
6000

7000
8000
9000

10000
`;

describe('part 1', () => {
  const maxCalories = (input: string): number => {
    const inventories = input.trim().split('\n\n');

    const caloriesPerElf = inventories.map((inventory: string) =>
      sum(
        inventory.split('\n').map((itemCalories) => parseInt(itemCalories, 10)),
      ),
    );

    return Math.max(...caloriesPerElf);
  };

  it('example', () => {
    expect(maxCalories(exampleInput)).toBe(24000);
  });

  it('answer', () => {
    expect(maxCalories(puzzleInput)).toBe(69501);
  });
});

describe('part 2', () => {
  const sumCaloriesOf3ElvesWithMostCalories = (input: string): number => {
    const inventories = input.trim().split('\n\n');

    const caloriesPerElf = inventories.map((inventory: string) =>
      sum(
        inventory.split('\n').map((itemCalories) => parseInt(itemCalories, 10)),
      ),
    );

    caloriesPerElf.sort(
      (itemACalories, itemBCalories) => itemBCalories - itemACalories,
    );

    const caloriesOfTop3Elves = caloriesPerElf.slice(0, 3);

    return sum(caloriesOfTop3Elves);
  };

  it('example', () => {
    expect(sumCaloriesOf3ElvesWithMostCalories(exampleInput)).toBe(45000);
  });

  it('answer', () => {
    expect(sumCaloriesOf3ElvesWithMostCalories(puzzleInput)).toBe(202346);
  });
});
