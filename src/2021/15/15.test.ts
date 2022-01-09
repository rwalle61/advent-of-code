import { findCostOfCheapestPath, generateGrid } from './15';
import puzzleInput from './puzzleInput';

const exampleChitonGrid = `
1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581
`;

describe('part 1', () => {
  it('example', () => {
    const riskOfSafestChitonPath = findCostOfCheapestPath(exampleChitonGrid);

    expect(riskOfSafestChitonPath).toBe(40);
  });

  it('answer', () => {
    const riskOfSafestChitonPath = findCostOfCheapestPath(puzzleInput);

    expect(riskOfSafestChitonPath).toBe(698);
  });
});

describe('part 2', () => {
  it('example', () => {
    const riskOfSafestChitonPath = findCostOfCheapestPath(
      generateGrid(exampleChitonGrid),
    );

    expect(riskOfSafestChitonPath).toBe(315);
  });

  // Skipped because slow
  it.skip('answer', () => {
    const riskOfSafestChitonPath = findCostOfCheapestPath(
      generateGrid(puzzleInput),
    );

    expect(riskOfSafestChitonPath).toBe(3022);
  });
});
