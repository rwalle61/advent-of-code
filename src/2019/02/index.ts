import { deepClone } from '../../utils';

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
    case 1:
      newState[addressOfOutput] = param1 + param2;
      break;
    case 2:
      newState[addressOfOutput] = param1 * param2;
      break;
    case 99:
      return -1;
    default:
      throw new Error();
  }
  return newState;
};

const numInstructionValues = 4;
const minParamValue = 0;
const maxParamValue = 99;

const runProgram = (initialState) => {
  let instructionPointer = 0;
  let currentState = deepClone(initialState);
  while ((instructionPointer + numInstructionValues) <= initialState.length) {
    const newState = runInstruction(currentState, instructionPointer);
    if (newState === -1) {
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
      const finalState = runProgramFromStateStringWithParams(programStateString, nounParam, verbParam);
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
