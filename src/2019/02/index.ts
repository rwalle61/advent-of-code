import { stringArrayToIntArray, runProgram } from '../../utils/intCodeComputer';

const minParamValue = 0;
const maxParamValue = 99;

const runProgramFromStateString = (stateString) => {
  const initialState = stringArrayToIntArray(stateString);
  return runProgram(initialState);
};

const runProgramFromStateStringWithParams = (
  stateString,
  nounParam,
  verbParam
) => {
  const initialState = stringArrayToIntArray(stateString);
  initialState[1] = nounParam;
  initialState[2] = verbParam;
  return runProgram(initialState);
};

const runProgramAndGetFirstValue = (
  programStateString,
  nounParam,
  verbParam
) => {
  const { newState: finalState } = runProgramFromStateStringWithParams(
    programStateString,
    nounParam,
    verbParam
  );
  return finalState[0];
};

const findParamsThatProduceOutput = (programStateString, targetOutput) => {
  for (let nounParam = minParamValue; nounParam < maxParamValue; nounParam++) {
    for (
      let verbParam = minParamValue;
      verbParam < maxParamValue;
      verbParam++
    ) {
      const { newState: finalState } = runProgramFromStateStringWithParams(
        programStateString,
        nounParam,
        verbParam
      );
      const output = finalState[0];
      if (output === targetOutput) {
        return [nounParam, verbParam];
      }
    }
  }
  throw new Error();
};

const answerDay2Part2 = (programStateString, targetOutput) => {
  const [nounParam, verbParam] = findParamsThatProduceOutput(
    programStateString,
    targetOutput
  );
  return 100 * nounParam + verbParam;
};

export * from '../../utils/intCodeComputer';
export {
  runProgramFromStateString,
  runProgramFromStateStringWithParams,
  findParamsThatProduceOutput,
  runProgramAndGetFirstValue,
  answerDay2Part2,
};
