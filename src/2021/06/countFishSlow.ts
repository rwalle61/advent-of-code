/* eslint-disable no-param-reassign */

// Part 2

// This is the best solution for Part 2 I could find, but it was too slow to find the answer.
// Like the successful solution (countFishFast), this ignores the order of the fish.
// This calculates a given fish's descendants by fast-forwarding to the reproduction days

// I also thought there might be a mathematical solution, but I couldn't find it.

import { School } from './simulate';

const countDescendants = (fishTimer: number, daysRemaining: number): number => {
  let count = 0;

  while (daysRemaining > fishTimer) {
    // skip to day when timer resets
    daysRemaining -= fishTimer + 1;

    // first descendant + its descendants (skip first 2 days)
    count += 1 + countDescendants(6, daysRemaining - 2);

    // reset timer and repeat
    fishTimer = 6;
  }

  return count;
};

export const countFishSlow = (
  school: School,
  daysRemaining: number,
): number => {
  let count = school.length;

  school.forEach((fishTimer) => {
    count += countDescendants(fishTimer, daysRemaining);
  });

  return count;
};
