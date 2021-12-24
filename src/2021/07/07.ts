export const calculateFuelNeededPart1 = (crabs: number[]): number => {
  const leftmostCrab = Math.min(...crabs);
  const rightmostCrab = Math.max(...crabs);

  let minFuelNeeded = Infinity;

  for (let position = leftmostCrab; position <= rightmostCrab; position += 1) {
    let fuelNeeded = 0;
    crabs.forEach((crab) => {
      const distance = Math.abs(position - crab);
      fuelNeeded += distance;
    });
    if (fuelNeeded < minFuelNeeded) {
      minFuelNeeded = fuelNeeded;
    }
  }

  return minFuelNeeded;
};

// Part 2

export const calculateFuelNeededPart2 = (crabs: number[]): number => {
  const leftmostCrab = Math.min(...crabs);
  const rightmostCrab = Math.max(...crabs);

  let minFuelNeeded = Infinity;

  for (let position = leftmostCrab; position <= rightmostCrab; position += 1) {
    let fuelNeeded = 0;
    crabs.forEach((crab) => {
      const distance = Math.abs(position - crab);
      fuelNeeded += ((distance + 1) / 2) * distance;
    });
    if (fuelNeeded < minFuelNeeded) {
      minFuelNeeded = fuelNeeded;
    }
  }

  return minFuelNeeded;
};
