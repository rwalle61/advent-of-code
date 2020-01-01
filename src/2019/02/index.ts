import { deepClone } from '../../utils';

const minParamValue = 0;
const maxParamValue = 99;

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
      if (Array.isArray(remainingInputs) && !remainingInputs.length) {
        newState = states.PAUSE;
        break;
      }
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
  };
  while (thereAreMoreInstructions(currentState)) {
    const {
      state,
      outputs,
      instructionPointer,
      inputs,
    } = currentState;

    const {
      newState,
      output,
      newInstructionPointerAddress,
      remainingInputs,
    } = runInstruction(
      state,
      instructionPointer,
      inputs,
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
    };
  }

  return {
    newState: currentState.state,
    outputs: currentState.outputs,
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

const runAmp = (program, phaseSetting, inputSignal) => {
  const { outputs } = runProgram(program, [phaseSetting, inputSignal]);
  const outputSignal = outputs[outputs.length - 1];
  return outputSignal;
};

const runAmps = (program, phaseSettingSequence) => {
  let currentOutputSignal = 0;
  phaseSettingSequence.forEach((phaseSetting) => {
    currentOutputSignal = runAmp(
      program,
      phaseSetting,
      currentOutputSignal,
    );
  });
  return currentOutputSignal;
};

const findLast = (arr, condition) => arr
  .slice()
  .reverse()
  .find((element) => condition(element));

const runAmpInFeedbackMode = (
  program,
  phaseSetting,
  inputSignal,
  initialInstructionPointerAddress = 0,
) => {
  const inputs = (initialInstructionPointerAddress === 0)
    ? [phaseSetting, inputSignal]
    : [inputSignal];
  const {
    newState,
    outputs,
    instructionPointer,
  } = runProgram(
    program,
    inputs,
    initialInstructionPointerAddress,
  );
  const outputSignal = findLast(outputs, (output) => output !== undefined);
  return {
    newState,
    outputSignal,
    instructionPointer,
  };
};

const runAmpsInFeedbackMode = (program, phaseSettingSequence) => {
  let currentOutputSignal = 0;
  const numPhaseSettings = phaseSettingSequence.length;
  const amplifierStates = Array(numPhaseSettings).fill({
    state: deepClone(program),
    instructionPointer: 0,
  });
  for (let i = 0; i < numPhaseSettings; i++) {
    const phaseSetting = phaseSettingSequence[i];
    const {
      newState,
      outputSignal,
      instructionPointer,
    } = runAmpInFeedbackMode(
      amplifierStates[i].state,
      phaseSetting,
      currentOutputSignal,
      amplifierStates[i].instructionPointer,
    );

    currentOutputSignal = outputSignal;

    amplifierStates[i] = {
      state: newState,
      instructionPointer,
    };

    const onLastAmp = i === (numPhaseSettings - 1);
    const ampAwaitingInput = (typeof instructionPointer) === 'number';
    if (onLastAmp && ampAwaitingInput) {
      // loop through the amplifiers again
      i = -1;
    }
  }
  return currentOutputSignal;
};

const duplicatesInArray = (arr) =>
  [...(new Set(arr))].length !== arr.length;

const getPermutations = (min, max) => {
  const permutations = [];
  for (let i = min; i <= max; i++) {
    for (let j = min; j <= max; j++) {
      for (let k = min; k <= max; k++) {
        for (let l = min; l <= max; l++) {
          for (let m = min; m <= max; m++) {
            const permutation = [i, j, k, l, m];
            if (!duplicatesInArray(permutation)) {
              permutations.push(permutation);
            }
          }
        }
      }
    }
  }
  return permutations;
};

const findMaxThrusterSignal = (program) => {
  const possiblePhaseSettingSequences = getPermutations(0, 4);
  const thrusterSignals = possiblePhaseSettingSequences.map((phaseSettingSequence) =>
    runAmps(program, phaseSettingSequence));
  return Math.max(...thrusterSignals);
};

const findMaxThrusterSignalInFeedbackMode = (program) => {
  const possiblePhaseSettingSequences = getPermutations(5, 9);
  let maxThrusterSignal = 0;
  let phaseSettingSequenceGeneratingMaxSignal = [];
  possiblePhaseSettingSequences.forEach((phaseSettingSequence) => {
    const thrusterSignal = runAmpsInFeedbackMode(program, phaseSettingSequence);
    if (thrusterSignal > maxThrusterSignal) {
      maxThrusterSignal = thrusterSignal;
      phaseSettingSequenceGeneratingMaxSignal = phaseSettingSequence;
    }
  });
  return {
    maxThrusterSignal,
    phaseSettingSequenceGeneratingMaxSignal,
  };
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
  runAmp,
  runAmps,
  runAmpInFeedbackMode,
  runAmpsInFeedbackMode,
  findMaxThrusterSignal,
  findMaxThrusterSignalInFeedbackMode,
};
