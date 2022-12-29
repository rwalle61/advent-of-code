import { sum } from '../../utils';

export const calculateFuelRequiredForMass = (mass: number) => {
  const fuelRequired = Math.floor(mass / 3) - 2;
  return fuelRequired > 0 ? fuelRequired : 0;
};

export const calculateFuelRequiredForMasses = (inputString: string) => {
  const moduleMasses = inputString
    .trim()
    .split('\n')
    .map((mass) => parseInt(mass, 10));
  const fuelRequired = moduleMasses.map(calculateFuelRequiredForMass);
  return sum(fuelRequired);
};

export const calculateFuelRequiredForMassAndItsFuel = (
  mass: number,
): number => {
  const fuelRequired = calculateFuelRequiredForMass(mass);
  if (fuelRequired) {
    return fuelRequired + calculateFuelRequiredForMassAndItsFuel(fuelRequired);
  }
  return fuelRequired;
};

export const calculateFuelRequiredForMassesAndTheirFuel = (
  inputString: string,
) => {
  const moduleMasses = inputString
    .trim()
    .split('\n')
    .map((mass) => parseInt(mass, 10));
  const fuelRequired = moduleMasses.map(calculateFuelRequiredForMassAndItsFuel);
  return sum(fuelRequired);
};
