import { readFileSync } from 'fs';

const parseOrbitMap = (filepath) => {
  const fileData = readFileSync(filepath, 'utf8').trim();
  const mapOfStrings = fileData.split('\n');
  const orbitMap = mapOfStrings.map((orbitString) => orbitString.split(')'));
  return orbitMap;
};

const sumArray = (arr) => arr.reduce((a, b) => a + b, 0);

const countOrbitsRecursive = (orbitMap, nextObj, distanceFromCentre) => {
  const numOrbitsFromHere = distanceFromCentre;

  const nextPairs = orbitMap.filter((pair) => pair[0] === nextObj);
  const arrayOfOrbitsFromAfterHere = nextPairs.map((pair) =>
    countOrbitsRecursive(orbitMap, pair[1], distanceFromCentre + 1)
  );
  const numOrbitsFromAfterHere = sumArray(arrayOfOrbitsFromAfterHere);

  return numOrbitsFromHere + numOrbitsFromAfterHere;
};

const countOrbits = (orbitMap) => {
  const firstNextObj = 'COM';
  const numOrbits = countOrbitsRecursive(orbitMap, firstNextObj, 0);
  return numOrbits;
};

const buildTreeBackwards = (orbitMap, currentOrbitingObj) => {
  if (currentOrbitingObj === 'COM') {
    return ['COM'];
  }
  const currentPair = orbitMap.find((pair) => pair[1] === currentOrbitingObj);
  const nextOrbitingObj = currentPair[0];
  const remainingTree = buildTreeBackwards(orbitMap, nextOrbitingObj);
  return [currentOrbitingObj].concat(remainingTree);
};

const countOrbitalTransfers = (orbitMap) => {
  const orbitTreeToYou = buildTreeBackwards(orbitMap, 'YOU');
  const orbitTreeToSanta = buildTreeBackwards(orbitMap, 'SAN');
  const nearestJunction = orbitTreeToYou.find(
    (obj) => !['YOU', 'SAN'].includes(obj) && orbitTreeToSanta.includes(obj)
  );
  const transfersFromYouToNearestJunction =
    orbitTreeToYou.indexOf(nearestJunction) - 1;
  const transfersFromNearestJunctionToSanta =
    orbitTreeToSanta.indexOf(nearestJunction) - 1;
  const numTransfers =
    transfersFromYouToNearestJunction + transfersFromNearestJunctionToSanta;
  return numTransfers;
};

export { parseOrbitMap, countOrbits, countOrbitalTransfers };
