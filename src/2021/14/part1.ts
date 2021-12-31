export type Counts = Record<string, number>;

export const add = (element: string, counts: Counts, amount: number): void => {
  // eslint-disable-next-line no-param-reassign
  counts[element] = (counts[element] || 0) + amount;
};

export const subtract = (
  element: string,
  counts: Counts,
  amount: number
): void => {
  add(element, counts, -amount);
};

export const parseInstructions = (
  rawInstructions: string
): { polymerTemplate; rules } => {
  const [[polymerTemplate], rawRules] = rawInstructions
    .trim()
    .split('\n\n')
    .map((section) => section.split('\n'));

  const rules = rawRules.reduce((currentRules, rule) => {
    const [rulePair, newElement] = rule.split(' -> ');
    return { ...currentRules, [rulePair]: newElement };
  }, {});

  return { polymerTemplate, rules };
};

export const growPolymer = (
  rawInstructions: string,
  steps: number
): { polymer: string; elementCounts: Counts } => {
  const { polymerTemplate, rules } = parseInstructions(rawInstructions);

  const elementCounts: Counts = {};

  polymerTemplate.split('').forEach((element) => {
    add(element, elementCounts, 1);
  });

  let polymer = polymerTemplate;

  [...Array(steps)].forEach(() => {
    let newPolymer = '';

    for (let i = 0; i < polymer.length - 1; i += 1) {
      const pair = polymer.substring(i, i + 2);

      const newElement = rules[pair];
      newPolymer += polymer.charAt(i) + newElement;
      add(newElement, elementCounts, 1);
    }

    const lastElement = polymer.charAt(polymer.length - 1);

    polymer = newPolymer + lastElement;
  });

  return { polymer, elementCounts };
};

export const getElementQuantityRangeSlow = (
  rawInstructions: string,
  steps: number
): number => {
  const { elementCounts } = growPolymer(rawInstructions, steps);

  const counts = Object.values(elementCounts);

  return Math.max(...counts) - Math.min(...counts);
};
