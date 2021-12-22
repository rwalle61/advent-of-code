import { sum } from '../../utils';

const calculateFuelRequiredForMass = (mass) => {
  const fuelRequired = Math.floor(mass / 3) - 2;
  return fuelRequired > 0 ? fuelRequired : 0;
};

const calculateFuelRequiredForMasses = (inputString) => {
  const moduleMasses = inputString.trim().split('\n');
  const fuelRequired = moduleMasses.map(calculateFuelRequiredForMass);
  return sum(fuelRequired);
};

const calculateFuelRequiredForMassAndItsFuel = (mass) => {
  const fuelRequired = calculateFuelRequiredForMass(mass);
  if (fuelRequired) {
    return fuelRequired + calculateFuelRequiredForMassAndItsFuel(fuelRequired);
  }
  return fuelRequired;
};

const calculateFuelRequiredForMassesAndTheirFuel = (inputString) => {
  const moduleMasses = inputString.trim().split('\n');
  const fuelRequired = moduleMasses.map(calculateFuelRequiredForMassAndItsFuel);
  return sum(fuelRequired);
};

export {
  calculateFuelRequiredForMass,
  calculateFuelRequiredForMasses,
  calculateFuelRequiredForMassAndItsFuel,
  calculateFuelRequiredForMassesAndTheirFuel,
};
