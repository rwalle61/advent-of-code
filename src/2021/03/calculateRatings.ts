const findOxygenGeneratorRating = (
  numbers: string[],
  index: number
): number => {
  if (numbers.length === 1) {
    return parseInt(numbers[0], 2);
  }

  let num0Bits = 0;
  let num1Bits = 0;

  numbers.forEach((binaryNumber) => {
    const bit = binaryNumber.charAt(index);
    if (bit === '0') {
      num0Bits += 1;
    } else {
      num1Bits += 1;
    }
  });

  const mostCommonValue = num0Bits > num1Bits ? '0' : '1';

  const remainingNumbers = numbers.filter(
    (binaryNumber) => binaryNumber.charAt(index) === mostCommonValue
  );

  return findOxygenGeneratorRating(remainingNumbers, index + 1);
};

const findCO2ScrubberRating = (numbers: string[], index: number): number => {
  if (numbers.length === 1) {
    return parseInt(numbers[0], 2);
  }

  let num0Bits = 0;
  let num1Bits = 0;

  numbers.forEach((binaryNumber) => {
    const bit = binaryNumber.charAt(index);
    if (bit === '0') {
      num0Bits += 1;
    } else {
      num1Bits += 1;
    }
  });

  const leastCommonValue = num0Bits > num1Bits ? '1' : '0';

  const remainingNumbers = numbers.filter(
    (binaryNumber) => binaryNumber.charAt(index) === leastCommonValue
  );

  return findCO2ScrubberRating(remainingNumbers, index + 1);
};

export type Ratings = {
  oxygenGenerator: number;
  co2Scrubber: number;
  lifeSupport: number;
};

export const calculateRatings = (report: string[]): Ratings => {
  const oxygenGenerator = findOxygenGeneratorRating(report, 0);
  const co2Scrubber = findCO2ScrubberRating(report, 0);
  return {
    oxygenGenerator,
    co2Scrubber,
    lifeSupport: oxygenGenerator * co2Scrubber,
  };
};
