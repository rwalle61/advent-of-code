import {
  parseGrid,
  incrementAllOctopuses,
  labelOctopusAsFlashed,
  incrementNeighbours,
  resetFlashedOctopuses,
} from './part1';

export const findFirstSimultaneousFlash = (rawGrid: string): number => {
  const grid = parseGrid(rawGrid);

  const gridWidth = grid[0].length;
  const gridHeight = grid.length;

  let step = 0;
  let flashesThisStep = 0;

  const haveAllOctopusesFlashed = () =>
    flashesThisStep === gridWidth * gridHeight;

  while (!haveAllOctopusesFlashed()) {
    step += 1;
    flashesThisStep = 0;

    incrementAllOctopuses(gridHeight, gridWidth, grid);

    // flash until no octopus flash
    let didAnOctopusFlashThisStep: boolean;

    do {
      didAnOctopusFlashThisStep = false;

      for (let j = 0; j < gridHeight; j += 1) {
        for (let i = 0; i < gridWidth; i += 1) {
          const shouldOctopusFlash = grid[j][i] > 9;
          if (shouldOctopusFlash) {
            flashesThisStep += 1;
            didAnOctopusFlashThisStep = true;

            labelOctopusAsFlashed(i, j, grid);

            incrementNeighbours(i, j, grid);
          }
        }
      }
    } while (didAnOctopusFlashThisStep === true);

    resetFlashedOctopuses(gridHeight, gridWidth, grid);
  }

  return step;
};
