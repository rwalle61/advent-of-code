import { stringArrayToIntArray, runProgram } from '../intCodeComputer';

const runProgramFromStateStringWithInputs = (
  stateString: string,
  inputs: number[]
) => {
  const initialState = stringArrayToIntArray(stateString);
  return runProgram(initialState, inputs);
};

export * from '../intCodeComputer';
export { runProgramFromStateStringWithInputs };
