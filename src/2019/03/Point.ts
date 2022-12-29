export default class Point {
  constructor(public x: number, public y: number) {}

  isAt(point: Point) {
    return this.x === point.x && this.y === point.y;
  }

  manhattanDistanceToOrigin() {
    return Math.abs(this.x) + Math.abs(this.y);
  }
}
