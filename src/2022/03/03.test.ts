import { sum } from '../../utils';
import puzzleInput from './puzzleInput';

const exampleInput = `
vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw
`;

const isLowerCase = (string: string) => string === string.toLowerCase();

const itemToPriority = (item: string): number =>
  isLowerCase(item) ? item.charCodeAt(0) - 96 : item.charCodeAt(0) - 38;

describe('part 1', () => {
  const sumPrioritiesOfSharedItems = (input: string): number => {
    const rucksacks = input.trim().split('\n');

    const sharedItems = rucksacks.map((rucksack) => {
      const indexOfFirstCompartmentEnd = rucksack.length / 2;
      const firstCompartment = rucksack.slice(0, indexOfFirstCompartmentEnd);
      const secondCompartment = rucksack.slice(
        indexOfFirstCompartmentEnd,
        rucksack.length,
      );

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const sharedItem = [...firstCompartment].find((item) =>
        secondCompartment.includes(item),
      )!;
      return sharedItem;
    });

    const prioritiesOfSharedItems = sharedItems.map(itemToPriority);

    return sum(prioritiesOfSharedItems);
  };

  it('example', () => {
    expect(sumPrioritiesOfSharedItems(exampleInput)).toBe(157);
  });

  it('answer', () => {
    expect(sumPrioritiesOfSharedItems(puzzleInput)).toBe(7850);
  });
});

describe('part 2', () => {
  const chunkArray = <T>(array: T[], chunkSize: number): T[][] => {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      const chunk = array.slice(i, i + chunkSize);
      chunks.push(chunk);
    }
    return chunks;
  };

  const sumPrioritiesOfBadges = (input: string): number => {
    const rucksacks = input.trim().split('\n');

    const elvesPerGroup = 3;
    const groups = chunkArray(rucksacks, elvesPerGroup);

    const badges = groups.map((group) => {
      const [firstRucksack, secondRucksack, thirdRucksack] = group;

      const items = [...firstRucksack, ...secondRucksack, ...thirdRucksack];

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const badge = items.find(
        (item) =>
          firstRucksack.includes(item) &&
          secondRucksack.includes(item) &&
          thirdRucksack.includes(item),
      )!;
      return badge;
    });

    const prioritiesOfBadges = badges.map(itemToPriority);

    return sum(prioritiesOfBadges);
  };

  it('example', () => {
    expect(sumPrioritiesOfBadges(exampleInput)).toBe(70);
  });

  it('answer', () => {
    expect(sumPrioritiesOfBadges(puzzleInput)).toBe(2581);
  });
});
