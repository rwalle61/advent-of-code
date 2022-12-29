import { add, Counts, parseInstructions, subtract } from './part1';

export const countElements = (
  rawInstructions: string,
  steps: number,
): Counts => {
  const { polymerTemplate, rules } = parseInstructions(rawInstructions);

  const pairCounts: Counts = {};

  for (let i = 0; i < polymerTemplate.length - 1; i += 1) {
    const pair = polymerTemplate.substring(i, i + 2);
    add(pair, pairCounts, 1);
  }

  [...Array(steps)].forEach(() => {
    Object.entries(pairCounts).forEach(([pair, count]) => {
      if (count === 0) {
        return;
      }
      const [element1, element2] = pair.split('');

      const newElement = rules[pair];
      const newPair1 = element1 + newElement;
      const newPair2 = newElement + element2;

      subtract(pair, pairCounts, count);
      add(newPair1, pairCounts, count);
      add(newPair2, pairCounts, count);
    });
  });

  const elementCounts: Counts = {};

  Object.entries(pairCounts).forEach(([pair, count]) => {
    const element = pair[0];
    add(element, elementCounts, count);
  });

  const lastElement = polymerTemplate[polymerTemplate.length - 1];
  add(lastElement, elementCounts, 1);

  return elementCounts;
};

export const getElementQuantityRangeFast = (
  rawInstructions: string,
  steps: number,
): number => {
  const elementCounts = countElements(rawInstructions, steps);

  const counts = Object.values(elementCounts);

  return Math.max(...counts) - Math.min(...counts);
};
