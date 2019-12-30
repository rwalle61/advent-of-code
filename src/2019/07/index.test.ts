import {
  runProgram,
  runAmplifier,
  runAmplifiers,
  findMaxThrusterSignal,
} from '../02';

const puzzleInput = [3, 8, 1001, 8, 10, 8, 105, 1, 0, 0, 21, 38, 55, 80, 97, 118, 199, 280, 361, 442, 99999, 3, 9, 101, 2, 9, 9, 1002, 9, 5, 9, 1001, 9, 4, 9, 4, 9, 99, 3, 9, 101, 5, 9, 9, 102, 2, 9, 9, 1001, 9, 5, 9, 4, 9, 99, 3, 9, 1001, 9, 4, 9, 102, 5, 9, 9, 101, 4, 9, 9, 102, 4, 9, 9, 1001, 9, 4, 9, 4, 9, 99, 3, 9, 1001, 9, 3, 9, 1002, 9, 2, 9, 101, 3, 9, 9, 4, 9, 99, 3, 9, 101, 5, 9, 9, 1002, 9, 2, 9, 101, 3, 9, 9, 1002, 9, 5, 9, 4, 9, 99, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 99, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 99, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 99, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 99, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 99];

describe('day 7', () => {
  describe('part 1', () => {
    describe('runProgram(<initialState>, <inputs>)', () => {
      test('run with multiple inputs', () => {
        const exampleProgram = [3, 0, 3, 2];
        expect(runProgram(exampleProgram, [9, 8]))
          .toMatchObject({
            newState: [9, 0, 8, 2],
            outputs: [undefined, undefined],
          });
      });
      test('run with 3 inputs', () => {
        const exampleProgram = [3, 0, 3, 2, 3, 4];
        expect(runProgram(exampleProgram, [9, 8, 7]))
          .toMatchObject({
            newState: [9, 0, 8, 2, 7, 4],
            outputs: [undefined, undefined, undefined],
          });
      });
      test('run with unused inputs', () => {
        const exampleProgram = [3, 0, 3, 2];
        expect(runProgram(exampleProgram, [9, 8, 7]))
          .toMatchObject({
            newState: [9, 0, 8, 2],
            outputs: [undefined, undefined],
          });
      });
      test('run with input not used immediately', () => {
        const exampleProgram = [4, 0, 3, 2];
        expect(runProgram(exampleProgram, [9]))
          .toMatchObject({
            newState: [4, 0, 9, 2],
            outputs: [4, undefined],
          });
      });
      test('example 1', () => {
        const exampleProgram = [3, 15, 3, 16, 1002, 16, 10, 16, 1, 16, 15, 15, 4, 15, 99, 0, 0];
        expect(runProgram(exampleProgram, [3, 0]))
          .toMatchObject({
            outputs: [
              undefined, undefined, undefined, undefined,
              3,
            ],
          });
      });
    });
    describe('runAmplifier(<program>, <phaseSetting>, <input>)', () => {
      test('example 1', () => {
        const exampleProgram = [3, 15, 3, 16, 1002, 16, 10, 16, 1, 16, 15, 15, 4, 15, 99, 0, 0];
        expect(runAmplifier(exampleProgram, 4, 0))
          .toEqual(4);
      });
      test('puzzle input', () => {
        const exampleProgram = puzzleInput;
        expect(runAmplifier(exampleProgram, 4, 0))
          .toEqual(65);
      });
    });
    describe('runAmplifiers(<program>, <phaseSettingSequence>)', () => {
      test('example 1', () => {
        const exampleProgram = [3, 15, 3, 16, 1002, 16, 10, 16, 1, 16, 15, 15, 4, 15, 99, 0, 0];
        const phaseSettingSequence = [4, 3, 2, 1, 0];
        expect(runAmplifiers(exampleProgram, phaseSettingSequence))
          .toEqual(43210);
      });
      test('example 2', () => {
        const exampleProgram = [3, 23, 3, 24, 1002, 24, 10, 24, 1002, 23, -1, 23, 101, 5, 23, 23, 1, 24, 23, 23, 4, 23, 99, 0, 0];
        const phaseSettingSequence = [0, 1, 2, 3, 4];
        expect(runAmplifiers(exampleProgram, phaseSettingSequence))
          .toEqual(54321);
      });
      test('example 3', () => {
        const exampleProgram = [3, 31, 3, 32, 1002, 32, 10, 32, 1001, 31, -2, 31, 1007, 31, 0, 33, 1002, 33, 7, 33, 1, 33, 31, 31, 1, 32, 31, 31, 4, 31, 99, 0, 0, 0];
        const phaseSettingSequence = [1, 0, 4, 3, 2];
        expect(runAmplifiers(exampleProgram, phaseSettingSequence))
          .toEqual(65210);
      });
      test('puzzle input', () => {
        const exampleProgram = puzzleInput;
        const phaseSettingSequence = [1, 0, 4, 3, 2];
        expect(runAmplifiers(exampleProgram, phaseSettingSequence))
          .toEqual(38480);
      });
    });
    describe('findMaxThrusterSignal(<program>)', () => {
      test('example 1', () => {
        const exampleProgram = [3, 15, 3, 16, 1002, 16, 10, 16, 1, 16, 15, 15, 4, 15, 99, 0, 0];
        expect(findMaxThrusterSignal(exampleProgram))
          .toEqual(43210);
      });
      test('example 2', () => {
        const exampleProgram = [3, 23, 3, 24, 1002, 24, 10, 24, 1002, 23, -1, 23, 101, 5, 23, 23, 1, 24, 23, 23, 4, 23, 99, 0, 0];
        expect(findMaxThrusterSignal(exampleProgram))
          .toEqual(54321);
      });
      test('example 3', () => {
        const exampleProgram = [3, 31, 3, 32, 1002, 32, 10, 32, 1001, 31, -2, 31, 1007, 31, 0, 33, 1002, 33, 7, 33, 1, 33, 31, 31, 1, 32, 31, 31, 4, 31, 99, 0, 0, 0];
        expect(findMaxThrusterSignal(exampleProgram))
          .toEqual(65210);
      });
      test('answer part 1', () => {
        const exampleProgram = puzzleInput;
        expect(findMaxThrusterSignal(exampleProgram))
          .toEqual(46014);
      });
    });
  });
  describe('part 2', () => {
  });
});
