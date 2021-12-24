// Part 1

export type School = number[];

export const simulate = (school: School, daysRemaining: number): School => {
  if (daysRemaining === 0) {
    return school;
  }
  const bornFish: School = [];

  const updatedSchool: School = school.map((fishTimer) => {
    if (fishTimer === 0) {
      bornFish.push(8);
      return 6;
    }
    return fishTimer - 1;
  });

  const newSchool = [...updatedSchool, ...bornFish];

  return simulate(newSchool, daysRemaining - 1);
};
