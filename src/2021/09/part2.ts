import { isLowerThanAllNeighbours, Map, parseMap, Point } from './part1';

const findLowPoints = (map: Map): Point[] => {
  const mapWidth = map[0].length;
  const mapHeight = map.length;

  const lowPoints: Point[] = [];

  for (let j = 0; j < mapHeight; j += 1) {
    for (let i = 0; i < mapWidth; i += 1) {
      const point = [i, j] as const;

      if (isLowerThanAllNeighbours(point, map)) {
        lowPoints.push(point);
      }
    }
  }

  return lowPoints;
};

const pointToString = ([x, y]: Point): string => `${x}${y}`;

const isOutOfBounds = ([x, y]: Point, map: Map): boolean => {
  const mapWidth = map[0].length;
  const mapHeight = map.length;
  return x < 0 || x === mapWidth || y < 0 || y === mapHeight;
};

const BASIN_WALL_HEIGHT = 9;

const isBasinWall = ([x, y]: Point, map: Map): boolean =>
  map[y][x] === BASIN_WALL_HEIGHT;

const growBasin = (map: Map, point: Point, basin: Set<string>): void => {
  if (
    isOutOfBounds(point, map) ||
    isBasinWall(point, map) ||
    basin.has(pointToString(point))
  ) {
    return;
  }

  basin.add(pointToString(point));

  const [i, j] = point;

  // left
  growBasin(map, [i - 1, j], basin);
  // right
  growBasin(map, [i + 1, j], basin);
  // up
  growBasin(map, [i, j - 1], basin);
  // down
  growBasin(map, [i, j + 1], basin);
};

const getBasinSizes = (map: Map): number[] => {
  const lowPoints = findLowPoints(map);

  return lowPoints.map((point) => {
    const basin = new Set<string>();

    growBasin(map, point, basin);

    return basin.size;
  });
};

export const multiply3LargestBasinSizes = (rawMap: string): number => {
  const map = parseMap(rawMap);

  const basinSizes = getBasinSizes(map);

  const sortedBasinSizes = [...basinSizes].sort(
    (sizeA, sizeB) => sizeB - sizeA,
  );

  const [largestBasinSize, secondLargestBasinSize, thirdLargestBasinSize] =
    sortedBasinSizes;

  return largestBasinSize * secondLargestBasinSize * thirdLargestBasinSize;
};
