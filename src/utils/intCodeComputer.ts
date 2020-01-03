import { deepClone, findLast } from '.';

const states = {
  STOP: -1,
  PAUSE: -2,
};

const opcodes = {
  ADD_PARAMS: 1,
  MULTIPLY_PARAMS: 2,
  SAVE_INPUT: 3,
  OUTPUT: 4,
  JUMP_IF_TRUE: 5,
  JUMP_IF_FALSE: 6,
  LESS_THAN: 7,
  EQUALS: 8,
  INCREASE_RELATIVE_BASE: 9,
  STOP: 99,
};

const paramModes = {
  POSITION: 0,
  IMMEDIATE: 1,
  RELATIVE: 2,
};

const stringArrayToIntArray = (stateString) => stateString.split(',').map((n) => parseInt(n, 10));

const parseFirstNumber = (firstNumber) => {
  const firstNumberArr = firstNumber.toString().split('');
  const opcodeStr = firstNumberArr
    .slice(firstNumberArr.length - 2)
    .join('');
  const opcode = parseInt(opcodeStr, 10);

  const parameterModes = [
    paramModes.POSITION,
    paramModes.POSITION,
    paramModes.POSITION,
  ];
  const parsedParameterModes = firstNumberArr
    .slice(0, firstNumberArr.length - 2)
    .map((char) => parseInt(char, 10))
    .reverse();
  for (let i = 0; i < parsedParameterModes.length; i++) {
    parameterModes[i] = parsedParameterModes[i];
  }

  return { opcode, parameterModes };
};

const getNumInstructionValues = (initialState, instructionPointer) => {
  const { opcode } = parseFirstNumber(initialState[instructionPointer]);
  if ([
    opcodes.ADD_PARAMS,
    opcodes.MULTIPLY_PARAMS,
    opcodes.LESS_THAN,
    opcodes.EQUALS,
  ].includes(opcode)) {
    return 4;
  }

  if ([
    opcodes.SAVE_INPUT,
    opcodes.OUTPUT,
    opcodes.INCREASE_RELATIVE_BASE,
  ].includes(opcode)) {
    return 2;
  }

  if ([
    opcodes.JUMP_IF_TRUE,
    opcodes.JUMP_IF_FALSE,
  ].includes(opcode)) {
    return 3;
  }

  if ([
    opcodes.STOP,
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
  const { opcode, parameterModes } = parseFirstNumber(initialState[instructionPointer]);
  const addressOfParam1 = initialState[instructionPointer + 1];
  const addressOfParam2 = initialState[instructionPointer + 2];
  const addressOfParam3 = initialState[instructionPointer + 3];

  const [
    modeOfParam1,
    modeOfParam2,
    modeOfParam3,
  ] = parameterModes;

  let param1;
  if (modeOfParam1 === paramModes.IMMEDIATE) {
    param1 = addressOfParam1;
  } else if (modeOfParam1 === paramModes.POSITION) {
    param1 = initialState[addressOfParam1] || 0;
  } else if (modeOfParam1 === paramModes.RELATIVE) {
    param1 = initialState[relativeBase + addressOfParam1] || 0;
  }

  let param2;
  if (modeOfParam2 === paramModes.IMMEDIATE) {
    param2 = addressOfParam2;
  } else if (modeOfParam2 === paramModes.POSITION) {
    param2 = initialState[addressOfParam2] || 0;
  } else if (modeOfParam2 === paramModes.RELATIVE) {
    param2 = initialState[relativeBase + addressOfParam2] || 0;
  }

  let param3;
  param3 = addressOfParam3;
  if (modeOfParam3 === paramModes.RELATIVE) {
    param3 = relativeBase + addressOfParam3;
  }
  let newState = deepClone(initialState);
  const remainingInputs = deepClone(inputs);
  let output;

  const numInstructionValues = getNumInstructionValues(initialState, instructionPointer);
  let newInstructionPointerAddress = instructionPointer + numInstructionValues;
  let newRelativeBase = relativeBase;

  switch (opcode) {
    case opcodes.ADD_PARAMS:
      newState[param3] = param1 + param2;
      break;
    case opcodes.MULTIPLY_PARAMS:
      newState[param3] = param1 * param2;
      break;
    case opcodes.SAVE_INPUT: {
      if (Array.isArray(remainingInputs) && !remainingInputs.length) {
        newState = states.PAUSE;
        break;
      }
      const input = remainingInputs.shift();
      if (modeOfParam1 === paramModes.POSITION) {
        newState[addressOfParam1] = input;
        param1 = initialState[addressOfParam1] || 0;
      } else if (modeOfParam1 === paramModes.RELATIVE) {
        newState[relativeBase + addressOfParam1] = input;
      } else {
        throw new Error();
        // day 5 instruction: "Parameters that an instruction writes to will never be in immediate mode"
        // https://adventofcode.com/2019/day/5
      }
      break;
    }
    case opcodes.OUTPUT:
      output = param1;
      break;
    case opcodes.JUMP_IF_TRUE:
      if (param1 !== 0) {
        newInstructionPointerAddress = param2;
      }
      break;
    case opcodes.JUMP_IF_FALSE:
      if (param1 === 0) {
        newInstructionPointerAddress = param2;
      }
      break;
    case opcodes.LESS_THAN:
      newState[param3] = (param1 < param2) ? 1 : 0;
      break;
    case opcodes.EQUALS:
      newState[param3] = (param1 === param2) ? 1 : 0;
      break;
    case opcodes.INCREASE_RELATIVE_BASE:
      newRelativeBase += param1;
      break;
    case opcodes.STOP:
      newState = states.STOP;
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

    if (newState === states.PAUSE) {
      return {
        newState: state,
        outputs,
        instructionPointer,
      };
    }

    if (newState === states.STOP) {
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
  getNumInstructionValues,
  parseFirstNumber,
  runInstruction,
  runProgram,
  runProgramAndGetLastOutput,
};
