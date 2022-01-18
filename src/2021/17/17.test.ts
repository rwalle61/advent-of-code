import {
  findMaxYPosition,
  countInitialVelocitiesReachingTargetArea,
} from './17';

const example = 'target area: x=20..30, y=-10..-5';
const puzzleInput = 'target area: x=179..201, y=-109..-63';

describe('part 1', () => {
  it('example', () => {
    expect(findMaxYPosition(example)).toBe(45);
  });

  it('answer', () => {
    expect(findMaxYPosition(puzzleInput)).toBe(5886);
  });
});

describe('part 2', () => {
  it('example', () => {
    expect(countInitialVelocitiesReachingTargetArea(example)).toBe(112);
  });
  it('answer', () => {
    expect(countInitialVelocitiesReachingTargetArea(puzzleInput)).toBe(1806);
  });
});
