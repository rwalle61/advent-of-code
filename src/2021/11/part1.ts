/* eslint-disable no-param-reassign */
import { parseDecimalInt } from '../../utils';

type Grid = number[][];

const stringifyGrid = (grid: Grid) =>
  grid.map((line) => line.join('')).join('\n');

export const parseGrid = (rawGrid: string): Grid =>
  rawGrid
    .trim()
    .split('\n')
    .map((line) => line.split('').map(parseDecimalInt));

const incrementOctopus = (x: number, y: number, grid: Grid) => {
  grid[y][x] += 1;
};

const incrementIfInGrid = (x: number, y: number, grid: Grid) => {
  const gridWidth = grid[0].length;
  const gridHeight = grid.length;

  if (x >= 0 && x < gridWidth && y >= 0 && y < gridHeight) {
    incrementOctopus(x, y, grid);
  }
};

export const incrementAllOctopuses = (
  gridHeight: number,
  gridWidth: number,
  grid: Grid
) => {
  for (let j = 0; j < gridHeight; j += 1) {
    for (let i = 0; i < gridWidth; i += 1) {
      incrementOctopus(i, j, grid);
    }
  }
};

export const incrementNeighbours = (x: number, y: number, grid: Grid) => {
  // above
  incrementIfInGrid(x - 1, y - 1, grid);
  incrementIfInGrid(x, y - 1, grid);
  incrementIfInGrid(x + 1, y - 1, grid);

  // same row
  incrementIfInGrid(x - 1, y, grid);
  incrementIfInGrid(x + 1, y, grid);

  // below
  incrementIfInGrid(x - 1, y + 1, grid);
  incrementIfInGrid(x, y + 1, grid);
  incrementIfInGrid(x + 1, y + 1, grid);
};

const FLASHED_OCTOPUS = -Infinity;

export const labelOctopusAsFlashed = (i: number, j: number, grid: Grid) => {
  grid[j][i] = FLASHED_OCTOPUS;
};

const isFlashedOctopus = (i: number, j: number, grid: Grid) =>
  grid[j][i] === FLASHED_OCTOPUS;

export const resetFlashedOctopuses = (
  gridHeight: number,
  gridWidth: number,
  grid: Grid
) => {
  for (let j = 0; j < gridHeight; j += 1) {
    for (let i = 0; i < gridWidth; i += 1) {
      if (isFlashedOctopus(i, j, grid)) {
        grid[j][i] = 0;
      }
    }
  }
};

export const simulate = (
  rawGrid: string,
  steps: number
): { newRawGrid: string; totalFlashes: number } => {
  const grid = parseGrid(rawGrid);

  const gridWidth = grid[0].length;
  const gridHeight = grid.length;

  let totalFlashes = 0;

  for (let stepNumber = 0; stepNumber < steps; stepNumber += 1) {
    incrementAllOctopuses(gridHeight, gridWidth, grid);

    // flash until no octopus flash
    let didAnOctopusFlashThisStep: boolean;

    do {
      didAnOctopusFlashThisStep = false;

      for (let j = 0; j < gridHeight; j += 1) {
        for (let i = 0; i < gridWidth; i += 1) {
          const shouldOctopusFlash = grid[j][i] > 9;
          if (shouldOctopusFlash) {
            totalFlashes += 1;
            didAnOctopusFlashThisStep = true;

            labelOctopusAsFlashed(i, j, grid);

            incrementNeighbours(i, j, grid);
          }
        }
      }
    } while (didAnOctopusFlashThisStep === true);

    resetFlashedOctopuses(gridHeight, gridWidth, grid);
  }

  const newRawGrid = stringifyGrid(grid);

  return { newRawGrid, totalFlashes };
};
