import Shape from './Shape'
class EllipseShape extends Shape {
  readonly radiusX: number
  readonly radiusY: number
  constructor(
    radiusX: number,
    radiusY: number,
    x: number,
    y: number,
    fillColor: string,
  ) {
    super(x, y, fillColor)
    this.radiusX = radiusX
    this.radiusY = radiusY
    this.draw()
  }
  draw(): void {
    this.ellipse(0, 0, this.radiusX, this.radiusY).fill(this.fillColor)
  }
  get area(): number {
    return Math.PI * this.radiusX * this.radiusY
  }
}
export default EllipseShape
