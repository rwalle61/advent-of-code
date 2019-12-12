import {
  isValidPassword,
  findPasswords,
  numPasswords,
  isValidPassword2,
  findPasswords2,
  numPasswords2,
} from '.';

describe('day 4', () => {
  describe('part 1', () => {
    test('isValidPassword(number)', () => {
      expect(isValidPassword(111111)).toBe(true);
      expect(isValidPassword(223450)).toBe(false);
      expect(isValidPassword(123789)).toBe(false);
    });
    test('findPasswords(rangeStart, rangeEnd)', () => {
      expect(findPasswords(111111, 111112)).toStrictEqual([111111]);
      expect(findPasswords(223450, 223451)).toStrictEqual([]);
      expect(findPasswords(123789, 123790)).toStrictEqual([]);
    });
    test('numPasswords(rangeStart, rangeEnd)', () => {
      expect(numPasswords(111111, 111112)).toEqual(1);
      expect(numPasswords(223450, 223451)).toEqual(0);
      expect(numPasswords(123789, 123790)).toEqual(0);
    });
    test('answer', () => {
      expect(numPasswords(124075, 580769)).toEqual(2150);
    });
  });
  describe('part 2', () => {
    test('isValidPassword2(number)', () => {
      expect(isValidPassword2(112233)).toBe(true);
      expect(isValidPassword2(123444)).toBe(false);
      expect(isValidPassword2(111122)).toBe(true);
      // tests added by me
      expect(isValidPassword2(112222)).toBe(true);
      expect(isValidPassword2(122333)).toBe(true);
      expect(isValidPassword2(111223)).toBe(true);
      expect(isValidPassword2(111234)).toBe(false);
    });
    test('findPasswords2(rangeStart, rangeEnd)', () => {
      expect(findPasswords2(112233, 112234)).toStrictEqual([112233]);
      expect(findPasswords2(123444, 123445)).toStrictEqual([]);
    });
    test('numPasswords2(rangeStart, rangeEnd)', () => {
      expect(numPasswords2(112233, 112234)).toEqual(1);
    });
    test('answer', () => {
      expect(numPasswords2(124075, 580769)).toEqual(1462);
    });
  });
});
