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
      describe('test opcodes', () => {
        test('opcode 3 (input)', () => {
          expect(runInstruction([3, 0], 0, 0))
            .toMatchObject({
              newState: [0, 0],
              output: undefined,
            });
          expect(runInstruction([3, 0], 0, 5))
            .toMatchObject({
              newState: [5, 0],
              output: undefined,
            });
          expect(runInstruction([3, 1], 0, 5))
            .toMatchObject({
              newState: [3, 5],
              output: undefined,
            });
          expect(runInstruction(exampleProgram3, 0, 0))
            .toMatchObject({
              newState: [0, 0, 4, 0, 99],
              output: undefined,
            });
        });
        test('opcode 4 (output)', () => {
          expect(runInstruction([4, 0], 0))
            .toMatchObject({
              newState: [4, 0],
              output: 4,
            });
          expect(runInstruction([5, 0, 4, 0, 99], 2))
            .toMatchObject({
              newState: [5, 0, 4, 0, 99],
              output: 5,
            });
        });
        describe('opcode 5 (jump-if-true)', () => {
          test('param mode \'Position\': if param1 != 0, set the instruction pointer to the value from param2', () => {
            const instruction = [5, 0, 3, 99, 0];
            expect(runInstruction(instruction, 0))
              .toMatchObject({
                newState: instruction,
                output: undefined,
                newInstructionPointerAddress: 99,
              });
          });
          test('param mode \'Position\': otherwise (param1 == 0), do nothing', () => {
            const instruction = [5, 4, 3, 99, 0];
            expect(runInstruction(instruction, 0))
              .toMatchObject({
                newState: instruction,
                output: undefined,
                newInstructionPointerAddress: 3,
              });
          });
          test('param mode \'Immediate\': if param1 != 0, set the instruction pointer to the value from param2', () => {
            const instruction = [1105, 1, 42];
            expect(runInstruction(instruction, 0))
              .toMatchObject({
                newState: instruction,
                output: undefined,
                newInstructionPointerAddress: 42,
              });
          });
          test('param mode \'Immediate\': otherwise (param1 == 0), do nothing', () => {
            const instruction = [1105, 0, 42];
            expect(runInstruction(instruction, 0))
              .toMatchObject({
                newState: instruction,
                output: undefined,
                newInstructionPointerAddress: 3,
              });
          });
        });
        describe('opcode 6 (jump-if-false)', () => {
          test('param mode \'Position\': if param1 == 0, set the instruction pointer to the value from param2', () => {
            const instruction = [6, 4, 3, 99, 0];
            expect(runInstruction(instruction, 0))
              .toMatchObject({
                newState: instruction,
                output: undefined,
                newInstructionPointerAddress: 99,
              });
          });
          test('param mode \'Position\': otherwise (param1 != 0), do nothing', () => {
            const instruction = [6, 0, 3, 99, 0];
            expect(runInstruction(instruction, 0))
              .toMatchObject({
                newState: instruction,
                output: undefined,
                newInstructionPointerAddress: 3,
              });
          });
          test('param mode \'Immediate\': if param1 == 0, set the instruction pointer to the value from param2', () => {
            const instruction = [1106, 0, 42];
            expect(runInstruction(instruction, 0))
              .toMatchObject({
                newState: instruction,
                output: undefined,
                newInstructionPointerAddress: 42,
              });
          });
          test('param mode \'Immediate\': otherwise (param1 != 0), do nothing', () => {
            const instruction = [1106, 1, 42];
            expect(runInstruction(instruction, 0))
              .toMatchObject({
                newState: instruction,
                output: undefined,
                newInstructionPointerAddress: 3,
              });
          });
        });
        describe('opcode 7 (less than)', () => {
          test('param mode \'Position\': if param1 < param2, it stores 1 in the position given by param3', () => {
            expect(runInstruction([7, 1, 0, 0], 0))
              .toMatchObject({
                newState: [1, 1, 0, 0],
                output: undefined,
                newInstructionPointerAddress: 4,
              });
          });
          test('param mode \'Position\': otherwise (param1 >= param2), it stores 0.', () => {
            expect(runInstruction([7, 0, 1, 0], 0))
              .toMatchObject({
                newState: [0, 0, 1, 0],
                output: undefined,
                newInstructionPointerAddress: 4,
              });
          });
          test('param mode \'Immediate\': if param1 < param2, it stores 1 in the position given by param3', () => {
            expect(runInstruction([11107, 0, 1, 3], 0))
              .toMatchObject({
                newState: [11107, 0, 1, 1],
                output: undefined,
                newInstructionPointerAddress: 4,
              });
          });
          test('param mode \'Immediate\': otherwise (param1 >= param2), it stores 0.', () => {
            expect(runInstruction([11107, 0, 0, 3], 0))
              .toMatchObject({
                newState: [11107, 0, 0, 0],
                output: undefined,
                newInstructionPointerAddress: 4,
              });
          });
        });
        describe('opcode 8 (equals)', () => {
          test('param mode \'Position\': if param1 == param2, it stores 1 in the position given by param3', () => {
            expect(runInstruction([8, 0, 0, 0], 0))
              .toMatchObject({
                newState: [1, 0, 0, 0],
                output: undefined,
                newInstructionPointerAddress: 4,
              });
          });
          test('param mode \'Position\': otherwise (param1 != param2), it stores 0.', () => {
            expect(runInstruction([8, 0, 1, 0], 0))
              .toMatchObject({
                newState: [0, 0, 1, 0],
                output: undefined,
                newInstructionPointerAddress: 4,
              });
          });
          test('param mode \'Immediate\': if param1 == param2, it stores 1 in the position given by param3', () => {
            expect(runInstruction([11108, 0, 0, 3], 0))
              .toMatchObject({
                newState: [11108, 0, 0, 1],
                output: undefined,
                newInstructionPointerAddress: 4,
              });
          });
          test('param mode \'Immediate\': otherwise (param1 != param2), it stores 0.', () => {
            expect(runInstruction([11108, 0, 1, 3], 0))
              .toMatchObject({
                newState: [11108, 0, 1, 0],
                output: undefined,
                newInstructionPointerAddress: 4,
              });
          });
        });
      });
      describe('test param modes', () => {
        test('example 1', () => {
          expect(runInstruction(exampleProgram1, 0))
            .toMatchObject({
              newState: [1002, 4, 3, 4, 99],
              output: undefined,
            });
        });
        test('example 2', () => {
          expect(runInstruction(exampleProgram2, 0))
            .toMatchObject({
              newState: [1101, 100, -1, 4, 99],
              output: undefined,
            });
        });
        test('my example: extend example 1', () => {
          expect(runInstruction([1002, 4, 3, 3, 99], 0))
            .toMatchObject({
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
      describe('part 2 examples for opcodes 7 & 8: programs that take one input, compare it to the value 8, and then produce one output', () => {
        describe('Using position mode, consider whether the input is equal to 8', () => {
          const exampleProgram = [3, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8];
          test('output 1 (if it is)', () => {
            expect(runProgram(exampleProgram, 8))
              .toStrictEqual({
                newState: [3, 9, 8, 9, 10, 9, 4, 9, 99, 1, 8],
                outputs: [undefined, undefined, 1],
              });
          });
          test('output 0 (if it is not)', () => {
            expect(runProgram(exampleProgram, 7))
              .toStrictEqual({
                newState: [3, 9, 8, 9, 10, 9, 4, 9, 99, 0, 8],
                outputs: [undefined, undefined, 0],
              });
            expect(runProgram(exampleProgram, 9))
              .toStrictEqual({
                newState: [3, 9, 8, 9, 10, 9, 4, 9, 99, 0, 8],
                outputs: [undefined, undefined, 0],
              });
          });
        });
        describe('Using position mode, consider whether the input is less than 8', () => {
          const exampleProgram = [3, 9, 7, 9, 10, 9, 4, 9, 99, -1, 8];
          test('output 1 (if it is)', () => {
            expect(runProgram(exampleProgram, 7))
              .toStrictEqual({
                newState: [3, 9, 7, 9, 10, 9, 4, 9, 99, 1, 8],
                outputs: [undefined, undefined, 1],
              });
          });
          test('output 0 (if it is not)', () => {
            expect(runProgram(exampleProgram, 8))
              .toStrictEqual({
                newState: [3, 9, 7, 9, 10, 9, 4, 9, 99, 0, 8],
                outputs: [undefined, undefined, 0],
              });
          });
        });
        describe('Using immediate mode, consider whether the input is equal to 8', () => {
          const exampleProgram = [3, 3, 1108, -1, 8, 3, 4, 3, 99];
          test('output 1 (if it is)', () => {
            expect(runProgram(exampleProgram, 8))
              .toStrictEqual({
                newState: [3, 3, 1108, 1, 8, 3, 4, 3, 99],
                outputs: [undefined, undefined, 1],
              });
          });
          test('output 0 (if it is not)', () => {
            expect(runProgram(exampleProgram, 7))
              .toStrictEqual({
                newState: [3, 3, 1108, 0, 8, 3, 4, 3, 99],
                outputs: [undefined, undefined, 0],
              });
            expect(runProgram(exampleProgram, 9))
              .toStrictEqual({
                newState: [3, 3, 1108, 0, 8, 3, 4, 3, 99],
                outputs: [undefined, undefined, 0],
              });
          });
        });
        describe('Using immediate mode, consider whether the input is less than 8', () => {
          const exampleProgram = [3, 3, 1107, -1, 8, 3, 4, 3, 99];
          test('output 1 (if it is)', () => {
            expect(runProgram(exampleProgram, 7))
              .toStrictEqual({
                newState: [3, 3, 1107, 1, 8, 3, 4, 3, 99],
                outputs: [undefined, undefined, 1],
              });
          });
          test('output 0 (if it is not)', () => {
            expect(runProgram(exampleProgram, 8))
              .toStrictEqual({
                newState: [3, 3, 1107, 0, 8, 3, 4, 3, 99],
                outputs: [undefined, undefined, 0],
              });
          });
        });
      });
      describe('part 2 example for opcode 6 (jump-if-false)', () => {
        describe('Using position mode, take an input', () => {
          const exampleProgram = [3, 12, 6, 12, 15, 1, 13, 14, 13, 4, 13, 99, -1, 0, 1, 9];
          test('output 0 if the input == 0', () => {
            const input = 0;
            const expectedOutput = 0;
            expect(runProgram(exampleProgram, input))
              .toStrictEqual({
                newState: [3, 12, 6, 12, 15, 1, 13, 14, 13, 4, 13, 99, input, expectedOutput, 1, 9],
                outputs: [undefined, undefined, expectedOutput],
              });
          });
          test('output 1 if the input != 0', () => {
            const input = 2;
            const expectedOutput = 1;
            expect(runProgram(exampleProgram, input))
              .toStrictEqual({
                newState: [3, 12, 6, 12, 15, 1, 13, 14, 13, 4, 13, 99, input, expectedOutput, 1, 9],
                outputs: [undefined, undefined, undefined, expectedOutput],
              });
          });
        });
      });
      describe('part 2 example for opcode 5 (jump-if-true)', () => {
        describe('Using immediate mode, take an input', () => {
          const exampleProgram = [3, 3, 1105, -1, 9, 1101, 0, 0, 12, 4, 12, 99, 1];
          test('output 0 if the input == 0', () => {
            const input = 0;
            const expectedOutput = 0;
            expect(runProgram(exampleProgram, 0))
              .toStrictEqual({
                newState: [3, 3, 1105, input, 9, 1101, 0, 0, 12, 4, 12, 99, expectedOutput],
                outputs: [undefined, undefined, undefined, expectedOutput],
              });
          });
          test('output 1 if the input != 0', () => {
            const input = 2;
            const expectedOutput = 1;
            expect(runProgram(exampleProgram, 2))
              .toStrictEqual({
                newState: [3, 3, 1105, input, 9, 1101, 0, 0, 12, 4, 12, 99, expectedOutput],
                outputs: [undefined, undefined, expectedOutput],
              });
          });
        });
      });
      describe('part 2 large example for ??: example program uses an input instruction to ask for a single number', () => {
        const exampleProgram = [
          3, 21,
          1008, 21, 8, 20,
          1005, 20, 22, 107,
          8, 21, 20,
          1006, 20, 31,
          1106, 0, 36, 98, 0, 0,
          1002, 21, 125, 20,
          4, 20,
          1105, 1, 46, 104,
          999,
          1105, 1, 46,
          1101, 1000, 1, 20,
          4, 20,
          1105, 1, 46,
          98, 99,
        ];
        test('output 999 if the input value is below 8', () => {
          const input = 7;
          const expectedOutput = 999;
          expect(runProgram(exampleProgram, input).outputs)
            .toContain(expectedOutput);
        });
        test('output 1000 if the input value is equal to 8', () => {
          const input = 8;
          const expectedOutput = 1000;
          expect(runProgram(exampleProgram, input).outputs)
            .toContain(expectedOutput);
        });
        test('output 1001 if the input value is greater than 8', () => {
          const input = 9;
          const expectedOutput = 1001;
          expect(runProgram(exampleProgram, input).outputs)
            .toContain(expectedOutput);
        });
      });
    });
    describe('runProgramFromStateStringWithInput(<initialState>, <inputNumber>)', () => {
      test('part 1 example 1', () => {
        const input = 1;
        expect(runProgramFromStateStringWithInput('3,0,4,0,99', input))
          .toStrictEqual({
            newState: [input, 0, 4, 0, 99],
            outputs: [undefined, input],
          });
      });
      test('variant of part 1 example 1', () => {
        const input = 5;
        expect(runProgramFromStateStringWithInput('3,0,4,0,99', input))
          .toStrictEqual({
            newState: [input, 0, 4, 0, 99],
            outputs: [undefined, input],
          });
      });
      test('answer part 1', () => {
        expect(runProgramFromStateStringWithInput(puzzleInput, 1))
          .toStrictEqual({
            newState: [
              3, 225, 1, 225, 6, 6, 1101, 1, 238, 225, 104, 0, 101, 14, 135, 224, 101, -69, 224, 224, 4, 224, 1002, 223, 8, 223, 101, 3, 224, 224, 1, 224, 223, 223, 102, 90, 169, 224, 1001, 224, -4590, 224, 4, 224, 1002, 223, 8, 223, 1001, 224, 1, 224, 1, 224, 223, 223, 1102, 90, 45, 224, 1001, 224, -4050, 224, 4, 224, 102, 8, 223, 223, 101, 5, 224, 224, 1, 224, 223, 223, 1001, 144, 32, 224, 101, -72, 224, 224, 4, 224, 102, 8, 223, 223, 101, 3, 224, 224, 1, 223, 224, 223, 1102, 36, 93, 225, 1101, 88, 52, 225, 1002, 102, 38, 224, 101, -3534, 224, 224, 4, 224, 102, 8, 223, 223, 101, 4, 224, 224, 1, 223, 224, 223, 1102, 15, 57, 225, 1102, 55, 49, 225, 1102, 11, 33, 225, 1101, 56, 40, 225, 1, 131, 105, 224, 101, -103, 224, 224, 4, 224, 102, 8, 223, 223, 1001, 224, 2, 224, 1, 224, 223, 223, 1102, 51, 39, 225, 1101, 45, 90, 225, 2, 173, 139, 224, 101, -495, 224, 224, 4, 224, 1002, 223, 8, 223, 1001, 224, 5, 224, 1, 223, 224, 223, 1101, 68, 86, 224, 1001, 224, -154, 224, 4, 224, 102, 8, 223, 223, 1001, 224, 1, 224, 1, 224, 223, 223, 4, 223, 99, 6731945, 1, 135, 677, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1105, 0, 99999, 1105, 227, 247, 1105, 1, 99999, 1005, 227, 99999, 1005, 0, 256, 1105, 1, 99999, 1106, 227, 99999, 1106, 0, 265, 1105, 1, 99999, 1006, 0, 99999, 1006, 227, 274, 1105, 1, 99999, 1105, 1, 280, 1105, 1, 99999, 1, 225, 225, 225, 1101, 294, 0, 0, 105, 1, 0, 1105, 1, 99999, 1106, 0, 300, 1105, 1, 99999, 1, 225, 225, 225, 1101, 314, 0, 0, 106, 0, 0, 1105, 1, 99999, 108, 226, 677, 224, 1002, 223, 2, 223, 1006, 224, 329, 1001, 223, 1, 223, 1007, 226, 226, 224, 1002, 223, 2, 223, 1006, 224, 344, 101, 1, 223, 223, 1008, 226, 226, 224, 102, 2, 223, 223, 1006, 224, 359, 1001, 223, 1, 223, 107, 226, 677, 224, 1002, 223, 2, 223, 1005, 224, 374, 101, 1, 223, 223, 1107, 677, 226, 224, 102, 2, 223, 223, 1006, 224, 389, 101, 1, 223, 223, 108, 677, 677, 224, 102, 2, 223, 223, 1006, 224, 404, 1001, 223, 1, 223, 1108, 677, 226, 224, 102, 2, 223, 223, 1005, 224, 419, 101, 1, 223, 223, 1007, 677, 226, 224, 1002, 223, 2, 223, 1006, 224, 434, 101, 1, 223, 223, 1107, 226, 226, 224, 1002, 223, 2, 223, 1006, 224, 449, 101, 1, 223, 223, 8, 677, 226, 224, 102, 2, 223, 223, 1006, 224, 464, 1001, 223, 1, 223, 1107, 226, 677, 224, 102, 2, 223, 223, 1005, 224, 479, 1001, 223, 1, 223, 1007, 677, 677, 224, 102, 2, 223, 223, 1005, 224, 494, 1001, 223, 1, 223, 1108, 677, 677, 224, 102, 2, 223, 223, 1006, 224, 509, 101, 1, 223, 223, 1008, 677, 677, 224, 102, 2, 223, 223, 1005, 224, 524, 1001, 223, 1, 223, 107, 226, 226, 224, 1002, 223, 2, 223, 1005, 224, 539, 101, 1, 223, 223, 7, 226, 226, 224, 102, 2, 223, 223, 1005, 224, 554, 101, 1, 223, 223, 1108, 226, 677, 224, 1002, 223, 2, 223, 1006, 224, 569, 1001, 223, 1, 223, 107, 677, 677, 224, 102, 2, 223, 223, 1005, 224, 584, 101, 1, 223, 223, 7, 677, 226, 224, 1002, 223, 2, 223, 1005, 224, 599, 101, 1, 223, 223, 108, 226, 226, 224, 1002, 223, 2, 223, 1005, 224, 614, 101, 1, 223, 223, 1008, 677, 226, 224, 1002, 223, 2, 223, 1005, 224, 629, 1001, 223, 1, 223, 7, 226, 677, 224, 102, 2, 223, 223, 1005, 224, 644, 101, 1, 223, 223, 8, 677, 677, 224, 102, 2, 223, 223, 1005, 224, 659, 1001, 223, 1, 223, 8, 226, 677, 224, 102, 2, 223, 223, 1006, 224, 674, 1001, 223, 1, 223, 4, 223, 99, 226,
            ],
            outputs: [
              undefined, undefined, undefined, 0, undefined, undefined, 0, undefined, undefined, undefined, undefined, undefined, 0, undefined, undefined, undefined, undefined, undefined, 0, undefined, undefined, undefined, undefined, undefined, 0, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 0, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 0, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 0, undefined, undefined, undefined, undefined, undefined, 0, undefined, undefined, undefined,
              6731945,
            ],
          });
      });
      test('answer part 2', () => {
        expect(runProgramFromStateStringWithInput(puzzleInput, 5))
          .toStrictEqual({
            newState: [
              314, 225, 1, 225, 6, 6, 1105, 1, 238, 225, 104, 0, 101, 14, 135, 224, 101, -69, 224, 224, 4, 224, 1002, 223, 8, 223, 101, 3, 224, 224, 1, 224, 223, 223, 102, 90, 169, 224, 1001, 224, -4590, 224, 4, 224, 1002, 223, 8, 223, 1001, 224, 1, 224, 1, 224, 223, 223, 1102, 90, 45, 224, 1001, 224, -4050, 224, 4, 224, 102, 8, 223, 223, 101, 5, 224, 224, 1, 224, 223, 223, 1001, 144, 32, 224, 101, -72, 224, 224, 4, 224, 102, 8, 223, 223, 101, 3, 224, 224, 1, 223, 224, 223, 1102, 36, 93, 225, 1101, 88, 52, 225, 1002, 102, 38, 224, 101, -3534, 224, 224, 4, 224, 102, 8, 223, 223, 101, 4, 224, 224, 1, 223, 224, 223, 1102, 15, 57, 225, 1102, 55, 49, 225, 1102, 11, 33, 225, 1101, 56, 40, 225, 1, 131, 105, 224, 101, -103, 224, 224, 4, 224, 102, 8, 223, 223, 1001, 224, 2, 224, 1, 224, 223, 223, 1102, 51, 39, 225, 1101, 45, 90, 225, 2, 173, 139, 224, 101, -495, 224, 224, 4, 224, 1002, 223, 8, 223, 1001, 224, 5, 224, 1, 223, 224, 223, 1101, 68, 86, 224, 1001, 224, -154, 224, 4, 224, 102, 8, 223, 223, 1001, 224, 1, 224, 1, 224, 223, 223, 4, 223, 99, 9571668, 0, 20, 677, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1105, 0, 99999, 1105, 227, 247, 1105, 1, 99999, 1005, 227, 99999, 1005, 0, 256, 1105, 1, 99999, 1106, 227, 99999, 1106, 0, 265, 1105, 1, 99999, 1006, 0, 99999, 1006, 227, 274, 1105, 1, 99999, 1105, 1, 280, 1105, 1, 99999, 1, 225, 225, 225, 1101, 294, 0, 0, 105, 1, 0, 1105, 1, 99999, 1106, 0, 300, 1105, 1, 99999, 1, 225, 225, 225, 1101, 314, 0, 0, 106, 0, 0, 1105, 1, 99999, 108, 226, 677, 224, 1002, 223, 2, 223, 1006, 224, 329, 1001, 223, 1, 223, 1007, 226, 226, 224, 1002, 223, 2, 223, 1006, 224, 344, 101, 1, 223, 223, 1008, 226, 226, 224, 102, 2, 223, 223, 1006, 224, 359, 1001, 223, 1, 223, 107, 226, 677, 224, 1002, 223, 2, 223, 1005, 224, 374, 101, 1, 223, 223, 1107, 677, 226, 224, 102, 2, 223, 223, 1006, 224, 389, 101, 1, 223, 223, 108, 677, 677, 224, 102, 2, 223, 223, 1006, 224, 404, 1001, 223, 1, 223, 1108, 677, 226, 224, 102, 2, 223, 223, 1005, 224, 419, 101, 1, 223, 223, 1007, 677, 226, 224, 1002, 223, 2, 223, 1006, 224, 434, 101, 1, 223, 223, 1107, 226, 226, 224, 1002, 223, 2, 223, 1006, 224, 449, 101, 1, 223, 223, 8, 677, 226, 224, 102, 2, 223, 223, 1006, 224, 464, 1001, 223, 1, 223, 1107, 226, 677, 224, 102, 2, 223, 223, 1005, 224, 479, 1001, 223, 1, 223, 1007, 677, 677, 224, 102, 2, 223, 223, 1005, 224, 494, 1001, 223, 1, 223, 1108, 677, 677, 224, 102, 2, 223, 223, 1006, 224, 509, 101, 1, 223, 223, 1008, 677, 677, 224, 102, 2, 223, 223, 1005, 224, 524, 1001, 223, 1, 223, 107, 226, 226, 224, 1002, 223, 2, 223, 1005, 224, 539, 101, 1, 223, 223, 7, 226, 226, 224, 102, 2, 223, 223, 1005, 224, 554, 101, 1, 223, 223, 1108, 226, 677, 224, 1002, 223, 2, 223, 1006, 224, 569, 1001, 223, 1, 223, 107, 677, 677, 224, 102, 2, 223, 223, 1005, 224, 584, 101, 1, 223, 223, 7, 677, 226, 224, 1002, 223, 2, 223, 1005, 224, 599, 101, 1, 223, 223, 108, 226, 226, 224, 1002, 223, 2, 223, 1005, 224, 614, 101, 1, 223, 223, 1008, 677, 226, 224, 1002, 223, 2, 223, 1005, 224, 629, 1001, 223, 1, 223, 7, 226, 677, 224, 102, 2, 223, 223, 1005, 224, 644, 101, 1, 223, 223, 8, 677, 677, 224, 102, 2, 223, 223, 1005, 224, 659, 1001, 223, 1, 223, 8, 226, 677, 224, 102, 2, 223, 223, 1006, 224, 674, 1001, 223, 1, 223, 4, 223, 99, 226,
            ],
            outputs: [
              undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
              9571668,
            ],
          });
      });
    });
  });
});
