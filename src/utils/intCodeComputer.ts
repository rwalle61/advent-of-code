import { deepClone, findLast } from '.';

enum States {
  STOP = -1,
  PAUSE = -2,
}

enum Opcodes {
  ADD_PARAMS = 1,
  MULTIPLY_PARAMS = 2,
  SAVE_INPUT = 3,
  OUTPUT = 4,
  JUMP_IF_TRUE = 5,
  JUMP_IF_FALSE = 6,
  LESS_THAN = 7,
  EQUALS = 8,
  INCREASE_RELATIVE_BASE = 9,
  STOP = 99,
}

enum ParamModes {
  POSITION = 0,
  IMMEDIATE = 1,
  RELATIVE = 2,
}

const stringArrayToIntArray = (stateString) => stateString.split(',').map((n) => parseInt(n, 10));

const getParamValue = (programState, paramMode, paramAddress) => {
  if (paramMode === ParamModes.IMMEDIATE) {
    return paramAddress;
  }
  if ([ParamModes.POSITION, ParamModes.RELATIVE].includes(paramMode)) {
    return programState[paramAddress] || 0;
  }
  throw new Error();
};

const getParams = (
  programState,
  instructionPointer,
  relativeBase,
  parsedParamModes,
) => {
  const params = {};
  for (let i = 0; i < 3; i++) {
    const mode = parsedParamModes[i] || ParamModes.POSITION;
    const paramNum = i + 1;
    let address = programState[instructionPointer + paramNum];
    address = (mode === ParamModes.RELATIVE) ? relativeBase + address : address;
    const value = getParamValue(programState, mode, address);
    const param = {
      value,
      writeAddress: address,
    };
    params[paramNum] = param;
  }
  return params;
};

const parseFirstNumber = (firstNumber) => {
  const firstNumberArr = firstNumber.toString().split('');
  const opcodeStr = firstNumberArr
    .slice(firstNumberArr.length - 2)
    .join('');
  const opcode = parseInt(opcodeStr, 10);

  const parsedParamModes = firstNumberArr
    .slice(0, firstNumberArr.length - 2)
    .map((char) => parseInt(char, 10))
    .reverse();

  return { opcode, parsedParamModes };
};

const parseInstruction = (
  programState,
  instructionPointer,
  relativeBase = 0,
) => {
  const firstNumber = programState[instructionPointer];

  const { opcode, parsedParamModes } = parseFirstNumber(firstNumber);

  const params = getParams(
    programState,
    instructionPointer,
    relativeBase,
    parsedParamModes,
  );

  return { opcode, params };
};

const getNumInstructionValues = (opcode) => {
  if ([
    Opcodes.ADD_PARAMS,
    Opcodes.MULTIPLY_PARAMS,
    Opcodes.LESS_THAN,
    Opcodes.EQUALS,
  ].includes(opcode)) {
    return 4;
  }

  if ([
    Opcodes.SAVE_INPUT,
    Opcodes.OUTPUT,
    Opcodes.INCREASE_RELATIVE_BASE,
  ].includes(opcode)) {
    return 2;
  }

  if ([
    Opcodes.JUMP_IF_TRUE,
    Opcodes.JUMP_IF_FALSE,
  ].includes(opcode)) {
    return 3;
  }

  if ([
    Opcodes.STOP,
  ].includes(opcode)) {
    return 0;
  }
  throw new Error();
};

const runInstruction = (
  initialState,
  instructionPointer,
  inputs?: number[],
  relativeBase: number = 0,
) => {
  const { opcode, params } = parseInstruction(
    initialState,
    instructionPointer,
    relativeBase,
  );

  let newState = deepClone(initialState);
  const remainingInputs = deepClone(inputs);
  let output;

  const numInstructionValues = getNumInstructionValues(opcode);
  let newInstructionPointerAddress = instructionPointer + numInstructionValues;
  let newRelativeBase = relativeBase;

  switch (opcode) {
    case Opcodes.ADD_PARAMS:
      newState[params[3].writeAddress] = params[1].value + params[2].value;
      break;
    case Opcodes.MULTIPLY_PARAMS:
      newState[params[3].writeAddress] = params[1].value * params[2].value;
      break;
    case Opcodes.SAVE_INPUT: {
      if (Array.isArray(remainingInputs) && !remainingInputs.length) {
        newState = States.PAUSE;
        break;
      }
      const input = remainingInputs.shift();
      newState[params[1].writeAddress] = input;
      break;
    }
    case Opcodes.OUTPUT:
      output = params[1].value;
      break;
    case Opcodes.JUMP_IF_TRUE:
      if (params[1].value !== 0) {
        newInstructionPointerAddress = params[2].value;
      }
      break;
    case Opcodes.JUMP_IF_FALSE:
      if (params[1].value === 0) {
        newInstructionPointerAddress = params[2].value;
      }
      break;
    case Opcodes.LESS_THAN:
      newState[params[3].writeAddress] = (params[1].value < params[2].value) ? 1 : 0;
      break;
    case Opcodes.EQUALS:
      newState[params[3].writeAddress] = (params[1].value === params[2].value) ? 1 : 0;
      break;
    case Opcodes.INCREASE_RELATIVE_BASE:
      newRelativeBase += params[1].value;
      break;
    case Opcodes.STOP:
      newState = States.STOP;
      break;
    default:
      throw new Error();
  }
  return {
    newState,
    output,
    newInstructionPointerAddress,
    remainingInputs,
    newRelativeBase,
  };
};

const thereAreMoreInstructions = (currentState) =>
  (currentState.instructionPointer + 2) <= currentState.state.length;

const runProgram = (
  initialState,
  initialInputs: number[] = [],
  initialInstructionPointerAddress = 0,
) => {
  let currentState = {
    state: deepClone(initialState),
    outputs: [],
    instructionPointer: initialInstructionPointerAddress,
    inputs: deepClone(initialInputs),
    relativeBase: 0,
  };
  while (thereAreMoreInstructions(currentState)) {
    const {
      state,
      outputs,
      instructionPointer,
      inputs,
      relativeBase,
    } = currentState;

    const {
      newState,
      output,
      newInstructionPointerAddress,
      remainingInputs,
      newRelativeBase,
    } = runInstruction(
      state,
      instructionPointer,
      inputs,
      relativeBase,
    );

    if (newState === States.PAUSE) {
      return {
        newState: state,
        outputs,
        instructionPointer,
      };
    }

    if (newState === States.STOP) {
      break;
    }

    currentState = {
      state: deepClone(newState),
      outputs: outputs.concat([output]),
      instructionPointer: newInstructionPointerAddress,
      inputs: deepClone(remainingInputs),
      relativeBase: newRelativeBase,
    };
  }

  return {
    newState: currentState.state,
    outputs: currentState.outputs,
  };
};

const runProgramAndGetLastOutput = (
  initialState,
  initialInputs: number[] = [],
  initialInstructionPointerAddress = 0,
) => {
  const { outputs } = runProgram(
    initialState,
    initialInputs,
    initialInstructionPointerAddress,
  );
  const lastOutput = findLast(outputs, (output) => output !== undefined);
  return lastOutput;
};

export {
  stringArrayToIntArray,
  parseFirstNumber,
  runInstruction,
  runProgram,
  runProgramAndGetLastOutput,
};
