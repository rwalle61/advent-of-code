import { readFileSync } from 'fs';
import { VentLine } from './05';

export const parseFile = (filepath: string): VentLine[] => {
  const fileData = readFileSync(filepath, 'utf8').trim();

  const ventLineStrings = fileData.split('\n');

  const ventLines = ventLineStrings.map((line) => {
    const [[x1, y1], [x2, y2]] = line
      .split(' -> ')
      .map((coordinates) =>
        coordinates.split(',').map((coordinate) => parseInt(coordinate, 10))
      );
    return {
      x1,
      y1,
      x2,
      y2,
    };
  });

  return ventLines;
};
