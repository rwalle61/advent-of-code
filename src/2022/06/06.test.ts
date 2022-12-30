import puzzleInput from './puzzleInput';

const isUnique = (array: string | unknown[]): boolean =>
  array.length === new Set(array).size;

const charsUntilMarkerEnd = (buffer: string, markerLength: number): number => {
  for (let i = 0; i < buffer.length - markerLength; i += 1) {
    const potentialMarker = buffer.substring(i, i + markerLength);
    if (isUnique(potentialMarker)) {
      return i + markerLength;
    }
  }

  throw new Error('buffer must have marker');
};

describe('part 1', () => {
  const PACKET_MARKER_LENGTH = 4;

  const charsUntilPacketStart = (buffer: string): number =>
    charsUntilMarkerEnd(buffer, PACKET_MARKER_LENGTH);

  it('examples', () => {
    expect(charsUntilPacketStart('mjqjpqmgbljsphdztnvjfqwrcgsmlb')).toBe(7);
    expect(charsUntilPacketStart('bvwbjplbgvbhsrlpgdmjqwftvncz')).toBe(5);
    expect(charsUntilPacketStart('nppdvjthqldpwncqszvftbrmjlhg')).toBe(6);
    expect(charsUntilPacketStart('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg')).toBe(10);
    expect(charsUntilPacketStart('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw')).toBe(11);
  });

  it('answer', () => {
    expect(charsUntilPacketStart(puzzleInput)).toBe(1912);
  });
});

describe('part 2', () => {
  const MESSAGE_MARKER_LENGTH = 14;

  const charsUntilMessageStart = (buffer: string): number =>
    charsUntilMarkerEnd(buffer, MESSAGE_MARKER_LENGTH);

  it('examples', () => {
    expect(charsUntilMessageStart('mjqjpqmgbljsphdztnvjfqwrcgsmlb')).toBe(19);
    expect(charsUntilMessageStart('bvwbjplbgvbhsrlpgdmjqwftvncz')).toBe(23);
    expect(charsUntilMessageStart('nppdvjthqldpwncqszvftbrmjlhg')).toBe(23);
    expect(charsUntilMessageStart('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg')).toBe(
      29,
    );
    expect(charsUntilMessageStart('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw')).toBe(26);
  });

  it('answer', () => {
    expect(charsUntilMessageStart(puzzleInput)).toBe(2122);
  });
});
