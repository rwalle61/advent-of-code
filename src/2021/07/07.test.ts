import { calculateFuelNeededPart1, calculateFuelNeededPart2 } from './07';
import puzzleInput from './puzzleInput';

const exampleCrabs = [16, 1, 2, 0, 4, 2, 7, 1, 2, 14];

describe('part 1', () => {
  it('example', () => {
    const fuelNeeded = calculateFuelNeededPart1(exampleCrabs);

    expect(fuelNeeded).toBe(37);
  });

  it('answer', () => {
    const fuelNeeded = calculateFuelNeededPart1(puzzleInput);

    expect(fuelNeeded).toBe(341558);
  });
});

describe('part 2', () => {
  it('example', () => {
    const fuelNeeded = calculateFuelNeededPart2(exampleCrabs);

    expect(fuelNeeded).toBe(168);
  });

  it('answer', () => {
    const fuelNeeded = calculateFuelNeededPart2(puzzleInput);

    expect(fuelNeeded).toBe(93214037);
  });
});
