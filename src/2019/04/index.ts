const toInt = (char) => parseInt(char, 10);

const isValidPassword = (number) => {
  const arr = number.toString().split('');
  let are2AdjacentDigitsSame = false;
  for (let i = 0; i < arr.length; i++) {
    const digit1 = toInt(arr[i]);
    const digit2 = toInt(arr[i + 1]);
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

const findPasswords = (rangeStart, rangeEnd) => {
  const passwords = [];
  for (let i = rangeStart; i < rangeEnd; i++) {
    if (isValidPassword(i)) {
      passwords.push(i);
    }
  }
  return passwords;
};

const numPasswords = (rangeStart, rangeEnd) =>
  findPasswords(rangeStart, rangeEnd).length;

const isValidPassword2 = (number) => {
  const arr = number.toString().split('');
  let are2AdjacentDigitsSameAndDontMatchOtherAdjacentDigits = false;
  for (let i = 0; i < arr.length; i++) {
    const digitOnLeft1 = toInt(arr[i - 1]);
    const digit = toInt(arr[i]);
    const digitOnRight1 = toInt(arr[i + 1]);
    const digitOnRight2 = toInt(arr[i + 2]);

    if (!are2AdjacentDigitsSameAndDontMatchOtherAdjacentDigits) {
      if (digit === digitOnRight1) {
        if (digitOnRight1 === digitOnRight2) {
          are2AdjacentDigitsSameAndDontMatchOtherAdjacentDigits = false;
        } else if (digit === digitOnLeft1) {
          are2AdjacentDigitsSameAndDontMatchOtherAdjacentDigits = false;
        } else {
          are2AdjacentDigitsSameAndDontMatchOtherAdjacentDigits = true;
        }
      }
    }
    const digitsDecrease = digitOnRight1 < digit;
    if (digitsDecrease) {
      return false;
    }
  }
  return are2AdjacentDigitsSameAndDontMatchOtherAdjacentDigits;
};

const findPasswords2 = (rangeStart, rangeEnd) => {
  const passwords = [];
  for (let i = rangeStart; i < rangeEnd; i++) {
    if (isValidPassword2(i)) {
      passwords.push(i);
    }
  }
  return passwords;
};

const numPasswords2 = (rangeStart, rangeEnd) =>
  findPasswords2(rangeStart, rangeEnd).length;

export {
  isValidPassword,
  findPasswords,
  numPasswords,
  isValidPassword2,
  findPasswords2,
  numPasswords2,
};
