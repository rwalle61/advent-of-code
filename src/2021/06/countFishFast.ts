// Part 2

// Unfortunately I didn't think of this solution (rotating counts around an array), so I copied
// https://github.com/sk1talets/advent-of-code/blob/main/2021/6/script.2.js
// See more discussion at https://www.reddit.com/r/adventofcode/comments/rac5nb/day6_part2_when_to_use_solutions_like_these/

import { arrayOf, sum } from '../../utils';
import { School } from './simulate';

export const countFishFast = (
  school: School,
  daysRemaining: number,
): number => {
  const counts: number[] = arrayOf(0, 9);

  school.forEach((fishTimer) => {
    counts[fishTimer] += 1;
  });

  for (let i = 0; i < daysRemaining; i += 1) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const newCount = counts.shift()!;
    counts[6] += newCount;
    counts.push(newCount);
  }

  return sum(counts);
};
