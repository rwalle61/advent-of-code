import puzzleInput from './puzzleInput';
import {
  calculateFuelRequiredForMass,
  calculateFuelRequiredForMasses,
  calculateFuelRequiredForMassAndItsFuel,
  calculateFuelRequiredForMassesAndTheirFuel,
} from '.';

describe('part 1', () => {
  test('calculateFuelRequiredForMass(mass)', () => {
    expect(calculateFuelRequiredForMass(12)).toBe(2);
    expect(calculateFuelRequiredForMass(14)).toBe(2);
    expect(calculateFuelRequiredForMass(1969)).toBe(654);
    expect(calculateFuelRequiredForMass(100756)).toBe(33583);
  });

  test('calculateFuelRequiredForMasses', () => {
    const exampleInput = `
12
14
1969
100756`;
    expect(calculateFuelRequiredForMasses(exampleInput)).toBe(
      2 + 2 + 654 + 33583,
    );
  });

  test('answer', () => {
    expect(calculateFuelRequiredForMasses(puzzleInput)).toBe(3382284);
  });
});

describe('part 2', () => {
  test('calculateFuelRequiredForMassAndItsFuel(mass)', () => {
    expect(calculateFuelRequiredForMassAndItsFuel(14)).toBe(2);
    expect(calculateFuelRequiredForMassAndItsFuel(1969)).toBe(966);
    expect(calculateFuelRequiredForMassAndItsFuel(100756)).toBe(50346);
  });

  test('calculateFuelRequiredForMassesAndTheirFuel', () => {
    const exampleInput = `
14
1969
100756
`;
    expect(calculateFuelRequiredForMassesAndTheirFuel(exampleInput)).toBe(
      2 + 966 + 50346,
    );
  });
  test('answer', () => {
    expect(calculateFuelRequiredForMassesAndTheirFuel(puzzleInput)).toBe(
      5070541,
    );
  });
});
