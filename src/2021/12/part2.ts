import { END_CAVE, isVisitedSmallCave, START_CAVE } from './part1';

const findPathsIncludingCaveAndOneSmallCaveTwice = (
  cave: string,
  pathBeforeCave: string[],
  connections: string[][],
  smallCaveVisitedTwice: string | undefined
): string[][] => {
  const pathIncludingCave = [...pathBeforeCave, cave];

  if (cave === END_CAVE) {
    return [pathIncludingCave];
  }

  const visitedThisCave = isVisitedSmallCave(cave, pathBeforeCave);

  const visitedThisCaveTwice = cave === smallCaveVisitedTwice;

  const visitedAnotherCaveTwice = Boolean(smallCaveVisitedTwice);

  if (visitedThisCaveTwice || (visitedThisCave && visitedAnotherCaveTwice)) {
    return [];
  }

  const newSmallCaveVisitedTwice = visitedThisCave
    ? cave
    : smallCaveVisitedTwice;

  let pathsIncludingCave = [];

  connections.forEach(([caveA, caveB]) => {
    if (caveA === cave && caveB !== START_CAVE) {
      const pathsFromThisCave = findPathsIncludingCaveAndOneSmallCaveTwice(
        caveB,
        pathIncludingCave,
        connections,
        newSmallCaveVisitedTwice
      );

      pathsIncludingCave = pathsIncludingCave.concat(pathsFromThisCave);
    } else if (caveB === cave && caveA !== START_CAVE) {
      const pathsFromThisCave = findPathsIncludingCaveAndOneSmallCaveTwice(
        caveA,
        pathIncludingCave,
        connections,
        newSmallCaveVisitedTwice
      );

      pathsIncludingCave = pathsIncludingCave.concat(pathsFromThisCave);
    }
  });

  return pathsIncludingCave;
};

export const countPathsIncludingOneSmallCaveTwice = (
  rawConnections: string
): number => {
  const connections = rawConnections
    .trim()
    .split('\n')
    .map((line) => line.split('-'));

  const paths = findPathsIncludingCaveAndOneSmallCaveTwice(
    START_CAVE,
    [],
    connections,
    undefined
  );

  return paths.length;
};
