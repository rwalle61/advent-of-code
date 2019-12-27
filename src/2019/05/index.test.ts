import {
  getNumInstructionValues,
  parseFirstNumber,
  runInstruction,
  runProgram,
  runProgramFromStateStringWithInput,
} from '../02';

const exampleProgram1 = [1002, 4, 3, 4, 33];
const exampleProgram2 = [1101, 100, -1, 4, 0];
const exampleProgram3 = [3, 0, 4, 0, 99];
const puzzleInput = '3,225,1,225,6,6,1100,1,238,225,104,0,101,14,135,224,101,-69,224,224,4,224,1002,223,8,223,101,3,224,224,1,224,223,223,102,90,169,224,1001,224,-4590,224,4,224,1002,223,8,223,1001,224,1,224,1,224,223,223,1102,90,45,224,1001,224,-4050,224,4,224,102,8,223,223,101,5,224,224,1,224,223,223,1001,144,32,224,101,-72,224,224,4,224,102,8,223,223,101,3,224,224,1,223,224,223,1102,36,93,225,1101,88,52,225,1002,102,38,224,101,-3534,224,224,4,224,102,8,223,223,101,4,224,224,1,223,224,223,1102,15,57,225,1102,55,49,225,1102,11,33,225,1101,56,40,225,1,131,105,224,101,-103,224,224,4,224,102,8,223,223,1001,224,2,224,1,224,223,223,1102,51,39,225,1101,45,90,225,2,173,139,224,101,-495,224,224,4,224,1002,223,8,223,1001,224,5,224,1,223,224,223,1101,68,86,224,1001,224,-154,224,4,224,102,8,223,223,1001,224,1,224,1,224,223,223,4,223,99,0,0,0,677,0,0,0,0,0,0,0,0,0,0,0,1105,0,99999,1105,227,247,1105,1,99999,1005,227,99999,1005,0,256,1105,1,99999,1106,227,99999,1106,0,265,1105,1,99999,1006,0,99999,1006,227,274,1105,1,99999,1105,1,280,1105,1,99999,1,225,225,225,1101,294,0,0,105,1,0,1105,1,99999,1106,0,300,1105,1,99999,1,225,225,225,1101,314,0,0,106,0,0,1105,1,99999,108,226,677,224,1002,223,2,223,1006,224,329,1001,223,1,223,1007,226,226,224,1002,223,2,223,1006,224,344,101,1,223,223,1008,226,226,224,102,2,223,223,1006,224,359,1001,223,1,223,107,226,677,224,1002,223,2,223,1005,224,374,101,1,223,223,1107,677,226,224,102,2,223,223,1006,224,389,101,1,223,223,108,677,677,224,102,2,223,223,1006,224,404,1001,223,1,223,1108,677,226,224,102,2,223,223,1005,224,419,101,1,223,223,1007,677,226,224,1002,223,2,223,1006,224,434,101,1,223,223,1107,226,226,224,1002,223,2,223,1006,224,449,101,1,223,223,8,677,226,224,102,2,223,223,1006,224,464,1001,223,1,223,1107,226,677,224,102,2,223,223,1005,224,479,1001,223,1,223,1007,677,677,224,102,2,223,223,1005,224,494,1001,223,1,223,1108,677,677,224,102,2,223,223,1006,224,509,101,1,223,223,1008,677,677,224,102,2,223,223,1005,224,524,1001,223,1,223,107,226,226,224,1002,223,2,223,1005,224,539,101,1,223,223,7,226,226,224,102,2,223,223,1005,224,554,101,1,223,223,1108,226,677,224,1002,223,2,223,1006,224,569,1001,223,1,223,107,677,677,224,102,2,223,223,1005,224,584,101,1,223,223,7,677,226,224,1002,223,2,223,1005,224,599,101,1,223,223,108,226,226,224,1002,223,2,223,1005,224,614,101,1,223,223,1008,677,226,224,1002,223,2,223,1005,224,629,1001,223,1,223,7,226,677,224,102,2,223,223,1005,224,644,101,1,223,223,8,677,677,224,102,2,223,223,1005,224,659,1001,223,1,223,8,226,677,224,102,2,223,223,1006,224,674,1001,223,1,223,4,223,99,226';

describe('day 5', () => {
  describe('part 1', () => {
    test('getNumInstructionValues(initialState, instructionPointer)', () => {
      expect(getNumInstructionValues([99], 0))
        .toStrictEqual(0);
      expect(getNumInstructionValues([1, 0, 0, 0, 99], 0))
        .toStrictEqual(4);
      expect(getNumInstructionValues([2, 0, 0, 0, 99], 0))
        .toStrictEqual(4);
      expect(getNumInstructionValues([3, 0, 99], 0))
        .toStrictEqual(2);
      expect(getNumInstructionValues([4, 0, 99], 0))
        .toStrictEqual(2);
      expect(getNumInstructionValues([4, 0, 4, 0, 99], 0))
        .toStrictEqual(2);
      expect(getNumInstructionValues([4, 0, 4, 0, 99], 2))
        .toStrictEqual(2);
    });
    test('parseFirstNumber(number)', () => {
      expect(parseFirstNumber(3))
        .toStrictEqual({
          opcode: 3,
          parameterModes: [0, 0, 0],
        });
      expect(parseFirstNumber(99))
        .toStrictEqual({
          opcode: 99,
          parameterModes: [0, 0, 0],
        });
      expect(parseFirstNumber(103))
        .toStrictEqual({
          opcode: 3,
          parameterModes: [1, 0, 0],
        });
      expect(parseFirstNumber(1003))
        .toStrictEqual({
          opcode: 3,
          parameterModes: [0, 1, 0],
        });
      expect(parseFirstNumber(10003))
        .toStrictEqual({
          opcode: 3,
          parameterModes: [0, 0, 1],
        });
    });
    describe('runInstruction(<initialState>, <instructionPointer>, <inputValue>)', () => {
      describe('test opcode 3 (input) and 4 (output)', () => {
        test('opcode 3', () => {
          expect(runInstruction([3, 0], 0, 0))
            .toStrictEqual({
              newState: [0, 0],
              output: undefined,
            });
          expect(runInstruction([3, 0], 0, 5))
            .toStrictEqual({
              newState: [5, 0],
              output: undefined,
            });
          expect(runInstruction([3, 1], 0, 5))
            .toStrictEqual({
              newState: [3, 5],
              output: undefined,
            });
          expect(runInstruction(exampleProgram3, 0, 0))
            .toStrictEqual({
              newState: [0, 0, 4, 0, 99],
              output: undefined,
            });
        });
        test('opcode 4', () => {
          expect(runInstruction([4, 0], 0))
            .toStrictEqual({
              newState: [4, 0],
              output: 4,
            });
          expect(runInstruction([5, 0, 4, 0, 99], 2))
            .toStrictEqual({
              newState: [5, 0, 4, 0, 99],
              output: 5,
            });
        });
      });
      describe('test parameter modes', () => {
        test('example 1', () => {
          expect(runInstruction(exampleProgram1, 0))
            .toStrictEqual({
              newState: [1002, 4, 3, 4, 99],
              output: undefined,
            });
        });
        test('example 2', () => {
          expect(runInstruction(exampleProgram2, 0))
            .toStrictEqual({
              newState: [1101, 100, -1, 4, 99],
              output: undefined,
            });
        });
        test('my example: extend example 1', () => {
          expect(runInstruction([1002, 4, 3, 3, 99], 0))
            .toStrictEqual({
              newState: [1002, 4, 3, 297, 99],
              output: undefined,
            });
        });
      });
    });
    describe('runProgram(<initialState>)', () => {
      test('numInstructionValues < 4', () => {
        expect(runProgram([3, 0, 99], 1))
          .toStrictEqual({
            newState: [1, 0, 99],
            outputs: [undefined],
          });
      });
      test('1 output', () => {
        expect(runProgram([4, 0, 99]))
          .toStrictEqual({
            newState: [4, 0, 99],
            outputs: [4],
          });
      });
      test('multiple outputs', () => {
        expect(runProgram([4, 0, 4, 0, 99]))
          .toStrictEqual({
            newState: [4, 0, 4, 0, 99],
            outputs: [4, 4],
          });
      });
      test('example 1', () => {
        expect(runProgram(exampleProgram1))
          .toStrictEqual({
            newState: [1002, 4, 3, 4, 99],
            outputs: [undefined],
          });
      });
      test('example 2', () => {
        expect(runProgram(exampleProgram2))
          .toStrictEqual({
            newState: [1101, 100, -1, 4, 99],
            outputs: [undefined],
          });
      });
      test('opcodes 3 & 4 together', () => {
        expect(runProgram(exampleProgram3, 0))
          .toStrictEqual({
            newState: [0, 0, 4, 0, 99],
            outputs: [undefined, 0],
          });
        expect(runProgram(exampleProgram3, 5))
          .toStrictEqual({
            newState: [5, 0, 4, 0, 99],
            outputs: [undefined, 5],
          });
      });
    });
    // TODO: write tests to extract output of each puzzle test and diagnostic code
    describe('runProgramFromStateStringWithInput(<initialState>, <inputNumber>)', () => {
      test('example 1', () => {
        const input = 1;
        expect(runProgramFromStateStringWithInput('3,0,4,0,99', input))
          .toStrictEqual({
            newState: [input, 0, 4, 0, 99],
            outputs: [undefined, input],
          });
      });
      test('variant of example 1', () => {
        const input = 5;
        expect(runProgramFromStateStringWithInput('3,0,4,0,99', input))
          .toStrictEqual({
            newState: [input, 0, 4, 0, 99],
            outputs: [undefined, input],
          });
      });
      test('answer', () => {
        expect(runProgramFromStateStringWithInput(puzzleInput, 1))
          .toStrictEqual({
            newState: [
              3, 225, 1, 225, 6, 6, 1101, 1, 238, 225, 104, 0, 101, 14, 135, 224, 101, -69, 224, 224, 4, 224, 1002, 223, 8, 223, 101, 3, 224, 224, 1, 224, 223, 223, 102, 90, 169, 224, 1001, 224, -4590, 224, 4, 224, 1002, 223, 8, 223, 1001, 224, 1, 224, 1, 224, 223, 223, 1102, 90, 45, 224, 1001, 224, -4050, 224, 4, 224, 102, 8, 223, 223, 101, 5, 224, 224, 1, 224, 223, 223, 1001, 144, 32, 224, 101, -72, 224, 224, 4, 224, 102, 8, 223, 223, 101, 3, 224, 224, 1, 223, 224, 223, 1102, 36, 93, 225, 1101, 88, 52, 225, 1002, 102, 38, 224, 101, -3534, 224, 224, 4, 224, 102, 8, 223, 223, 101, 4, 224, 224, 1, 223, 224, 223, 1102, 15, 57, 225, 1102, 55, 49, 225, 1102, 11, 33, 225, 1101, 56, 40, 225, 1, 131, 105, 224, 101, -103, 224, 224, 4, 224, 102, 8, 223, 223, 1001, 224, 2, 224, 1, 224, 223, 223, 1102, 51, 39, 225, 1101, 45, 90, 225, 2, 173, 139, 224, 101, -495, 224, 224, 4, 224, 1002, 223, 8, 223, 1001, 224, 5, 224, 1, 223, 224, 223, 1101, 68, 86, 224, 1001, 224, -154, 224, 4, 224, 102, 8, 223, 223, 1001, 224, 1, 224, 1, 224, 223, 223, 4, 223, 99, 6731945, 1, 135, 677, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1105, 0, 99999, 1105, 227, 247, 1105, 1, 99999, 1005, 227, 99999, 1005, 0, 256, 1105, 1, 99999, 1106, 227, 99999, 1106, 0, 265, 1105, 1, 99999, 1006, 0, 99999, 1006, 227, 274, 1105, 1, 99999, 1105, 1, 280, 1105, 1, 99999, 1, 225, 225, 225, 1101, 294, 0, 0, 105, 1, 0, 1105, 1, 99999, 1106, 0, 300, 1105, 1, 99999, 1, 225, 225, 225, 1101, 314, 0, 0, 106, 0, 0, 1105, 1, 99999, 108, 226, 677, 224, 1002, 223, 2, 223, 1006, 224, 329, 1001, 223, 1, 223, 1007, 226, 226, 224, 1002, 223, 2, 223, 1006, 224, 344, 101, 1, 223, 223, 1008, 226, 226, 224, 102, 2, 223, 223, 1006, 224, 359, 1001, 223, 1, 223, 107, 226, 677, 224, 1002, 223, 2, 223, 1005, 224, 374, 101, 1, 223, 223, 1107, 677, 226, 224, 102, 2, 223, 223, 1006, 224, 389, 101, 1, 223, 223, 108, 677, 677, 224, 102, 2, 223, 223, 1006, 224, 404, 1001, 223, 1, 223, 1108, 677, 226, 224, 102, 2, 223, 223, 1005, 224, 419, 101, 1, 223, 223, 1007, 677, 226, 224, 1002, 223, 2, 223, 1006, 224, 434, 101, 1, 223, 223, 1107, 226, 226, 224, 1002, 223, 2, 223, 1006, 224, 449, 101, 1, 223, 223, 8, 677, 226, 224, 102, 2, 223, 223, 1006, 224, 464, 1001, 223, 1, 223, 1107, 226, 677, 224, 102, 2, 223, 223, 1005, 224, 479, 1001, 223, 1, 223, 1007, 677, 677, 224, 102, 2, 223, 223, 1005, 224, 494, 1001, 223, 1, 223, 1108, 677, 677, 224, 102, 2, 223, 223, 1006, 224, 509, 101, 1, 223, 223, 1008, 677, 677, 224, 102, 2, 223, 223, 1005, 224, 524, 1001, 223, 1, 223, 107, 226, 226, 224, 1002, 223, 2, 223, 1005, 224, 539, 101, 1, 223, 223, 7, 226, 226, 224, 102, 2, 223, 223, 1005, 224, 554, 101, 1, 223, 223, 1108, 226, 677, 224, 1002, 223, 2, 223, 1006, 224, 569, 1001, 223, 1, 223, 107, 677, 677, 224, 102, 2, 223, 223, 1005, 224, 584, 101, 1, 223, 223, 7, 677, 226, 224, 1002, 223, 2, 223, 1005, 224, 599, 101, 1, 223, 223, 108, 226, 226, 224, 1002, 223, 2, 223, 1005, 224, 614, 101, 1, 223, 223, 1008, 677, 226, 224, 1002, 223, 2, 223, 1005, 224, 629, 1001, 223, 1, 223, 7, 226, 677, 224, 102, 2, 223, 223, 1005, 224, 644, 101, 1, 223, 223, 8, 677, 677, 224, 102, 2, 223, 223, 1005, 224, 659, 1001, 223, 1, 223, 8, 226, 677, 224, 102, 2, 223, 223, 1006, 224, 674, 1001, 223, 1, 223, 4, 223, 99, 226, // eslint-disable-line max-len
            ],
            outputs: [
              undefined, undefined, undefined, 0, undefined, undefined, 0, undefined, undefined, undefined, undefined, undefined, 0, undefined, undefined, undefined, undefined, undefined, 0, undefined, undefined, undefined, undefined, undefined, 0, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 0, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 0, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 0, undefined, undefined, undefined, undefined, undefined, 0, undefined, undefined, undefined, // eslint-disable-line max-len
              6731945, undefined,
            ],
          });
      });
    });
  });
  describe('part 2', () => {
  });
});
