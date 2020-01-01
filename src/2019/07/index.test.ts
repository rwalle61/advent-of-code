import {
  runProgram,
  runAmp,
  runAmps,
  findMaxThrusterSignal,
  runAmpInFeedbackMode,
  runAmpsInFeedbackMode,
  findMaxThrusterSignalInFeedbackMode,
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
    describe('runAmp(<program>, <phaseSetting>, <input>)', () => {
      test('example 1', () => {
        const exampleProgram = [3, 15, 3, 16, 1002, 16, 10, 16, 1, 16, 15, 15, 4, 15, 99, 0, 0];
        expect(runAmp(exampleProgram, 4, 0))
          .toEqual(4);
      });
      test('puzzle input', () => {
        const exampleProgram = puzzleInput;
        expect(runAmp(exampleProgram, 4, 0))
          .toEqual(65);
      });
    });
    describe('runAmps(<program>, <phaseSettingSequence>)', () => {
      test('example 1', () => {
        const exampleProgram = [3, 15, 3, 16, 1002, 16, 10, 16, 1, 16, 15, 15, 4, 15, 99, 0, 0];
        const phaseSettingSequence = [4, 3, 2, 1, 0];
        expect(runAmps(exampleProgram, phaseSettingSequence))
          .toEqual(43210);
      });
      test('example 2', () => {
        const exampleProgram = [3, 23, 3, 24, 1002, 24, 10, 24, 1002, 23, -1, 23, 101, 5, 23, 23, 1, 24, 23, 23, 4, 23, 99, 0, 0];
        const phaseSettingSequence = [0, 1, 2, 3, 4];
        expect(runAmps(exampleProgram, phaseSettingSequence))
          .toEqual(54321);
      });
      test('example 3', () => {
        const exampleProgram = [3, 31, 3, 32, 1002, 32, 10, 32, 1001, 31, -2, 31, 1007, 31, 0, 33, 1002, 33, 7, 33, 1, 33, 31, 31, 1, 32, 31, 31, 4, 31, 99, 0, 0, 0];
        const phaseSettingSequence = [1, 0, 4, 3, 2];
        expect(runAmps(exampleProgram, phaseSettingSequence))
          .toEqual(65210);
      });
      test('puzzle input', () => {
        const exampleProgram = puzzleInput;
        const phaseSettingSequence = [1, 0, 4, 3, 2];
        expect(runAmps(exampleProgram, phaseSettingSequence))
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
    describe('runProgram(<initialState>, <inputs>)', () => {
      test('pause when out of inputs', () => {
        const exampleProgram = [
          3, 0,
          3, 2,
          4, 0,
        ];
        expect(runProgram(exampleProgram, [9]))
          .toMatchObject({
            newState: [9, 0, 3, 2, 4, 0],
            outputs: [undefined],
            instructionPointer: 2,
          });
      });
      test('pause when out of inputs: part 2 example 1', () => {
        const exampleProgram = [3, 26, 1001, 26, -4, 26, 3, 27, 1002, 27, 2, 27, 1, 27, 26, 27, 4, 27, 1001, 28, -1, 28, 1005, 28, 6, 99, 0, 0, 5];

        expect(runProgram(exampleProgram, [9, 0]))
          .toMatchObject({
            newState: [3, 26, 1001, 26, -4, 26, 3, 27, 1002, 27, 2, 27, 1, 27, 26, 27, 4, 27, 1001, 28, -1, 28, 1005, 28, 6, 99, 5, 5, 4],
            outputs: [
              undefined, undefined, undefined, undefined, undefined,
              5,
              undefined, undefined,
            ],
            instructionPointer: 6,
          });
      });
      test('pause when out of inputs: part 2 example 2', () => {
        const exampleProgram = [3, 52, 1001, 52, -5, 52, 3, 53, 1, 52, 56, 54, 1007, 54, 5, 55, 1005, 55, 26, 1001, 54, -5, 54, 1105, 1, 12, 1, 53, 54, 53, 1008, 54, 0, 55, 1001, 55, 1, 55, 2, 53, 55, 53, 4, 53, 1001, 56, -1, 56, 1005, 56, 6, 99, 0, 0, 0, 0, 10];
        expect(runProgram(exampleProgram, [9, 0]))
          .toMatchObject({
            newState: [3, 52, 1001, 52, -5, 52, 3, 53, 1, 52, 56, 54, 1007, 54, 5, 55, 1005, 55, 26, 1001, 54, -5, 54, 1105, 1, 12, 1, 53, 54, 53, 1008, 54, 0, 55, 1001, 55, 1, 55, 2, 53, 55, 53, 4, 53, 1001, 56, -1, 56, 1005, 56, 6, 99, 4, 4, 4, 1, 9],
            outputs: [
              undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
              4,
              undefined, undefined,
            ],
            instructionPointer: 6,
          });
      });
    });
    describe('runAmpInFeedbackMode(<program>, <phaseSetting>, <inputSignal>, <instructionPointerAddress>)', () => {
      test('part 2 example 1', () => {
        const exampleProgram = [3, 26, 1001, 26, -4, 26, 3, 27, 1002, 27, 2, 27, 1, 27, 26, 27, 4, 27, 1001, 28, -1, 28, 1005, 28, 6, 99, 0, 0, 5];
        expect(runAmpInFeedbackMode(exampleProgram, 9, 0, 0))
          .toMatchObject({
            outputSignal: 5,
          });
      });
    });
    describe('runAmpsInFeedbackMode(<program>, <phaseSettingSequence>)', () => {
      test('part 2 example 1', () => {
        const exampleProgram = [
          3, 26,
          1001, 26, -4, 26,
          3, 27,
          1002, 27, 2, 27,
          1, 27, 26, 27,
          4, 27,
          1001, 28, -1, 28,
          1005, 28, 6,
          99,
          0, 0, 5,
        ];
        const phaseSettingSequence = [9, 8, 7, 6, 5];
        expect(runAmpsInFeedbackMode(exampleProgram, phaseSettingSequence))
          .toEqual(139629729);
      });
      test('part 2 example 2', () => {
        const exampleProgram = [
          3, 52,
          1001, 52, -5, 52,
          3, 53,
          1, 52, 56, 54,
          1007, 54, 5, 55,
          1005, 55, 26,
          1001, 54, -5, 54,
          1105, 1, 12,
          1, 53, 54, 53,
          1008, 54, 0, 55,
          1001, 55, 1, 55,
          2, 53, 55, 53,
          4, 53,
          1001, 56, -1, 56,
          1005, 56, 6,
          99,
          0, 0, 0, 0, 10,
        ];
        const phaseSettingSequence = [9, 7, 8, 5, 6];
        expect(runAmpsInFeedbackMode(exampleProgram, phaseSettingSequence))
          .toEqual(18216);
      });
    });
    describe('findMaxThrusterSignalInFeedbackMode(<program>)', () => {
      test('program with no output', () => {
        const exampleProgram = [4, 0];
        expect(findMaxThrusterSignalInFeedbackMode(exampleProgram))
          .toMatchObject({
            maxThrusterSignal: 4,
            phaseSettingSequenceGeneratingMaxSignal: [5, 6, 7, 8, 9],
          });
      });
      test('part 2 example 1', () => {
        const exampleProgram = [3, 26, 1001, 26, -4, 26, 3, 27, 1002, 27, 2, 27, 1, 27, 26, 27, 4, 27, 1001, 28, -1, 28, 1005, 28, 6, 99, 0, 0, 5];
        expect(findMaxThrusterSignalInFeedbackMode(exampleProgram))
          .toMatchObject({
            maxThrusterSignal: 139629729,
            phaseSettingSequenceGeneratingMaxSignal: [9, 8, 7, 6, 5],
          });
      });
      test('part 2 example 2', () => {
        const exampleProgram = [3, 52, 1001, 52, -5, 52, 3, 53, 1, 52, 56, 54, 1007, 54, 5, 55, 1005, 55, 26, 1001, 54, -5, 54, 1105, 1, 12, 1, 53, 54, 53, 1008, 54, 0, 55, 1001, 55, 1, 55, 2, 53, 55, 53, 4, 53, 1001, 56, -1, 56, 1005, 56, 6, 99, 0, 0, 0, 0, 10];
        expect(findMaxThrusterSignalInFeedbackMode(exampleProgram))
          .toMatchObject({
            maxThrusterSignal: 18216,
            phaseSettingSequenceGeneratingMaxSignal: [9, 7, 8, 5, 6],
          });
      });
      test('answer', () => {
        expect(findMaxThrusterSignalInFeedbackMode(puzzleInput))
          .toMatchObject({
            maxThrusterSignal: 19581200,
            phaseSettingSequenceGeneratingMaxSignal: [8, 9, 5, 6, 7],
          });
      });
    });
  });
});
