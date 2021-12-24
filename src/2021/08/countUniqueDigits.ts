export const parseEntries = (entriesString: string): string[] =>
  entriesString.trim().split('\n');

const getOutputSignalPatterns = (entry: string): string[] =>
  entry.split(' | ').map((line) => line.split(' '))[1];

const uniquePatternLengths = {
  1: 2,
  4: 4,
  7: 3,
  8: 7,
};

const isUniqueSignalPattern = (signalPattern: string) =>
  Object.values(uniquePatternLengths).includes(signalPattern.length);

export const countUniqueDigits = (entriesString: string): number => {
  const entries = parseEntries(entriesString);

  const outputSignalPatterns = entries.map(getOutputSignalPatterns).flat();

  return outputSignalPatterns.filter(isUniqueSignalPattern).length;
};
