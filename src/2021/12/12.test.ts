import { countPathsIncludingSmallCavesAtMostOnce } from './part1';
import { countPathsIncludingOneSmallCaveTwice } from './part2';
import puzzleInput from './puzzleInput';

const exampleConnections1 = `
start-A
start-b
A-c
A-b
b-d
A-end
b-end
`;

const exampleConnections2 = `
dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc
`;

const exampleConnections3 = `
fs-end
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
start-pj
he-WI
zg-he
pj-fs
start-RW
`;

describe('part 1', () => {
  it('example 1', () => {
    const numberOfPaths =
      countPathsIncludingSmallCavesAtMostOnce(exampleConnections1);

    expect(numberOfPaths).toBe(10);
  });

  it('example 2', () => {
    const numberOfPaths =
      countPathsIncludingSmallCavesAtMostOnce(exampleConnections2);

    expect(numberOfPaths).toBe(19);
  });

  it('example 3', () => {
    const numberOfPaths =
      countPathsIncludingSmallCavesAtMostOnce(exampleConnections3);

    expect(numberOfPaths).toBe(226);
  });

  it('answer', () => {
    const numberOfPaths = countPathsIncludingSmallCavesAtMostOnce(puzzleInput);

    expect(numberOfPaths).toBe(4659);
  });
});

describe('part 2', () => {
  it('example 1', () => {
    const numberOfPaths =
      countPathsIncludingOneSmallCaveTwice(exampleConnections1);

    expect(numberOfPaths).toBe(36);
  });

  it('example 2', () => {
    const numberOfPaths =
      countPathsIncludingOneSmallCaveTwice(exampleConnections2);

    expect(numberOfPaths).toBe(103);
  });

  it('example 3', () => {
    const numberOfPaths =
      countPathsIncludingOneSmallCaveTwice(exampleConnections3);

    expect(numberOfPaths).toBe(3509);
  });

  // Skipped because slow (5s)
  it.skip('answer', () => {
    const numberOfPaths = countPathsIncludingOneSmallCaveTwice(puzzleInput);

    expect(numberOfPaths).toBe(148962);
  });
});
