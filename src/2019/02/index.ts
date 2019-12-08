const deepClone = (obj) => JSON.parse(JSON.stringify(obj));

const step = (initialState, programPosition) => {
  const opcode = initialState[programPosition];
  const input1Position = initialState[programPosition + 1];
  const input2Position = initialState[programPosition + 2];
  const outputPosition = initialState[programPosition + 3];

  const newState = deepClone(initialState);

  switch (opcode) {
    case 1:
      newState[outputPosition] = initialState[input1Position] + initialState[input2Position];
      break;
    case 2:
      newState[outputPosition] = initialState[input1Position] * initialState[input2Position];
      break;
    case 99:
      return -1;
    default:
      throw new Error();
  }
  return newState;
};

const runProgram = (initialState) => {
  let programPosition = 0;
  let currentState = deepClone(initialState);
  while ((programPosition + 4) <= initialState.length) {
    const newState = step(currentState, programPosition);
    if (newState === -1) {
      return currentState;
    }
    currentState = deepClone(newState);
    programPosition += 4;
  }
  return currentState;
};


const runProgramFromFile = (fileData) => {
  const initialState = fileData.trim().split(',').map((n) => parseInt(n, 10));
  return runProgram(initialState);
};


export {
  runProgram,
  runProgramFromFile,
};
