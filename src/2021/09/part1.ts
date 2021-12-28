import { parseDecimalInt, sum } from '../../utils';

export type Point = readonly [number, number];

export type Map = number[][];

export const parseMap = (rawMap: string): Map =>
  rawMap
    .trim()
    .split('\n')
    .map((row) => row.split('').map(parseDecimalInt));

export const isLowerThanAllNeighbours = ([x, y]: Point, map: Map): boolean => {
  const mapWidth = map[0].length;
  const mapHeight = map.length;

  const pointHeight = map[y][x];

  const hasLowerNeighbourOnLeft = x !== 0 && map[y][x - 1] <= pointHeight;

  const hasLowerNeighbourOnRight =
    x !== mapWidth - 1 && map[y][x + 1] <= pointHeight;

  const hasLowerNeighbourAbove = y !== 0 && map[y - 1][x] <= pointHeight;

  const hasLowerNeighbourBelow =
    y !== mapHeight - 1 && map[y + 1][x] <= pointHeight;

  return (
    !hasLowerNeighbourOnLeft &&
    !hasLowerNeighbourOnRight &&
    !hasLowerNeighbourAbove &&
    !hasLowerNeighbourBelow
  );
};

const findLowPointHeights = (map: Map): number[] => {
  const mapWidth = map[0].length;
  const mapHeight = map.length;

  const lowPointHeights = [];

  for (let j = 0; j < mapHeight; j += 1) {
    for (let i = 0; i < mapWidth; i += 1) {
      const point = [i, j] as const;

      const pointHeight = map[j][i];

      if (isLowerThanAllNeighbours(point, map)) {
        lowPointHeights.push(pointHeight);
      }
    }
  }

  return lowPointHeights;
};

export const sumRiskOfLowPoints = (rawMap: string): number => {
  const map = parseMap(rawMap);

  const lowPointHeights = findLowPointHeights(map);

  const riskLevels = lowPointHeights.map((point) => 1 + point);

  return sum(riskLevels);
};
