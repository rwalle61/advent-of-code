import { readFileSync } from 'fs';
import { BingoInstructions, Board } from './04';

export const parseFile = (filepath: string): BingoInstructions => {
  const fileData = readFileSync(filepath, 'utf8').trim();
  const [drawOrderLine, ...boardsLineGroups] = fileData.split('\n\n');
  const drawOrder = drawOrderLine
    .split(',')
    .map((numberString) => parseInt(numberString, 10));
  const boards = boardsLineGroups.map((lineGroup) => {
    const boardLines: string[] = lineGroup.split('\n');
    const board: Board = boardLines.map((line) =>
      line
        .replace(/ {2}/g, ' ')
        .split(' ')
        .filter((element) => element !== '')
        .map((numberString) => parseInt(numberString, 10)),
    );
    return board;
  });
  return { drawOrder, boards };
};
