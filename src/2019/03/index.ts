import Point from './Point';
import Wire from './Wire';

export const findIntersects = (pathOfWire1: string, pathOfWire2: string) => {
  const wire1 = new Wire(pathOfWire1);
  const wire2 = new Wire(pathOfWire2);
  return wire1.findIntersects(wire2);
};

const nearerOrigin = (point1: Point, point2: Point) =>
  point1.manhattanDistanceToOrigin() < point2.manhattanDistanceToOrigin();

export const findNearestIntersect = (
  pathOfWire1: string,
  pathOfWire2: string,
) => {
  const intersects = findIntersects(pathOfWire1, pathOfWire2);
  let nearestIntersect = new Point(999999999, 999999999);
  intersects.forEach((intersect) => {
    if (nearerOrigin(intersect, nearestIntersect)) {
      nearestIntersect = intersect;
    }
  });
  return nearestIntersect;
};

export const findDistanceToNearestIntersect = (
  pathOfWire1: string,
  pathOfWire2: string,
) => {
  const nearestIntersect = findNearestIntersect(pathOfWire1, pathOfWire2);
  return nearestIntersect.manhattanDistanceToOrigin();
};

export const sumStepsToShortestIntersect = (
  pathOfWire1: string,
  pathOfWire2: string,
): number => {
  const wire1 = new Wire(pathOfWire1);
  const wire2 = new Wire(pathOfWire2);
  const intersects = wire1.findIntersects(wire2);

  let sumOfStepsToShortestIntersect = 9999999;
  intersects.forEach((intersect) => {
    const wire1StepsToIntersect = wire1.findStepsToPoint(intersect);
    const wire2StepsToIntersect = wire2.findStepsToPoint(intersect);
    const sumOfStepsToIntersect = wire1StepsToIntersect + wire2StepsToIntersect;
    if (sumOfStepsToIntersect < sumOfStepsToShortestIntersect) {
      sumOfStepsToShortestIntersect = sumOfStepsToIntersect;
    }
  });
  return sumOfStepsToShortestIntersect;
};

export { Wire };
