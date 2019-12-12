import { deepClone } from '../../utils';

const initialInstructionPointerAddress = 0;
const numInstructionValues = 4;
const minParamValue = 0;
const maxParamValue = 99;

const STOP_STATE = -1;

const opcodes = {
  ADD_PARAMS: 1,
  MULTIPLY_PARAMS: 2,
  STOP: 99,
};

const stringArrayToIntArray = (stateString) => stateString.split(',').map((n) => parseInt(n, 10));

const runInstruction = (initialState, instructionPointer) => {
  const opcode = initialState[instructionPointer];
  const addressOfParam1 = initialState[instructionPointer + 1];
  const addressOfParam2 = initialState[instructionPointer + 2];
  const addressOfOutput = initialState[instructionPointer + 3];

  const param1 = initialState[addressOfParam1];
  const param2 = initialState[addressOfParam2];

  const newState = deepClone(initialState);

  switch (opcode) {
    case opcodes.ADD_PARAMS:
      newState[addressOfOutput] = param1 + param2;
      break;
    case opcodes.MULTIPLY_PARAMS:
      newState[addressOfOutput] = param1 * param2;
      break;
    case opcodes.STOP:
      return STOP_STATE;
    default:
      throw new Error();
  }
  return newState;
};

const runProgram = (initialState) => {
  let instructionPointer = initialInstructionPointerAddress;
  let currentState = deepClone(initialState);
  while ((instructionPointer + numInstructionValues) <= initialState.length) {
    const newState = runInstruction(currentState, instructionPointer);
    if (newState === STOP_STATE) {
      return currentState;
    }
    currentState = deepClone(newState);
    instructionPointer += numInstructionValues;
  }
  return currentState;
};

const runProgramFromStateString = (stateString) => {
  const initialState = stringArrayToIntArray(stateString);
  return runProgram(initialState);
};

const runProgramFromStateStringWithParams = (stateString, nounParam, verbParam) => {
  const initialState = stringArrayToIntArray(stateString);
  initialState[1] = nounParam;
  initialState[2] = verbParam;
  return runProgram(initialState);
};

const findParamsThatProduceOutput = (programStateString, targetOutput) => {
  for (let nounParam = minParamValue; nounParam < maxParamValue; nounParam++) {
    for (let verbParam = minParamValue; verbParam < maxParamValue; verbParam++) {
      const finalState = runProgramFromStateStringWithParams(
        programStateString,
        nounParam,
        verbParam,
      );
      const output = finalState[0];
      if (output === targetOutput) {
        return [nounParam, verbParam];
      }
    }
  }
  throw new Error();
};

const runProgramAndGetFirstValue = (programStateString, nounParam, verbParam) => {
  const finalState = runProgramFromStateStringWithParams(programStateString, nounParam, verbParam);
  return finalState[0];
};

const answerPart2 = (programStateString, targetOutput) => {
  const [nounParam, verbParam] = findParamsThatProduceOutput(programStateString, targetOutput);
  return (100 * nounParam) + verbParam;
};

export {
  runProgram,
  runProgramFromStateString,
  runProgramFromStateStringWithParams,
  findParamsThatProduceOutput,
  runProgramAndGetFirstValue,
  answerPart2,
};
