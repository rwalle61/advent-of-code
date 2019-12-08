const deepClone = (obj) => JSON.parse(JSON.stringify(obj));

const parseFile = (fileData) => fileData.trim().split(',').map((n) => parseInt(n, 10));

const runInstruction = (initialState, instructionPointer) => {
  const opcode = initialState[instructionPointer];
  const addressOfParam1 = initialState[instructionPointer + 1];
  const addressOfParam2 = initialState[instructionPointer + 2];
  const addressOfOutput = initialState[instructionPointer + 3];

  const param1 = initialState[addressOfParam1];
  const param2 = initialState[addressOfParam2];

  const newState = deepClone(initialState);

  switch (opcode) {
    case 1:
      newState[addressOfOutput] = param1 + param2;
      break;
    case 2:
      newState[addressOfOutput] = param1 * param2;
      break;
    case 99:
      return -1;
    default:
      throw new Error();
  }
  return newState;
};

const instructionValues = 4;

const runProgram = (initialState) => {
  let instructionPointer = 0;
  let currentState = deepClone(initialState);
  while ((instructionPointer + instructionValues) <= initialState.length) {
    const newState = runInstruction(currentState, instructionPointer);
    if (newState === -1) {
      return currentState;
    }
    currentState = deepClone(newState);
    instructionPointer += instructionValues;
  }
  return currentState;
};

const runProgramFromFile = (fileData) => {
  const initialState = parseFile(fileData);
  return runProgram(initialState);
};

const runProgramFromFileWithInputs = (fileData, input1, input2) => {
  const initialState = parseFile(fileData);
  initialState[1] = input1;
  initialState[2] = input2;
  return runProgram(initialState);
};

export {
  runProgram,
  runProgramFromFile,
  runProgramFromFileWithInputs,
};
