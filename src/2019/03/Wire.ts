import Point from './Point';

const intersectsWithWire = (point: Point, wire: Wire) =>
  wire.points.some((point2) => point.isAt(point2));

const parseWirePath = (wirePathString: string) => wirePathString.split(',');

export default class Wire {
  public points: Array<Point>;

  private currentX: number;

  private currentY: number;

  constructor(wirePathString: string) {
    this.currentX = 0;
    this.currentY = 0;
    this.points = [];
    const wirePath = parseWirePath(wirePathString);
    this.extendAlongPath(wirePath);
  }

  extendAlongPath(path: string[]) {
    path.forEach((instruction: string) => {
      this.extendAlongInstruction(instruction);
    });
  }

  extendAlongInstruction(instruction: string) {
    const direction = instruction[0];
    const extensionLength = parseInt(instruction.substr(1), 10);
    for (let i = 0; i < extensionLength; i++) {
      switch (direction) {
        case 'R': {
          this.currentX += 1;
          break;
        }
        case 'D': {
          this.currentY -= 1;
          break;
        }
        case 'L': {
          this.currentX -= 1;
          break;
        }
        case 'U': {
          this.currentY += 1;
          break;
        }
        default: {
          throw new Error();
        }
      }
      this.points.push(new Point(this.currentX, this.currentY));
    }
  }

  findIntersects(wire2: Wire) {
    return this.points.filter((point1) => intersectsWithWire(point1, wire2));
  }

  findStepsToPoint(targetPoint: Point): number {
    for (let i = 0; i < this.points.length; i++) {
      const point = this.points[i];
      if (point.isAt(targetPoint)) {
        const stepsToPoint = i + 1;
        return stepsToPoint;
      }
    }
    throw new Error(
      `Wire does not contain targetPoint ${targetPoint.x}, ${targetPoint.y}`,
    );
  }
}
