import { parseDecimalInt } from '../../utils';

export const isValidPassword = (number: number) => {
  const arr = number.toString().split('');
  let are2AdjacentDigitsSame = false;
  for (let i = 0; i < arr.length; i++) {
    const digit1 = parseDecimalInt(arr[i]);
    const digit2 = parseDecimalInt(arr[i + 1]);
    if (digit1 === digit2) {
      are2AdjacentDigitsSame = true;
    }
    const digitsDecrease = digit2 < digit1;
    if (digitsDecrease) {
      return false;
    }
  }

  return are2AdjacentDigitsSame;
};

export const findPasswords = (rangeStart: number, rangeEnd: number) => {
  const passwords: number[] = [];
  for (let i = rangeStart; i < rangeEnd; i++) {
    if (isValidPassword(i)) {
      passwords.push(i);
    }
  }
  return passwords;
};

export const numPasswords = (rangeStart: number, rangeEnd: number) =>
  findPasswords(rangeStart, rangeEnd).length;

export const isValidPassword2 = (number: number) => {
  const arr = number.toString().split('');
  let are2AdjacentDigitsSameAndDontMatchOtherAdjacentDigits = false;
  for (let i = 0; i < arr.length; i++) {
    const digitOnLeft1 = parseDecimalInt(arr[i - 1]);
    const digit = parseDecimalInt(arr[i]);
    const digitOnRight1 = parseDecimalInt(arr[i + 1]);
    const digitOnRight2 = parseDecimalInt(arr[i + 2]);

    if (
      !are2AdjacentDigitsSameAndDontMatchOtherAdjacentDigits &&
      digit === digitOnRight1 &&
      digitOnRight1 !== digitOnRight2 &&
      digit !== digitOnLeft1
    ) {
      are2AdjacentDigitsSameAndDontMatchOtherAdjacentDigits = true;
    }
    const digitsDecrease = digitOnRight1 < digit;
    if (digitsDecrease) {
      return false;
    }
  }
  return are2AdjacentDigitsSameAndDontMatchOtherAdjacentDigits;
};

export const findPasswords2 = (rangeStart: number, rangeEnd: number) => {
  const passwords: number[] = [];
  for (let i = rangeStart; i < rangeEnd; i++) {
    if (isValidPassword2(i)) {
      passwords.push(i);
    }
  }
  return passwords;
};

export const numPasswords2 = (rangeStart: number, rangeEnd: number) =>
  findPasswords2(rangeStart, rangeEnd).length;
