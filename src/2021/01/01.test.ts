import {
  getDepthMeasurementIncreases,
  getDepthMeasurementIncreasesAcrossWindows,
} from './01';
import puzzleInput from './puzzleInput';

const exampleReport = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];

describe('part 1', () => {
  it('example', () => {
    const increases = getDepthMeasurementIncreases(exampleReport);

    expect(increases).toBe(7);
  });

  it('answer', () => {
    const increases = getDepthMeasurementIncreases(puzzleInput);

    expect(increases).toBe(1548);
  });
});

describe('part 2', () => {
  it('example', () => {
    const increases = getDepthMeasurementIncreasesAcrossWindows(exampleReport);

    expect(increases).toBe(5);
  });

  it('answer', () => {
    const increases = getDepthMeasurementIncreasesAcrossWindows(puzzleInput);

    expect(increases).toBe(1589);
  });
});
