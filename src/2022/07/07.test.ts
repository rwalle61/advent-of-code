import { parseDecimalInt, sum } from '../../utils';
import puzzleInput from './puzzleInput';

const exampleInput = `
$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k
`;

class Dir {
  size = 0;

  children: Record<string, Dir> = {};

  constructor(public name: string, public parent: Dir | null) {}
}

const isFile = (line: string): boolean => /^\d/.test(line);

const updateDirSize = (dir: Dir): void => {
  // eslint-disable-next-line no-param-reassign
  dir.size += sum(
    Object.values(dir.children).map((child) => {
      updateDirSize(child);
      return child.size;
    }),
  );
};

const buildDirTree = (terminalOutput: string[]): Dir => {
  const root = new Dir('/', null);

  let currentDir = root;

  terminalOutput.forEach((line) => {
    if (line === '$ cd ..') {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      currentDir = currentDir.parent!;
    } else if (line.startsWith('$ cd')) {
      const childDirname = line.split('$ cd ')[1];
      currentDir = currentDir.children[childDirname];
    } else if (line.startsWith('dir')) {
      const childDirname = line.split('dir ')[1];
      currentDir.children[childDirname] = new Dir(childDirname, currentDir);
    } else if (isFile(line)) {
      const filesize = parseDecimalInt(line.split(' ')[0]);
      currentDir.size += filesize;
    }
  });

  updateDirSize(root);

  return root;
};

describe('part 1', () => {
  const SIZE_LIMIT = 100_000;

  const countDirSizeAndChildren = (dir: Dir): number =>
    (dir.size <= SIZE_LIMIT ? dir.size : 0) +
    sum(
      Object.values(dir.children).map((child) =>
        countDirSizeAndChildren(child),
      ),
    );

  const sumSizesOfDirsAtMost100000 = (input: string): number => {
    const terminalOutput = input.trim().split('\n');
    terminalOutput.shift();

    const root = buildDirTree(terminalOutput);

    return countDirSizeAndChildren(root);
  };

  it('example', () => {
    expect(sumSizesOfDirsAtMost100000(exampleInput)).toBe(95437);
  });

  it('answer', () => {
    expect(sumSizesOfDirsAtMost100000(puzzleInput)).toBe(1845346);
  });
});

describe('part 2', () => {
  const DISK_SPACE_AVAILABLE_TO_SYSTEM = 70_000_000;
  const MIN_SPACE_NEEDED = 30_000_000;

  const findSizeOfDirToDelete = (
    dir: Dir,
    minSize: number,
    currentMax: number,
  ): number =>
    Math.min(
      dir.size >= minSize ? dir.size : Infinity,
      currentMax,
      ...Object.values(dir.children).map((child) =>
        findSizeOfDirToDelete(child, minSize, currentMax),
      ),
    );

  const sizeOfDirToDelete = (input: string): number => {
    const terminalOutput = input.trim().split('\n');
    terminalOutput.shift();

    const root = buildDirTree(terminalOutput);

    const minSize =
      root.size + MIN_SPACE_NEEDED - DISK_SPACE_AVAILABLE_TO_SYSTEM;

    return findSizeOfDirToDelete(root, minSize, Infinity);
  };

  it('example', () => {
    expect(sizeOfDirToDelete(exampleInput)).toBe(24933642);
  });

  it('answer', () => {
    expect(sizeOfDirToDelete(puzzleInput)).toBe(3636703);
  });
});
