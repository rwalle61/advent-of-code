import Point from './Point';
import Wire from './Wire';

const findIntersects = (pathOfWire1, pathOfWire2) => {
  const wire1 = new Wire(pathOfWire1);
  const wire2 = new Wire(pathOfWire2);
  return wire1.findIntersects(wire2);
};

const nearerOrigin = (point1, point2) =>
  point1.manhattanDistanceToOrigin() < point2.manhattanDistanceToOrigin();

const findNearestIntersect = (pathOfWire1, pathOfWire2) => {
  const intersects = findIntersects(pathOfWire1, pathOfWire2);
  let nearestIntersect = new Point(999999999, 999999999);
  intersects.forEach((intersect) => {
    if (nearerOrigin(intersect, nearestIntersect)) {
      nearestIntersect = intersect;
    }
  });
  return nearestIntersect;
};

const findDistanceToNearestIntersect = (pathOfWire1, pathOfWire2) => {
  const nearestIntersect = findNearestIntersect(pathOfWire1, pathOfWire2);
  return nearestIntersect.manhattanDistanceToOrigin();
};

const sumStepsToShortestIntersect = (pathOfWire1, pathOfWire2): number => {
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

export {
  Wire,
  findIntersects,
  findNearestIntersect,
  findDistanceToNearestIntersect,
  sumStepsToShortestIntersect,
};
