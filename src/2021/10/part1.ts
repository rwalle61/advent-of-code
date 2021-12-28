import { sum } from '../../utils';

export const OPEN_CHARACTER_TO_CLOSE_CHARACTER = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>',
};

export const openCharacters = Object.keys(OPEN_CHARACTER_TO_CLOSE_CHARACTER);

const CLOSE_CHARACTER_TO_SCORE = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
};

export const findCorruptCharacter = (line: string) => {
  const expectedCloseCharacters = [];

  for (let i = 0; i < line.length; i += 1) {
    const character = line.charAt(i);

    if (openCharacters.includes(character)) {
      const newExpectedCharacter = OPEN_CHARACTER_TO_CLOSE_CHARACTER[character];
      expectedCloseCharacters.push(newExpectedCharacter);
    } else {
      const expectedCharacter = expectedCloseCharacters.pop();

      if (expectedCharacter !== character) {
        return character;
      }
    }
  }

  return undefined;
};

export const findCorruptCharacters = (subsystem: string): string[] => {
  const lines = subsystem.trim().split('\n');

  return lines.map(findCorruptCharacter).filter((line) => line);
};

export const calculateSyntaxErrorScore = (subsystem: string): number => {
  const corruptCharacters = findCorruptCharacters(subsystem);

  const scores = corruptCharacters.map(
    (character) => CLOSE_CHARACTER_TO_SCORE[character]
  );
  return sum(scores);
};
