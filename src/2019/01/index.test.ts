import { readFileSync } from 'fs-extra';
import { resolve } from 'path';

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
    const input = readFileSync(resolve(__dirname, 'part1ExampleInput.txt'), 'utf8');
    expect(calculateFuelRequiredForMasses(input)).toBe(2 + 2 + 654 + 33583);
  });
  test('answer', () => {
    const input = readFileSync(resolve(__dirname, 'puzzleInput.txt'), 'utf8');
    expect(calculateFuelRequiredForMasses(input)).toBe(3382284);
  });
});

describe('part 2', () => {
  test('calculateFuelRequiredForMassAndItsFuel(mass)', () => {
    expect(calculateFuelRequiredForMassAndItsFuel(14)).toBe(2);
    expect(calculateFuelRequiredForMassAndItsFuel(1969)).toBe(966);
    expect(calculateFuelRequiredForMassAndItsFuel(100756)).toBe(50346);
  });
  test('calculateFuelRequiredForMassesAndTheirFuel', () => {
    const input = readFileSync(resolve(__dirname, 'part2ExampleInput.txt'), 'utf8');
    expect(calculateFuelRequiredForMassesAndTheirFuel(input)).toBe(2 + 966 + 50346);
  });
  test('answer', () => {
    const input = readFileSync(resolve(__dirname, 'puzzleInput.txt'), 'utf8');
    expect(calculateFuelRequiredForMassesAndTheirFuel(input)).toBe(5070541);
  });
});
