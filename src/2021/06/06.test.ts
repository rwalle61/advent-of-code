import { countFishFast as countFish } from './countFishFast';
import puzzleInput from './puzzleInput';
import { simulate } from './simulate';

const exampleSchool = [3, 4, 3, 1, 2];

describe('part 1', () => {
  it('example', () => {
    expect(simulate(exampleSchool, 1)).toHaveLength(5);
    expect(simulate(exampleSchool, 2)).toHaveLength(6);
    expect(simulate(exampleSchool, 3)).toHaveLength(7);
    expect(simulate(exampleSchool, 18)).toHaveLength(26);
    expect(simulate(exampleSchool, 80)).toHaveLength(5934);
  });

  it('answer', () => {
    expect(simulate(puzzleInput, 80)).toHaveLength(386755);
  });
});

describe('part 2', () => {
  it('example', () => {
    expect(countFish(exampleSchool, 0)).toBe(5);
    expect(countFish(exampleSchool, 1)).toBe(5);
    expect(countFish(exampleSchool, 2)).toBe(6);
    expect(countFish(exampleSchool, 3)).toBe(7);
    expect(countFish(exampleSchool, 4)).toBe(9);
    expect(countFish(exampleSchool, 5)).toBe(10);
    expect(countFish(exampleSchool, 6)).toBe(10);
    expect(countFish(exampleSchool, 7)).toBe(10);
    expect(countFish(exampleSchool, 8)).toBe(10);
    expect(countFish(exampleSchool, 9)).toBe(11);
    expect(countFish(exampleSchool, 10)).toBe(12);
    expect(countFish(exampleSchool, 11)).toBe(15);
    expect(countFish(exampleSchool, 12)).toBe(17);
    expect(countFish(exampleSchool, 13)).toBe(19);
    expect(countFish(exampleSchool, 14)).toBe(20);
    expect(countFish(exampleSchool, 15)).toBe(20);
    expect(countFish(exampleSchool, 16)).toBe(21);
    expect(countFish(exampleSchool, 17)).toBe(22);
    expect(countFish(exampleSchool, 18)).toBe(26);

    expect(countFish(exampleSchool, 80)).toBe(5934);

    expect(countFish(exampleSchool, 256)).toBe(26984457539);
  });

  it('answer', () => {
    expect(countFish(puzzleInput, 256)).toBe(1732731810807);
  });
});
