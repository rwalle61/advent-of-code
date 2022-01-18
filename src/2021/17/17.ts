import { parseDecimalInt } from '../../utils';

const parseTargetArea = (
  rawTargetArea: string,
): { minX: number; maxX: number; minY: number; maxY: number } => {
  const [[minX, maxX], [minY, maxY]] = rawTargetArea
    .split('target area: ')[1]
    .split(', ')
    .map((dimensionString) => dimensionString.split('=')[1])
    .map((rangeString) => rangeString.split('..').map(parseDecimalInt));
  return { minX, maxX, minY, maxY };
};

const NUMBER_HIGHER_THAN_MAX_INITIAL_Y_VELOCITY = 1000;

// the highest initial Y velocity will have an initial X velocity that reaches 0
// (i.e. shoots up high, stops moving horizontally and comes straight down)
// So we don't need to find the initial X velocity.
// If we want to find the X velocity, it will be any triangle number between minX and maxX
// const toTriangleNumber = (n: number): number => (n * (n + 1)) / 2;
export const findMaxYPosition = (rawTargetArea: string): number => {
  const { minY, maxY } = parseTargetArea(rawTargetArea);

  let maxYPositionOfAllPossibileInitialYVelocities = 0;

  for (
    let initialYVelocity = 1;
    initialYVelocity < NUMBER_HIGHER_THAN_MAX_INITIAL_Y_VELOCITY;
    initialYVelocity += 1
  ) {
    let yPosition = 0;
    let yVelocity = initialYVelocity;
    let maxYPosition = yPosition;

    while (yPosition >= minY) {
      if (yPosition > maxYPosition) {
        maxYPosition = yPosition;
      }

      if (yPosition <= maxY) {
        if (maxYPosition > maxYPositionOfAllPossibileInitialYVelocities) {
          maxYPositionOfAllPossibileInitialYVelocities = maxYPosition;
        }
        break;
      }
      yPosition += yVelocity;

      yVelocity -= 1;
    }
  }

  return maxYPositionOfAllPossibileInitialYVelocities;
};

const findMaxInitialYVelocity = (minY: number, maxY: number): number => {
  let maxInitialYVelocity = 0;
  for (
    let initialYVelocity = 0;
    initialYVelocity < NUMBER_HIGHER_THAN_MAX_INITIAL_Y_VELOCITY;
    initialYVelocity += 1
  ) {
    let yPosition = 0;
    let yVelocity = initialYVelocity;

    while (yPosition >= minY) {
      if (yPosition <= maxY) {
        maxInitialYVelocity = initialYVelocity;
        break;
      }
      yPosition += yVelocity;

      yVelocity -= 1;
    }
  }
  return maxInitialYVelocity;
};

export const countInitialVelocitiesReachingTargetArea = (
  rawTargetArea: string,
): number => {
  const { minX, maxX, minY, maxY } = parseTargetArea(rawTargetArea);

  const maxInitialXVelocity = maxX;
  const maxInitialYVelocity = findMaxInitialYVelocity(minY, maxY);

  const possibleInitialVelocities: (readonly [number, number])[] = [];

  for (
    let initialXVelocity = 0;
    initialXVelocity <= maxInitialXVelocity;
    initialXVelocity += 1
  ) {
    for (
      let initialYVelocity = minY;
      initialYVelocity <= maxInitialYVelocity;
      initialYVelocity += 1
    ) {
      let xPosition = 0;
      let yPosition = 0;
      let xVelocity = initialXVelocity;
      let yVelocity = initialYVelocity;

      while (xPosition <= maxX && yPosition >= minY) {
        if (xPosition >= minX && yPosition <= maxY) {
          possibleInitialVelocities.push([initialXVelocity, initialYVelocity]);
          break;
        }
        xPosition += xVelocity;
        yPosition += yVelocity;

        if (xVelocity > 0) {
          xVelocity -= 1;
        } else if (xVelocity < 0) {
          xVelocity += 1;
        }

        yVelocity -= 1;
      }
    }
  }
  return possibleInitialVelocities.length;
};
