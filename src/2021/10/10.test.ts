import {
  calculateSyntaxErrorScore,
  findCorruptCharacter,
  findCorruptCharacters,
} from './part1';
import {
  getAutocompleteScore,
  getCloseSequence,
  getCloseSequenceScore,
} from './part2';
import puzzleInput from './puzzleInput';

const exampleSubsystem = `
[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]
`;

describe('part 1', () => {
  it('small examples - findCorruptCharacter()', () => {
    expect(findCorruptCharacter('()')).toBeUndefined();
    expect(findCorruptCharacter('[]')).toBeUndefined();
    expect(findCorruptCharacter('{()()()}')).toBeUndefined();
    expect(findCorruptCharacter('<([{}])>')).toBeUndefined();
    expect(findCorruptCharacter('[<>({}){}[([])<>]]')).toBeUndefined();
    expect(findCorruptCharacter('(((((((((())))))))))')).toBeUndefined();

    expect(findCorruptCharacter('(]')).toBe(']');
    expect(findCorruptCharacter('{()()()>')).toBe('>');
    expect(findCorruptCharacter('(((()))}')).toBe('}');
    expect(findCorruptCharacter('<([]){()}[{}])')).toBe(')');
  });

  it('main example - findCorruptCharacters()', () => {
    const corruptCharacters = findCorruptCharacters(exampleSubsystem);

    expect(corruptCharacters).toStrictEqual(['}', ')', ']', ')', '>']);
  });

  it('main example - calculateSyntaxErrorScore()', () => {
    const score = calculateSyntaxErrorScore(exampleSubsystem);

    expect(score).toBe(26397);
  });

  it('answer', () => {
    const score = calculateSyntaxErrorScore(puzzleInput);

    expect(score).toBe(464991);
  });
});

describe('part 2', () => {
  it('main examples - getCloseSequence()', () => {
    expect(getCloseSequence('[({(<(())[]>[[{[]{<()<>>')).toBe('}}]])})]');
    expect(getCloseSequence('[(()[<>])]({[<{<<[]>>(')).toBe(')}>]})');
    expect(getCloseSequence('(((({<>}<{<{<>}{[]{[]{}')).toBe('}}>}>))))');
    expect(getCloseSequence('{<[[]]>}<{[{[{[]{()[[[]')).toBe(']]}}]}]}>');
    expect(getCloseSequence('<{([{{}}[<[[[<>{}]]]>[]]')).toBe('])}>');
  });

  it('main examples - getCloseSequenceScore()', () => {
    expect(getCloseSequenceScore('}}]])})]')).toBe(288957);
    expect(getCloseSequenceScore(')}>]})')).toBe(5566);
    expect(getCloseSequenceScore('}}>}>))))')).toBe(1480781);
    expect(getCloseSequenceScore(']]}}]}]}>')).toBe(995444);
    expect(getCloseSequenceScore('])}>')).toBe(294);
  });

  it('main example - getAutocompleteScore()', () => {
    const score = getAutocompleteScore(exampleSubsystem);

    expect(score).toBe(288957);
  });

  it('answer', () => {
    const score = getAutocompleteScore(puzzleInput);

    expect(score).toBe(3662008566);
  });
});
