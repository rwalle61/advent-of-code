import { stringArrayToIntArray, runProgram } from '../../utils/intCodeComputer';

const runProgramFromStateStringWithInputs = (
  stateString: string,
  inputs: number[]
) => {
  const initialState = stringArrayToIntArray(stateString);
  return runProgram(initialState, inputs);
};

export * from '../../utils/intCodeComputer';
export { runProgramFromStateStringWithInputs };
