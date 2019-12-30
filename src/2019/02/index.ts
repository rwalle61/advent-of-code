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
  JUMP_IF_TRUE: 5,
  JUMP_IF_FALSE: 6,
  LESS_THAN: 7,
  EQUALS: 8,
  STOP: 99,
};

const paramModes = {
  POSITION: 0,
  IMMEDIATE: 1,
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

const runInstruction = (initialState, instructionPointer, inputs?: number[]) => {
  const { opcode, parameterModes } = parseFirstNumber(initialState[instructionPointer]);
  const addressOfParam1 = initialState[instructionPointer + 1];
  const addressOfParam2 = initialState[instructionPointer + 2];
  const param3 = initialState[instructionPointer + 3];

  const [modeOfParam1, modeOfParam2] = parameterModes;

  let param1;
  if (modeOfParam1 === paramModes.IMMEDIATE) {
    param1 = addressOfParam1;
  } else if (modeOfParam1 === paramModes.POSITION) {
    param1 = initialState[addressOfParam1];
  }

  let param2;
  if (modeOfParam2 === paramModes.IMMEDIATE) {
    param2 = addressOfParam2;
  } else if (modeOfParam2 === paramModes.POSITION) {
    param2 = initialState[addressOfParam2];
  }

  let newState = deepClone(initialState);
  const remainingInputs = deepClone(inputs);
  let output;

  const numInstructionValues = getNumInstructionValues(initialState, instructionPointer);
  let newInstructionPointerAddress = instructionPointer + numInstructionValues;

  switch (opcode) {
    case opcodes.ADD_PARAMS:
      newState[param3] = param1 + param2;
      break;
    case opcodes.MULTIPLY_PARAMS:
      newState[param3] = param1 * param2;
      break;
    case opcodes.SAVE_INPUT: {
      const input = remainingInputs.shift();
      newState[addressOfParam1] = input;
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
    case opcodes.STOP:
      newState = STOP_STATE;
      break;
    default:
      throw new Error();
  }
  return {
    newState,
    output,
    newInstructionPointerAddress,
    remainingInputs,
  };
};

const runProgram = (
  initialState,
  inputs?: number[],
) => {
  const outputs = [];
  let instructionPointer = initialInstructionPointerAddress;
  let currentState = deepClone(initialState);
  let currentInputs = deepClone(inputs);
  while ((instructionPointer + 2) <= initialState.length) {
    const outcome = runInstruction(
      currentState,
      instructionPointer,
      currentInputs,
    );

    const {
      newState,
      output,
      newInstructionPointerAddress,
      remainingInputs,
    } = outcome;

    if (newState === STOP_STATE) {
      return {
        newState: currentState,
        outputs,
      };
    }

    outputs.push(output);

    instructionPointer = newInstructionPointerAddress;

    currentState = deepClone(newState);
    if (inputs) {
      currentInputs = deepClone(remainingInputs);
    }
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

const runProgramFromStateStringWithInputs = (stateString: string, inputs: number[]) => {
  const initialState = stringArrayToIntArray(stateString);
  return runProgram(initialState, inputs);
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

const answerDay2Part2 = (programStateString, targetOutput) => {
  const [nounParam, verbParam] = findParamsThatProduceOutput(programStateString, targetOutput);
  return (100 * nounParam) + verbParam;
};

const runAmplifier = (program, phaseSetting, inputSignal) => {
  const { outputs } = runProgram(program, [phaseSetting, inputSignal]);
  const outputSignal = outputs[outputs.length - 1];
  return outputSignal;
};

const runAmplifiers = (program, phaseSettingSequence) => {
  let nextOutputSignal = 0;
  for (let i = 0; i < phaseSettingSequence.length; i++) {
    const phaseSetting = phaseSettingSequence[i];
    nextOutputSignal = runAmplifier(
      program,
      phaseSetting,
      nextOutputSignal,
    );
  }
  return nextOutputSignal;
};

const duplicatesInArray = (arr) =>
  [...(new Set(arr))].length !== arr.length;

const findMaxThrusterSignal = (program) => {
  const minPhaseSetting = 0;
  const maxPhaseSetting = 4;
  let maxThrusterSignal = 0;
  for (let i = minPhaseSetting; i <= maxPhaseSetting; i++) {
    for (let j = minPhaseSetting; j <= maxPhaseSetting; j++) {
      for (let k = minPhaseSetting; k <= maxPhaseSetting; k++) {
        for (let l = minPhaseSetting; l <= maxPhaseSetting; l++) {
          for (let m = minPhaseSetting; m <= maxPhaseSetting; m++) {
            const phaseSettingSequence = [i, j, k, l, m];
            if (!duplicatesInArray(phaseSettingSequence)) {
              const thrusterSignal = runAmplifiers(
                program,
                phaseSettingSequence,
              );
              if (thrusterSignal > maxThrusterSignal) {
                maxThrusterSignal = thrusterSignal;
              }
            }
          }
        }
      }
    }
  }
  return maxThrusterSignal;
};

export {
  getNumInstructionValues,
  parseFirstNumber,
  runInstruction,
  runProgramFromStateStringWithInputs,
  runProgram,
  runProgramFromStateString,
  runProgramFromStateStringWithParams,
  findParamsThatProduceOutput,
  runProgramAndGetFirstValue,
  answerDay2Part2,
  runAmplifier,
  runAmplifiers,
  findMaxThrusterSignal,
};
