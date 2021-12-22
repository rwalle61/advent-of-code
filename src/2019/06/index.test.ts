import { resolve } from 'path';

import {
  parseOrbitMap,
  countOrbits,
  countOrbitalTransfers,
} from '.';

const pathToDay6Dir = resolve('src', '2019', '06');

describe('day 6', () => {
  describe('input file parser', () => {
    describe('parseOrbitMap(<filePath>)', () => {
      test('part1ExampleInput', () => {
        const filepath = resolve(pathToDay6Dir, 'part1ExampleInput.txt');
        expect(parseOrbitMap(filepath)).toStrictEqual(
          [
            ['COM', 'B'],
            ['B', 'C'],
            ['C', 'D'],
            ['D', 'E'],
            ['E', 'F'],
            ['B', 'G'],
            ['G', 'H'],
            ['D', 'I'],
            ['E', 'J'],
            ['J', 'K'],
            ['K', 'L'],
          ],
        );
      });
    });
  });
  describe('part 1', () => {
    describe('countOrbits(<orbitMap>)', () => {
      test('simplest map: 1 orbit', () => {
        const orbitMap = [['COM', 'B']];
        expect(countOrbits(orbitMap)).toBe(1);
      });
      test('indirect orbit', () => {
        const orbitMap = [
          ['COM', 'B'],
          ['B', 'C'],
        ];
        expect(countOrbits(orbitMap)).toBe(3);
      });
      test('fork', () => {
        const orbitMap = [
          ['COM', 'B'],
          ['COM', 'C'],
        ];
        expect(countOrbits(orbitMap)).toBe(2);
      });
      test('indirect orbit with fork', () => {
        const orbitMap = [
          ['COM', 'B'],
          ['COM', 'C'],
          ['C', 'D'],
        ];
        expect(countOrbits(orbitMap)).toBe(4);
      });
      test('orbitMap where COM orbit is not listed first', () => {
        const orbitMap = [
          ['B', 'C'],
          ['COM', 'B'],
        ];
        expect(countOrbits(orbitMap)).toBe(3);
      });
      test('part1ExampleInput', () => {
        const filepath = resolve(pathToDay6Dir, 'part1ExampleInput.txt');
        const orbitMap = parseOrbitMap(filepath);
        expect(countOrbits(orbitMap)).toBe(42);
      });
      test('answer part 1', () => {
        const filepath = resolve(pathToDay6Dir, 'puzzleInput.txt');
        const orbitMap = parseOrbitMap(filepath);
        expect(countOrbits(orbitMap)).toBe(200001);
      });
    });
  });
  describe('part 2', () => {
    describe('countOrbitalTransfers(<orbitMap>)', () => {
      test('1 orbital transfer after you', () => {
        const orbitMap = [
          ['COM', 'YOU'],
          ['YOU', 'SAN'],
        ];
        expect(countOrbitalTransfers(orbitMap)).toBe(1);
      });
      test('2 orbital transfers after you', () => {
        const orbitMap = [
          ['COM', 'YOU'],
          ['YOU', 'B'],
          ['B', 'SAN'],
        ];
        expect(countOrbitalTransfers(orbitMap)).toBe(2);
      });
      test('1 orbital transfer before you', () => {
        const orbitMap = [
          ['COM', 'SAN'],
          ['SAN', 'YOU'],
        ];
        expect(countOrbitalTransfers(orbitMap)).toBe(1);
      });
      test('orbital transfers to another fork', () => {
        const orbitMap = [
          ['COM', 'B'],
          ['B', 'YOU'],
          ['COM', 'C'],
          ['C', 'SAN'],
        ];
        expect(countOrbitalTransfers(orbitMap)).toBe(2);
      });
      test('part2ExampleInput', () => {
        const filepath = resolve(pathToDay6Dir, 'part2ExampleInput.txt');
        const orbitMap = parseOrbitMap(filepath);
        expect(countOrbitalTransfers(orbitMap)).toBe(4);
      });
      test('answer part 2', () => {
        const filepath = resolve(pathToDay6Dir, 'puzzleInput.txt');
        const orbitMap = parseOrbitMap(filepath);
        expect(countOrbitalTransfers(orbitMap)).toBe(379);
      });
    });
  });
});
