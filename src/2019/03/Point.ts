export default class Point {
  public x: number;

  public y: number;

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  isAt(point: Point) {
    return this.x === point.x && this.y === point.y;
  }

  manhattanDistanceToOrigin() {
    return Math.abs(this.x) + Math.abs(this.y);
  }
}
