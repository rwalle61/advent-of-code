import { sum } from '../../utils';

export const OPEN_CHARACTER_TO_CLOSE_CHARACTER = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>',
} as const;

type OpenCharacter = keyof typeof OPEN_CHARACTER_TO_CLOSE_CHARACTER;

export const openCharacters = Object.keys(OPEN_CHARACTER_TO_CLOSE_CHARACTER);

const CLOSE_CHARACTER_TO_SCORE = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
};

type CloseCharacter = keyof typeof CLOSE_CHARACTER_TO_SCORE;

export const findCorruptCharacter = (line: string) => {
  const expectedCloseCharacters: CloseCharacter[] = [];

  for (let i = 0; i < line.length; i += 1) {
    const character = line.charAt(i);

    if (openCharacters.includes(character)) {
      const newExpectedCharacter =
        OPEN_CHARACTER_TO_CLOSE_CHARACTER[character as OpenCharacter];
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

  return lines.map(findCorruptCharacter).filter((line) => line) as string[];
};

export const calculateSyntaxErrorScore = (subsystem: string): number => {
  const corruptCharacters = findCorruptCharacters(subsystem);

  const scores = corruptCharacters.map(
    (character) => CLOSE_CHARACTER_TO_SCORE[character as CloseCharacter],
  );
  return sum(scores);
};
