import { deepClone, findLast } from '../../utils';
import { runProgram } from '../intCodeComputer';

export const runAmp = (
  program: number[],
  phaseSetting: number,
  inputSignal: number,
) => {
  const { outputs } = runProgram(program, [phaseSetting, inputSignal]);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const outputSignal = outputs[outputs.length - 1]!;
  return outputSignal;
};

export const runAmps = (program: number[], phaseSettingSequence: number[]) => {
  let currentOutputSignal = 0;
  phaseSettingSequence.forEach((phaseSetting) => {
    currentOutputSignal = runAmp(program, phaseSetting, currentOutputSignal);
  });
  return currentOutputSignal;
};

export const runAmpInFeedbackMode = (
  program: number[],
  phaseSetting: number,
  inputSignal: number,
  initialInstructionPointerAddress = 0,
) => {
  const inputs =
    initialInstructionPointerAddress === 0
      ? [phaseSetting, inputSignal]
      : [inputSignal];
  const { newState, outputs, instructionPointer } = runProgram(
    program,
    inputs,
    initialInstructionPointerAddress,
  );
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const outputSignal = findLast(outputs, (output) => output !== undefined)!;
  return {
    newState,
    outputSignal,
    instructionPointer,
  };
};

export const runAmpsInFeedbackMode = (
  program: number[],
  phaseSettingSequence: number[],
) => {
  let currentOutputSignal = 0;
  const numPhaseSettings = phaseSettingSequence.length;
  const amplifierStates = Array(numPhaseSettings).fill({
    state: deepClone(program),
    instructionPointer: 0,
  });
  for (let i = 0; i < numPhaseSettings; i++) {
    const phaseSetting = phaseSettingSequence[i];
    const { newState, outputSignal, instructionPointer } = runAmpInFeedbackMode(
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

    const onLastAmp = i === numPhaseSettings - 1;
    const ampAwaitingInput = typeof instructionPointer === 'number';
    if (onLastAmp && ampAwaitingInput) {
      // loop through the amplifiers again
      i = -1;
    }
  }
  return currentOutputSignal;
};

const duplicatesInArray = (arr: unknown[]) =>
  [...new Set(arr)].length !== arr.length;

const getPermutations = (min: number, max: number) => {
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

export const findMaxThrusterSignal = (program: number[]) => {
  const possiblePhaseSettingSequences = getPermutations(0, 4);
  const thrusterSignals = possiblePhaseSettingSequences.map(
    (phaseSettingSequence) => runAmps(program, phaseSettingSequence),
  );
  return Math.max(...thrusterSignals);
};

export const findMaxThrusterSignalInFeedbackMode = (program: number[]) => {
  const possiblePhaseSettingSequences = getPermutations(5, 9);
  let maxThrusterSignal = 0;
  let phaseSettingSequenceGeneratingMaxSignal: number[] = [];
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

export * from '../intCodeComputer';
