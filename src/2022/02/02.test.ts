import puzzleInput from './puzzleInput';

const exampleInput = `
A Y
B X
C Z
`;

enum Shape {
  Rock,
  Paper,
  Scissors,
}

const predictionToShape = {
  A: Shape.Rock,
  B: Shape.Paper,
  C: Shape.Scissors,
} as const;

const shapeToScore = {
  [Shape.Rock]: 1,
  [Shape.Paper]: 2,
  [Shape.Scissors]: 3,
} as const;

enum Outcome {
  Win,
  Draw,
  Loss,
}

const outcomeToScore = {
  [Outcome.Win]: 6,
  [Outcome.Draw]: 3,
  [Outcome.Loss]: 0,
} as const;

describe('part 1', () => {
  const recommendationToShape = {
    X: Shape.Rock,
    Y: Shape.Paper,
    Z: Shape.Scissors,
  } as const;

  const predictionToRecommendationToOutcome = {
    [Shape.Rock]: {
      [Shape.Rock]: Outcome.Draw,
      [Shape.Paper]: Outcome.Win,
      [Shape.Scissors]: Outcome.Loss,
    },
    [Shape.Paper]: {
      [Shape.Rock]: Outcome.Loss,
      [Shape.Paper]: Outcome.Draw,
      [Shape.Scissors]: Outcome.Win,
    },
    [Shape.Scissors]: {
      [Shape.Rock]: Outcome.Win,
      [Shape.Paper]: Outcome.Loss,
      [Shape.Scissors]: Outcome.Draw,
    },
  };

  const getStrategyScore = (input: string): number => {
    const roundStrategies = input.trim().split('\n') as unknown as [
      keyof typeof predictionToShape,
      ' ',
      keyof typeof recommendationToShape,
    ][];

    const score = roundStrategies.reduce((totalScore, roundStrategy) => {
      const [prediction, , recomendation] = roundStrategy;

      const predictedShape = predictionToShape[prediction];
      const recommendedShape = recommendationToShape[recomendation];

      const roundOutcome =
        predictionToRecommendationToOutcome[predictedShape][recommendedShape];

      const roundScore =
        shapeToScore[recommendedShape] + outcomeToScore[roundOutcome];

      return totalScore + roundScore;
    }, 0);

    return score;
  };

  it('example', () => {
    expect(getStrategyScore(exampleInput)).toBe(15);
  });

  it('answer', () => {
    expect(getStrategyScore(puzzleInput)).toBe(9241);
  });
});

describe('part 2', () => {
  const recommendationToOutcome = {
    X: Outcome.Loss,
    Y: Outcome.Draw,
    Z: Outcome.Win,
  } as const;

  const predictionAndRecommendedOutcomeToRecommendedShape = {
    [Shape.Rock]: {
      [Outcome.Draw]: Shape.Rock,
      [Outcome.Loss]: Shape.Scissors,
      [Outcome.Win]: Shape.Paper,
    },
    [Shape.Paper]: {
      [Outcome.Win]: Shape.Scissors,
      [Outcome.Draw]: Shape.Paper,
      [Outcome.Loss]: Shape.Rock,
    },
    [Shape.Scissors]: {
      [Outcome.Loss]: Shape.Paper,
      [Outcome.Win]: Shape.Rock,
      [Outcome.Draw]: Shape.Scissors,
    },
  };

  const getStrategyScore = (input: string): number => {
    const roundStrategies = input.trim().split('\n') as unknown as [
      keyof typeof predictionToShape,
      ' ',
      keyof typeof recommendationToOutcome,
    ][];

    const score = roundStrategies.reduce((totalScore, roundStrategy) => {
      const [prediction, , recomendation] = roundStrategy;

      const predictedShape = predictionToShape[prediction];
      const recommendedOutcome = recommendationToOutcome[recomendation];

      const recommendedShape =
        predictionAndRecommendedOutcomeToRecommendedShape[predictedShape][
          recommendedOutcome
        ];

      const roundScore =
        shapeToScore[recommendedShape] + outcomeToScore[recommendedOutcome];

      return totalScore + roundScore;
    }, 0);

    return score;
  };

  it('example', () => {
    expect(getStrategyScore(exampleInput)).toBe(12);
  });

  it('answer', () => {
    expect(getStrategyScore(puzzleInput)).toBe(14610);
  });
});
