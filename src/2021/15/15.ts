import { parseDecimalInt } from '../../utils';

type Node = readonly [number, number];

type Grid = number[][];

class NodeRepository {
  private nodes = new Set<string>();

  // eslint-disable-next-line class-methods-use-this
  private serialise([x, y]: Node): string {
    return `${x},${y}`;
  }

  // eslint-disable-next-line class-methods-use-this
  private deserialise(string: string): Node {
    return string.split(',').map(parseDecimalInt) as unknown as Node;
  }

  has(node: Node): boolean {
    return this.nodes.has(this.serialise(node));
  }

  add(node: Node): void {
    this.nodes.add(this.serialise(node));
  }

  delete(node: Node): void {
    this.nodes.delete(this.serialise(node));
  }

  forEach(func: (node: Node) => void): void {
    return this.nodes.forEach((string: string) =>
      func(this.deserialise(string)),
    );
  }
}

const parseGrid = (rawScannedGrid: string): Grid =>
  rawScannedGrid
    .trim()
    .split('\n')
    .map((row) => row.split('').map(parseDecimalInt));

const findCheapestNode = (costs: Grid, nodes: NodeRepository): Node => {
  let cheapestNode: Node;
  let cheapestCost = Infinity;

  nodes.forEach((node) => {
    const [x, y] = node;
    const cost = costs[y][x];
    if (cost < cheapestCost) {
      cheapestCost = cost;
      cheapestNode = node;
    }
  });

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return cheapestNode!;
};

const isInGrid = ([x, y]: Node, weights: Grid) => {
  const gridWidth = weights[0].length;
  const gridHeight = weights.length;

  return x >= 0 && x < gridWidth && y >= 0 && y < gridHeight;
};

const updateNeighbour = (
  node: Node,
  neighbour: Node,
  weights: Grid,
  costs: Grid,
  nodesToProcess: NodeRepository,
  processedNodes: NodeRepository,
) => {
  const [nodeX, nodeY] = node;
  const [neighbourX, neighbourY] = neighbour;
  const alreadyProcessed = processedNodes.has(neighbour);
  if (!alreadyProcessed && isInGrid(neighbour, weights)) {
    nodesToProcess.add(neighbour);

    const currentCost = costs[neighbourY][neighbourX];
    const weight = weights[neighbourY][neighbourX];
    const newCost = costs[nodeY][nodeX] + weight;
    if (newCost < currentCost) {
      // eslint-disable-next-line no-param-reassign
      costs[neighbourY][neighbourX] = newCost;
    }
  }
};

const updateNeighbours = (
  node: Node,
  weights: Grid,
  costs: Grid,
  nodesToProcess: NodeRepository,
  processedNodes: NodeRepository,
) => {
  const update = (neighbour: Node) =>
    updateNeighbour(
      node,
      neighbour,
      weights,
      costs,
      nodesToProcess,
      processedNodes,
    );

  const [x, y] = node;

  // up
  update([x, y - 1]);

  // down
  update([x, y + 1]);

  // left
  update([x - 1, y]);

  // right
  update([x + 1, y]);
};

export const findCostOfCheapestPath = (rawGrid: string): number => {
  const weights: Grid = parseGrid(rawGrid);

  const gridWidth = weights[0].length;
  const gridHeight = weights.length;

  const costs: Grid = Array(gridHeight)
    .fill(null)
    .map(() => Array(gridWidth).fill(Infinity));

  costs[0][0] = 0;

  const processedNodes = new NodeRepository();

  const nodesToProcess = new NodeRepository();
  nodesToProcess.add([0, 0]);

  const endNode = [gridWidth - 1, gridHeight - 1] as const;

  while (!processedNodes.has(endNode)) {
    const cheapestNode = findCheapestNode(costs, nodesToProcess);

    updateNeighbours(
      cheapestNode,
      weights,
      costs,
      nodesToProcess,
      processedNodes,
    );

    processedNodes.add(cheapestNode);

    nodesToProcess.delete(cheapestNode);
  }

  return costs[gridHeight - 1][gridWidth - 1];
};

export const generateGrid = (rawScannedGrid: string): string => {
  const scannedWeights: Grid = parseGrid(rawScannedGrid);
  const scannedGridWidth = scannedWeights[0].length;
  const scannedGridHeight = scannedWeights.length;

  const REPEATS = 5;
  const WEIGHT_LIMIT = 9;

  const wrap = (weight: number) =>
    weight > WEIGHT_LIMIT ? weight - WEIGHT_LIMIT : weight;

  const fullGrid: Grid = [];

  for (let heightRepeat = 0; heightRepeat < REPEATS; heightRepeat += 1) {
    for (let j = 0; j < scannedGridHeight; j += 1) {
      const row = [];

      for (let widthRepeat = 0; widthRepeat < REPEATS; widthRepeat += 1) {
        for (let i = 0; i < scannedGridWidth; i += 1) {
          const weight = scannedWeights[j][i];

          const newWeight = wrap(weight + heightRepeat + widthRepeat);

          row.push(newWeight);
        }
      }

      fullGrid.push(row);
    }
  }

  return fullGrid.map((row) => row.join('')).join('\n');
};
