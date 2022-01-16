import { decodeValueOfOutermostPacket, sumVersionNumbersHex } from './16';
import puzzleInput from './puzzleInput';

describe('part 1', () => {
  it('examples', () => {
    expect(sumVersionNumbersHex('D2FE28')).toBe(6);
    expect(sumVersionNumbersHex('38006F45291200')).toBe(9); // 1 + 6 + 2
    expect(sumVersionNumbersHex('EE00D40C823060')).toBe(14); // 7 + 2 + 4 + 1
    expect(sumVersionNumbersHex('8A004A801A8002F478')).toBe(16); // 4 + 1 + 5 + 6
    expect(sumVersionNumbersHex('620080001611562C8802118E34')).toBe(12);
    expect(sumVersionNumbersHex('C0015000016115A2E0802F182340')).toBe(23);
    expect(sumVersionNumbersHex('A0016C880162017C3686B18A3D4780')).toBe(31);
  });

  it('answer', () => {
    expect(sumVersionNumbersHex(puzzleInput)).toBe(866);
  });
});

describe('part 2', () => {
  it('examples', () => {
    expect(decodeValueOfOutermostPacket('C200B40A82')).toBe(3); // sum
    expect(decodeValueOfOutermostPacket('04005AC33890')).toBe(54); // product
    expect(decodeValueOfOutermostPacket('880086C3E88112')).toBe(7); // min
    expect(decodeValueOfOutermostPacket('CE00C43D881120')).toBe(9); // max
    expect(decodeValueOfOutermostPacket('D8005AC2A8F0')).toBe(1); // less than
    expect(decodeValueOfOutermostPacket('F600BC2D8F')).toBe(0); // greater than
    expect(decodeValueOfOutermostPacket('9C005AC2F8F0')).toBe(0); // equal
    expect(decodeValueOfOutermostPacket('9C0141080250320F1802104A08')).toBe(1); // combination
  });

  it('answer', () => {
    expect(decodeValueOfOutermostPacket(puzzleInput)).toBe(1392637195518);
  });
});
