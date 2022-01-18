import {
  add,
  addAndReduce,
  calculateMagnitude,
  calculateMagnitudeOfFinalSum,
  reduce,
  reduceOnce,
  sumSnailfishNumbers,
} from './part1';
import { maxMagnitudeOfSumOf2Numbers } from './part2';
import puzzleInput from './puzzleInput';

const example = `
[[[0,[5,8]],[[1,7],[9,6]]],[[4,[1,2]],[[1,4],2]]]
[[[5,[2,8]],4],[5,[[9,9],0]]]
[6,[[[6,2],[5,6]],[[7,6],[4,7]]]]
[[[6,[0,7]],[0,9]],[4,[9,[9,0]]]]
[[[7,[6,4]],[3,[1,3]]],[[[5,5],1],9]]
[[6,[[7,3],[3,2]]],[[[3,8],[5,7]],4]]
[[[[5,4],[7,7]],8],[[8,3],8]]
[[9,3],[[9,9],[6,[4,9]]]]
[[2,[[7,7],7]],[[5,8],[[9,3],[0,2]]]]
[[[[5,2],5],[8,[3,7]]],[[5,[7,5]],[4,4]]]
`;

describe('part 1', () => {
  it('examples - add()', () => {
    expect(add('[1,2]', '[[3,4],5]')).toBe('[[1,2],[[3,4],5]]');
    expect(add('[[[[4,3],4],4],[7,[[8,4],9]]]', '[1,1]')).toBe(
      '[[[[[4,3],4],4],[7,[[8,4],9]]],[1,1]]',
    );
  });

  it('explode examples - reduceOnce()', () => {
    // 5 examples of "a single explode action"
    expect(reduceOnce('[[[[[9,8],1],2],3],4]')).toBe('[[[[0,9],2],3],4]');
    expect(reduceOnce('[7,[6,[5,[4,[3,2]]]]]')).toBe('[7,[6,[5,[7,0]]]]');
    expect(reduceOnce('[[6,[5,[4,[3,2]]]],1]')).toBe('[[6,[5,[7,0]]],3]');

    expect(reduceOnce('[[3,[2,[1,[7,3]]]],[6,[5,[4,[3,2]]]]]')).toBe(
      '[[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]]',
    );
    expect(reduceOnce('[[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]]')).toBe(
      '[[3,[2,[8,0]]],[9,[5,[7,0]]]]',
    );

    // from repeated example
    expect(reduceOnce('[[[[[4,3],4],4],[7,[[8,4],9]]],[1,1]]')).toBe(
      '[[[[0,7],4],[7,[[8,4],9]]],[1,1]]',
    );

    expect(reduceOnce('[[[[0,7],4],[7,[[8,4],9]]],[1,1]]')).toBe(
      '[[[[0,7],4],[15,[0,13]]],[1,1]]',
    );

    expect(reduceOnce('[[[[0,7],4],[[7,8],[0,[6,7]]]],[1,1]]')).toBe(
      '[[[[0,7],4],[[7,8],[6,0]]],[8,1]]',
    );
  });

  it('split example - reduceOnce()', () => {
    expect(reduceOnce('[[[[0,7],4],[15,[0,13]]],[1,1]]')).toBe(
      '[[[[0,7],4],[[7,8],[0,13]]],[1,1]]',
    );
    expect(reduceOnce('[[[[0,7],4],[[7,8],[0,13]]],[1,1]]')).toBe(
      '[[[[0,7],4],[[7,8],[0,[6,7]]]],[1,1]]',
    );
  });

  it('example - reduce()', () => {
    // Here is the process of finding the reduced result of [[[[4,3],4],4],[7,[[8,4],9]]] + [1,1]:
    // after addition: [[[[[4,3],4],4],[7,[[8,4],9]]],[1,1]]
    // after explode:  [[[[0,7],4],[7,[[8,4],9]]],[1,1]]
    // after explode:  [[[[0,7],4],[15,[0,13]]],[1,1]]
    // after split:    [[[[0,7],4],[[7,8],[0,13]]],[1,1]]
    // after split:    [[[[0,7],4],[[7,8],[0,[6,7]]]],[1,1]]
    // after explode:  [[[[0,7],4],[[7,8],[6,0]]],[8,1]]
    expect(reduce('[[[[[4,3],4],4],[7,[[8,4],9]]],[1,1]]')).toBe(
      '[[[[0,7],4],[[7,8],[6,0]]],[8,1]]',
    );
  });

  it('example - addAndReduce()', () => {
    expect(
      addAndReduce(
        '[[[[6,6],[6,6]],[[6,0],[6,7]]],[[[7,7],[8,9]],[8,[8,1]]]]',
        '[2,9]',
      ),
    ).toBe('[[[[6,6],[7,7]],[[0,7],[7,7]]],[[[5,5],[5,6]],9]]');
  });

  it('examples - sumSnailfishNumbers()', () => {
    expect(sumSnailfishNumbers(['[1,1]', '[2,2]', '[3,3]', '[4,4]'])).toBe(
      '[[[[1,1],[2,2]],[3,3]],[4,4]]',
    );

    expect(
      sumSnailfishNumbers(['[1,1]', '[2,2]', '[3,3]', '[4,4]', '[5,5]']),
    ).toBe('[[[[3,0],[5,3]],[4,4]],[5,5]]');

    expect(
      sumSnailfishNumbers([
        '[1,1]',
        '[2,2]',
        '[3,3]',
        '[4,4]',
        '[5,5]',
        '[6,6]',
      ]),
    ).toBe('[[[[5,0],[7,4]],[5,5]],[6,6]]');

    expect(
      sumSnailfishNumbers([
        '[[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]]',
        '[7,[[[3,7],[4,3]],[[6,3],[8,8]]]]',
        '[[2,[[0,8],[3,4]]],[[[6,7],1],[7,[1,6]]]]',
        '[[[[2,4],7],[6,[0,5]]],[[[6,8],[2,8]],[[2,1],[4,5]]]]',
        '[7,[5,[[3,8],[1,4]]]]',
        '[[2,[2,2]],[8,[8,1]]]',
        '[2,9]',
        '[1,[[[9,3],9],[[9,0],[0,7]]]]',
        '[[[5,[7,4]],7],1]',
        '[[[[4,2],2],6],[8,7]]',
      ]),
    ).toBe('[[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]]');
  });

  it('examples - calculateMagnitude()', () => {
    expect(calculateMagnitude('[9,1]')).toBe(29);
    expect(calculateMagnitude('[1,9]')).toBe(21);
    expect(calculateMagnitude('[[9,1],[1,9]]')).toBe(129);
    expect(calculateMagnitude('[[1,2],[[3,4],5]]')).toBe(143);
    expect(calculateMagnitude('[[[[0,7],4],[[7,8],[6,0]]],[8,1]]')).toBe(1384);
    expect(calculateMagnitude('[[[[1,1],[2,2]],[3,3]],[4,4]]')).toBe(445);
    expect(calculateMagnitude('[[[[3,0],[5,3]],[4,4]],[5,5]]')).toBe(791);
    expect(calculateMagnitude('[[[[5,0],[7,4]],[5,5]],[6,6]]')).toBe(1137);
    expect(
      calculateMagnitude(
        '[[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]]',
      ),
    ).toBe(3488);
  });

  it('example - calculateMagnitudeOfFinalSum()', () => {
    expect(calculateMagnitudeOfFinalSum(example)).toBe(4140);
  });

  it('answer', () => {
    expect(calculateMagnitudeOfFinalSum(puzzleInput)).toBe(3935);
  });
});

describe('part 2', () => {
  it('example', () => {
    expect(maxMagnitudeOfSumOf2Numbers(example)).toBe(3993);
  });

  it.skip('answer', () => {
    expect(maxMagnitudeOfSumOf2Numbers(puzzleInput)).toBe(4669);
  });
});
