export type Rates = {
  gamma: number;
  epsilon: number;
  powerConsumption: number;
};

export const calculateRates = (report: string[]): Rates => {
  let gammaBinary = '';
  let epsilonBinary = '';

  for (let i = 0; i < report[0].length; i += 1) {
    let num0Bits = 0;
    let num1Bits = 0;

    report.forEach((binaryNumber) => {
      const bit = binaryNumber.charAt(i);
      if (bit === '0') {
        num0Bits += 1;
      } else {
        num1Bits += 1;
      }
    });

    if (num0Bits > num1Bits) {
      gammaBinary += '0';
      epsilonBinary += '1';
    } else {
      gammaBinary += '1';
      epsilonBinary += '0';
    }
  }

  const gammaDecimal = parseInt(gammaBinary, 2);
  const epsilonDecimal = parseInt(epsilonBinary, 2);

  return {
    gamma: gammaDecimal,
    epsilon: epsilonDecimal,
    powerConsumption: gammaDecimal * epsilonDecimal,
  };
};
