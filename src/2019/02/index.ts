import { stringArrayToIntArray, runProgram } from '../intCodeComputer';

const minParamValue = 0;
const maxParamValue = 99;

export const runProgramFromStateString = (stateString: string) => {
  const initialState = stringArrayToIntArray(stateString);
  return runProgram(initialState);
};

export const runProgramFromStateStringWithParams = (
  stateString: string,
  nounParam: number,
  verbParam: number,
) => {
  const initialState = stringArrayToIntArray(stateString);
  initialState[1] = nounParam;
  initialState[2] = verbParam;
  return runProgram(initialState);
};

export const runProgramAndGetFirstValue = (
  programStateString: string,
  nounParam: number,
  verbParam: number,
) => {
  const { newState: finalState } = runProgramFromStateStringWithParams(
    programStateString,
    nounParam,
    verbParam,
  );
  return finalState[0];
};

export const findParamsThatProduceOutput = (
  programStateString: string,
  targetOutput: number,
) => {
  for (let nounParam = minParamValue; nounParam < maxParamValue; nounParam++) {
    for (
      let verbParam = minParamValue;
      verbParam < maxParamValue;
      verbParam++
    ) {
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

export const answerDay2Part2 = (
  programStateString: string,
  targetOutput: number,
) => {
  const [nounParam, verbParam] = findParamsThatProduceOutput(
    programStateString,
    targetOutput,
  );
  return 100 * nounParam + verbParam;
};

export * from '../intCodeComputer';
