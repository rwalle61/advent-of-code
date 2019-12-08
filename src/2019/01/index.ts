const calculateFuelRequiredForMass = (mass) => Math.floor(mass / 3) - 2;

const sum = (array) => array.reduce((a, b) => a + b, 0);

const calculateFuelRequiredForMasses = (inputString) => {
  const moduleMasses = inputString.trim().split('\n');
  const fuelRequired = moduleMasses.map(calculateFuelRequiredForMass);
  return sum(fuelRequired);
};

const calculateFuelRequiredForMassAndItsFuel = (mass) => {
  let totalFuelRequired = 0;
  let fuelRequiredForMass = calculateFuelRequiredForMass(mass);
  while (fuelRequiredForMass > 0) {
    totalFuelRequired += fuelRequiredForMass;
    fuelRequiredForMass = calculateFuelRequiredForMass(fuelRequiredForMass);
  }
  return totalFuelRequired;
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
