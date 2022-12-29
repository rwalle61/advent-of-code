import { parseDecimalInt, sum } from '../../utils';

const hexToBinary = {
  0: '0000',
  1: '0001',
  2: '0010',
  3: '0011',
  4: '0100',
  5: '0101',
  6: '0110',
  7: '0111',
  8: '1000',
  9: '1001',
  A: '1010',
  B: '1011',
  C: '1100',
  D: '1101',
  E: '1110',
  F: '1111',
} as const;

const parseHexStringToBinary = (hexString: string) =>
  hexString
    .split('')
    .map((hexDigit) => hexToBinary[hexDigit as keyof typeof hexToBinary])
    .join('');

const binaryToDecimal = (binaryString: string): number =>
  parseInt(binaryString, 2);

enum PacketTypeId {
  Sum = 0,
  Product = 1,
  Min = 2,
  Max = 3,
  Literal = 4,
  GreaterThan = 5,
  LessThan = 6,
  Equal = 7,
}

enum LengthTypeId {
  TotalLengthInBits = 0,
  NumberOfImmediateSubpackets = 1,
}

const reduce = (
  subpacketValues: number[],
  packetTypeId: Exclude<PacketTypeId, PacketTypeId.Literal>,
): number => {
  const operations: Record<
    Exclude<PacketTypeId, PacketTypeId.Literal>,
    (array: number[]) => number
  > = {
    [PacketTypeId.Sum]: sum,
    [PacketTypeId.Product]: (array) => array.reduce((a, b) => a * b, 1),
    [PacketTypeId.Min]: (array) => Math.min(...array),
    [PacketTypeId.Max]: (array) => Math.max(...array),
    [PacketTypeId.GreaterThan]: ([packet1Value, packet2Value]) =>
      packet1Value > packet2Value ? 1 : 0,
    [PacketTypeId.LessThan]: ([packet1Value, packet2Value]) =>
      packet1Value < packet2Value ? 1 : 0,
    [PacketTypeId.Equal]: ([packet1Value, packet2Value]) =>
      packet1Value === packet2Value ? 1 : 0,
  };

  return operations[packetTypeId](subpacketValues);
};

const decodePacket = (
  binaryString: string,
): { versions: number[]; value: number; newBinaryString: string } => {
  let versions: number[] = [];
  let newBinaryString = binaryString;

  const version = binaryToDecimal(newBinaryString.substring(0, 3));
  versions.push(version);
  newBinaryString = newBinaryString.substring(3);

  const packetTypeId = binaryToDecimal(newBinaryString.substring(0, 3));
  newBinaryString = newBinaryString.substring(3);

  if (packetTypeId === PacketTypeId.Literal) {
    const NON_LAST_GROUP_PREFIX = '1';

    // TODO why don't need to take account of this?
    // "the binary number is padded with leading zeroes until its length is a multiple of four bits, and then it is broken into groups of four bits. Each group is prefixed by a 1 bit except the last group, which is prefixed by a 0 bit"
    let binaryOfLiteralValuePacketValue = '';
    while (newBinaryString[0] === NON_LAST_GROUP_PREFIX) {
      binaryOfLiteralValuePacketValue += newBinaryString.substring(1, 5);
      newBinaryString = newBinaryString.substring(5);
    }
    binaryOfLiteralValuePacketValue += newBinaryString.substring(1, 5);
    newBinaryString = newBinaryString.substring(5);

    return {
      versions,
      value: binaryToDecimal(binaryOfLiteralValuePacketValue),
      newBinaryString,
    };
  }

  const lengthTypeId = parseDecimalInt(newBinaryString[0]);
  newBinaryString = newBinaryString.substring(1);

  if (lengthTypeId === LengthTypeId.TotalLengthInBits) {
    const subpacketsLength = binaryToDecimal(newBinaryString.substring(0, 15));
    newBinaryString = newBinaryString.substring(15);

    let binaryStringContainingSubpackets = newBinaryString.substring(
      0,
      subpacketsLength,
    );
    newBinaryString = newBinaryString.substring(subpacketsLength);

    const subpacketValues: number[] = [];
    while (binaryStringContainingSubpackets.length) {
      const {
        versions: foundVersions,
        value: foundValue,
        newBinaryString: remainingBinaryString,
      } = decodePacket(binaryStringContainingSubpackets);
      versions = versions.concat(foundVersions);
      subpacketValues.push(foundValue);
      binaryStringContainingSubpackets = remainingBinaryString;
    }

    const combinedSubpacketsValue = reduce(subpacketValues, packetTypeId);

    return { versions, value: combinedSubpacketsValue, newBinaryString };
  }

  // if (lengthTypeId === LengthTypeId.NumberOfImmediateSubpackets) {
  const numberOfSubpackets = binaryToDecimal(newBinaryString.substring(0, 11));
  newBinaryString = newBinaryString.substring(11);

  const subpacketValues: number[] = [];

  for (let n = 0; n < numberOfSubpackets; n += 1) {
    const {
      versions: foundVersions,
      value: foundValue,
      newBinaryString: remainingBinaryString,
    } = decodePacket(newBinaryString);
    versions = versions.concat(foundVersions);
    subpacketValues.push(foundValue);
    newBinaryString = remainingBinaryString;
  }

  const combinedSubpacketsValue = reduce(subpacketValues, packetTypeId);

  return { versions, value: combinedSubpacketsValue, newBinaryString };
  // }
};

export const sumVersionNumbersHex = (hexString: string): number => {
  const binaryString = parseHexStringToBinary(hexString);
  const { versions } = decodePacket(binaryString);
  return sum(versions);
};

export const decodeValueOfOutermostPacket = (hexString: string): number => {
  const binaryString = parseHexStringToBinary(hexString);
  const { value } = decodePacket(binaryString);
  return value;
};
