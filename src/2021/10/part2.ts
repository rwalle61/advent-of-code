import {
  findCorruptCharacter,
  openCharacters,
  OPEN_CHARACTER_TO_CLOSE_CHARACTER,
} from './part1';

export const getCloseSequence = (line: string): string => {
  const expectedCloseCharacters = [];

  for (let i = 0; i < line.length; i += 1) {
    const character = line.charAt(i);
    if (openCharacters.includes(character)) {
      const newExpectedCharacter = OPEN_CHARACTER_TO_CLOSE_CHARACTER[character];
      expectedCloseCharacters.push(newExpectedCharacter);
    } else {
      expectedCloseCharacters.pop();
    }
  }

  return [...expectedCloseCharacters].reverse().join('');
};

const CLOSE_CHARACTER_TO_SCORE = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4,
};

export const getCloseSequenceScore = (closeSequence: string): number =>
  closeSequence
    .split('')
    .reduce(
      (currentScore, character) =>
        currentScore * 5 + CLOSE_CHARACTER_TO_SCORE[character],
      0
    );

export const getAutocompleteScore = (subsystem: string): number => {
  const lines = subsystem.trim().split('\n');

  const incompleteLines = lines.filter((line) => !findCorruptCharacter(line));

  const closeSequences = incompleteLines.map(getCloseSequence);

  const closeSequenceScores = closeSequences.map(getCloseSequenceScore);

  const sortedScores = [...closeSequenceScores].sort(
    (scoreA, scoreB) => scoreA - scoreB
  );

  const middleScore = sortedScores[(sortedScores.length - 1) / 2];
  return middleScore;
};
