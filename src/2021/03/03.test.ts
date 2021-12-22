import { calculateRates, Rates } from './calculateRates';
import { calculateRatings, Ratings } from './calculateRatings';
import puzzleInput from './puzzleInput';

const exampleReport = [
  '00100',
  '11110',
  '10110',
  '10111',
  '10101',
  '01111',
  '00111',
  '11100',
  '10000',
  '11001',
  '00010',
  '01010',
];

describe('part 1', () => {
  it('example', () => {
    const rates = calculateRates(exampleReport);

    expect(rates).toMatchObject<Rates>({
      gamma: 22,
      epsilon: 9,
      powerConsumption: 198,
    });
  });

  it('answer', () => {
    const rates = calculateRates(puzzleInput);

    expect(rates).toMatchObject<Rates>({
      gamma: 779,
      epsilon: 3316,
      powerConsumption: 2583164,
    });
  });
});

describe('part 2', () => {
  it('example', () => {
    const ratings = calculateRatings(exampleReport);

    expect(ratings).toMatchObject<Ratings>({
      oxygenGenerator: 23,
      co2Scrubber: 10,
      lifeSupport: 230,
    });
  });

  it('answer', () => {
    const ratings = calculateRatings(puzzleInput);

    expect(ratings).toMatchObject<Ratings>({
      oxygenGenerator: 825,
      co2Scrubber: 3375,
      lifeSupport: 2784375,
    });
  });
});
