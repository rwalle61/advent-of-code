export type VentLine = { x1: number; y1: number; x2: number; y2: number };

type Field = number[][];

// const fieldToString = (field: Field): string =>
//   field
//     .map((row) => row.map((point) => (point === 0 ? '.' : `${point}`)).join(''))
//     .join('\n');

const createField = (horizontalAndVerticalLines: VentLine[]): Field => {
  const maxX = Math.max(
    ...horizontalAndVerticalLines.map(({ x1, x2 }) => Math.max(x1, x2))
  );
  const maxY = Math.max(
    ...horizontalAndVerticalLines.map(({ y1, y2 }) => Math.max(y1, y2))
  );

  return Array(maxY + 1)
    .fill(null)
    .map(() => Array(maxX + 1).fill(0));
};

export const numberOfDangerousPointsPart1 = (lines: VentLine[]): number => {
  const horizontalLines = lines.filter(({ y1, y2 }) => y1 === y2);
  const verticalLines = lines.filter(({ x1, x2 }) => x1 === x2);
  const horizontalAndVerticalLines = [...horizontalLines, ...verticalLines];

  const field: Field = createField(horizontalAndVerticalLines);

  horizontalLines.forEach(({ x1, x2, y1 }) => {
    const smallerX = x1 < x2 ? x1 : x2;
    const largerX = x1 < x2 ? x2 : x1;
    for (let i = smallerX; i <= largerX; i += 1) {
      field[y1][i] += 1;
    }
  });

  verticalLines.forEach(({ x1, y1, y2 }) => {
    const smallerY = y1 < y2 ? y1 : y2;
    const largerY = y1 < y2 ? y2 : y1;
    for (let j = smallerY; j <= largerY; j += 1) {
      field[j][x1] += 1;
    }
  });

  // console.log(fieldToString(field));

  let dangerousPoints = 0;

  field.forEach((row) =>
    row.forEach((point) => {
      if (point >= 2) {
        dangerousPoints += 1;
      }
    })
  );

  return dangerousPoints;
};

// Part 2

export const numberOfDangerousPointsPart2 = (lines: VentLine[]): number => {
  const horizontalLines = lines.filter(({ y1, y2 }) => y1 === y2);
  const verticalLines = lines.filter(({ x1, x2 }) => x1 === x2);
  const diagonalLines = lines.filter(
    ({ x1, y1, x2, y2 }) => x1 !== x2 && y1 !== y2
  );

  const field = createField(lines);

  horizontalLines.forEach(({ x1, x2, y1 }) => {
    const smallerX = x1 < x2 ? x1 : x2;
    const largerX = x1 < x2 ? x2 : x1;
    for (let i = smallerX; i <= largerX; i += 1) {
      field[y1][i] += 1;
    }
  });

  verticalLines.forEach(({ x1, y1, y2 }) => {
    const smallerY = y1 < y2 ? y1 : y2;
    const largerY = y1 < y2 ? y2 : y1;
    for (let j = smallerY; j <= largerY; j += 1) {
      field[j][x1] += 1;
    }
  });

  diagonalLines.forEach(({ x1, y1, x2, y2 }) => {
    const goRight = x1 < x2;
    const goLeft = !goRight;
    const goUp = y1 < y2;
    const goDown = !goUp;

    if (goRight && goUp) {
      for (let i = x1, j = y1; i <= x2; i += 1, j += 1) {
        field[j][i] += 1;
      }
    } else if (goRight && goDown) {
      for (let i = x1, j = y1; i <= x2; i += 1, j -= 1) {
        field[j][i] += 1;
      }
    } else if (goLeft && goUp) {
      for (let i = x1, j = y1; i >= x2; i -= 1, j += 1) {
        field[j][i] += 1;
      }
    } else if (goLeft && goDown) {
      for (let i = x1, j = y1; i >= x2; i -= 1, j -= 1) {
        field[j][i] += 1;
      }
    }
  });

  // console.log(fieldToString(field));

  let dangerousPoints = 0;

  field.forEach((row) =>
    row.forEach((point) => {
      if (point >= 2) {
        dangerousPoints += 1;
      }
    })
  );

  return dangerousPoints;
};
