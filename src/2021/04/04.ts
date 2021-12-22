import { sum } from '../../utils';

export type Board = number[][];

export type BingoInstructions = { drawOrder: number[]; boards: Board[] };

const hasWon = (board: Board, drawnNumbers: number[]): boolean => {
  const isUnmarkedNumber = (number) => !drawnNumbers.includes(number);
  const hasWinningRow = board.some((row) => !row.some(isUnmarkedNumber));
  if (hasWinningRow) {
    return true;
  }
  const BOARD_WIDTH = 5;
  for (let i = 0; i < BOARD_WIDTH; i += 1) {
    const isWinningColumn = !board.some((row) => isUnmarkedNumber(row[i]));
    if (isWinningColumn) {
      return true;
    }
  }
  return false;
};

const calculateScore = (board: Board, drawnNumbers: number[]): number => {
  const isUnmarkedNumber = (number) => !drawnNumbers.includes(number);
  const unmarkedNumbers = board.flat().filter(isUnmarkedNumber);
  const winningNumber = drawnNumbers[drawnNumbers.length - 1];
  return sum(unmarkedNumbers) * winningNumber;
};

export const calculateFirstWinningScore = ({
  drawOrder,
  boards,
}: BingoInstructions): number => {
  const drawnNumbers = [];

  for (const number of drawOrder) {
    drawnNumbers.push(number);
    const winningBoard = boards.find((board) => hasWon(board, drawnNumbers));
    if (winningBoard) {
      const score = calculateScore(winningBoard, drawnNumbers);
      return score;
    }
  }

  throw new Error('A board should have won');
};

// Part 2

export const calculateLastWinningScore = ({
  drawOrder,
  boards,
}: BingoInstructions): number => {
  const drawnNumbers = [];
  let remainingBoards = [...boards];
  let lastWinningScore = -1;

  const isWinningBoard = (board: Board) => hasWon(board, drawnNumbers);

  for (const number of drawOrder) {
    drawnNumbers.push(number);

    let winningBoardIndex = remainingBoards.findIndex(isWinningBoard);

    while (winningBoardIndex !== -1) {
      const winningBoard = remainingBoards[winningBoardIndex];
      lastWinningScore = calculateScore(winningBoard, drawnNumbers);
      remainingBoards = remainingBoards.filter(
        // eslint-disable-next-line @typescript-eslint/no-loop-func
        (board, index) => index !== winningBoardIndex
      );
      winningBoardIndex = remainingBoards.findIndex(isWinningBoard);
    }
  }

  return lastWinningScore;
};
