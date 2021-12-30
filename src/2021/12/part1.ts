export const START_CAVE = 'start';

export const END_CAVE = 'end';

const isSmallCave = (cave: string): boolean => cave === cave.toLowerCase();

export const isVisitedSmallCave = (cave: string, path: string[]): boolean =>
  isSmallCave(cave) && path.includes(cave);

const findPathsIncludingCave = (
  cave: string,
  pathBeforeCave: string[],
  connections: string[][]
): string[][] => {
  if (isVisitedSmallCave(cave, pathBeforeCave)) {
    return [];
  }

  const pathIncludingCave = [...pathBeforeCave, cave];

  if (cave === END_CAVE) {
    return [pathIncludingCave];
  }

  let pathsIncludingCave = [];

  connections.forEach(([caveA, caveB]) => {
    if (caveA === cave) {
      const pathsFromThisCave = findPathsIncludingCave(
        caveB,
        pathIncludingCave,
        connections
      );

      pathsIncludingCave = pathsIncludingCave.concat(pathsFromThisCave);
    } else if (caveB === cave) {
      const pathsFromThisCave = findPathsIncludingCave(
        caveA,
        pathIncludingCave,
        connections
      );

      pathsIncludingCave = pathsIncludingCave.concat(pathsFromThisCave);
    }
  });

  return pathsIncludingCave;
};

export const countPathsIncludingSmallCavesAtMostOnce = (
  rawConnections: string
): number => {
  const connections = rawConnections
    .trim()
    .split('\n')
    .map((line) => line.split('-'));

  const paths = findPathsIncludingCave(START_CAVE, [], connections);

  return paths.length;
};
