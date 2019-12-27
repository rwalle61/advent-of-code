import { deepClone } from '../../utils';

const initialInstructionPointerAddress = 0;
const minParamValue = 0;
const maxParamValue = 99;

const STOP_STATE = -1;

const opcodes = {
  ADD_PARAMS: 1,
  MULTIPLY_PARAMS: 2,
  SAVE_INPUT: 3,
  OUTPUT: 4,
  STOP: 99,
};

const stringArrayToIntArray = (stateString) => stateString.split(',').map((n) => parseInt(n, 10));

const parseFirstNumber = (firstNumber) => {
  const firstNumberArr = firstNumber.toString().split('');
  const opcodeStr = firstNumberArr
    .slice(firstNumberArr.length - 2)
    .join('');
  const opcode = parseInt(opcodeStr, 10);

  const parameterModes = [0, 0, 0];
  const parsedParameterModes = firstNumberArr
    .slice(0, firstNumberArr.length - 2)
    .map((char) => parseInt(char, 10))
    .reverse();
  for (let i = 0; i < parsedParameterModes.length; i++) {
    parameterModes[i] = parsedParameterModes[i];
  }

  return { opcode, parameterModes };
};

const runInstruction = (initialState, instructionPointer, input?: number) => {
  const { opcode, parameterModes } = parseFirstNumber(initialState[instructionPointer]);
  // TODO: rename addressOfParam1 -> param1
  const addressOfParam1 = initialState[instructionPointer + 1];
  const addressOfParam2 = initialState[instructionPointer + 2];
  const addressOfOutput = initialState[instructionPointer + 3];

  const [paramMode1, paramMode2] = parameterModes;

  let param1;
  if (paramMode1 === 1) {
    param1 = addressOfParam1;
  } else if (paramMode1 === 0) {
    param1 = initialState[addressOfParam1];
  }

  let param2;
  if (paramMode2 === 1) {
    param2 = addressOfParam2;
  } else if (paramMode2 === 0) {
    param2 = initialState[addressOfParam2];
  }

  let newState = deepClone(initialState);
  let output;

  switch (opcode) {
    case opcodes.ADD_PARAMS:
      newState[addressOfOutput] = param1 + param2;
      break;
    case opcodes.MULTIPLY_PARAMS:
      newState[addressOfOutput] = param1 * param2;
      break;
    case opcodes.SAVE_INPUT:
      newState[addressOfParam1] = input;
      break;
    case opcodes.OUTPUT:
      output = param1;
      break;
    case opcodes.STOP:
      newState = STOP_STATE;
      break;
    default:
      throw new Error();
  }
  return {
    newState,
    output,
  };
};

const getNumInstructionValues = (initialState, instructionPointer) => {
  const { opcode } = parseFirstNumber(initialState[instructionPointer]);
  if ([1, 2].includes(opcode)) {
    return 4;
  }
  if ([3, 4].includes(opcode)) {
    return 2;
  }
  if ([99].includes(opcode)) {
    return 0;
  }
  throw new Error();
};

const runProgram = (initialState, input?: number) => {
  const outputs = [];
  let instructionPointer = initialInstructionPointerAddress;
  let currentState = deepClone(initialState);
  let numInstructionValues = getNumInstructionValues(currentState, instructionPointer);
  while ((instructionPointer + numInstructionValues) <= initialState.length) {
    const outcome = (instructionPointer === 0)
      ? runInstruction(currentState, instructionPointer, input)
      : runInstruction(currentState, instructionPointer);
    const { newState, output } = outcome;
    outputs.push(output);
    if (newState === STOP_STATE) {
      return {
        newState: currentState,
        outputs,
      };
    }
    numInstructionValues = getNumInstructionValues(currentState, instructionPointer);
    instructionPointer += numInstructionValues;
    currentState = deepClone(newState);
  }
  return {
    newState: currentState,
    outputs,
  };
};

const runProgramFromStateString = (stateString) => {
  const initialState = stringArrayToIntArray(stateString);
  return runProgram(initialState);
};

const runProgramFromStateStringWithInput = (stateString: string, input: number) => {
  const initialState = stringArrayToIntArray(stateString);
  return runProgram(initialState, input);
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
      const { newState: finalState } = runProgramFromStateStringWithParams(
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
  const { newState: finalState } = runProgramFromStateStringWithParams(
    programStateString,
    nounParam,
    verbParam,
  );
  return finalState[0];
};

const answerPart2 = (programStateString, targetOutput) => {
  const [nounParam, verbParam] = findParamsThatProduceOutput(programStateString, targetOutput);
  return (100 * nounParam) + verbParam;
};

export {
  getNumInstructionValues,
  parseFirstNumber,
  runInstruction,
  runProgramFromStateStringWithInput,
  runProgram,
  runProgramFromStateString,
  runProgramFromStateStringWithParams,
  findParamsThatProduceOutput,
  runProgramAndGetFirstValue,
  answerPart2,
};
