import { countDotsAfterFirstFold } from './part1';
import { foldIntoLetters } from './part2';
import puzzleInput from './puzzleInput';

const exampleFoldInstructions = `
6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5
`;

describe('part 1', () => {
  it('example 1', () => {
    const numberOfDots = countDotsAfterFirstFold(exampleFoldInstructions);

    expect(numberOfDots).toBe(17);
  });

  it('answer', () => {
    const numberOfDots = countDotsAfterFirstFold(puzzleInput);

    expect(numberOfDots).toBe(655);
  });
});

describe('part 2', () => {
  it('example 1', () => {
    const letters = foldIntoLetters(exampleFoldInstructions);

    expect(letters).toBe(
      `
#####
#   #
#   #
#   #
#####
    `.trim(),
    );
  });

  it('answer', () => {
    const letters = foldIntoLetters(puzzleInput);

    expect(letters).toBe(
      `
  ## ###  ####  ##  #  #  ##  #  # ### 
   # #  #    # #  # #  # #  # #  # #  #
   # #  #   #  #    #  # #  # #  # #  #
   # ###   #   #    #  # #### #  # ### 
#  # #    #    #  # #  # #  # #  # # # 
 ##  #    ####  ##   ##  #  #  ##  #  #`.replace(/^\n/, ''),
    );
  });
});
