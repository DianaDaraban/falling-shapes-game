import Shape from './Shape'

class Triangle extends Shape {
  readonly triangleWidth: number
  readonly triangleHeight: number
  constructor(
    triangleWidth: number,
    triangleHeight: number,
    x: number,
    y: number,
    fillColor: string,
  ) {
    super(x, y, fillColor)
    this.triangleWidth = triangleWidth
    this.triangleHeight = triangleHeight
    this.draw()
  }

  draw() {
    this.poly([
      0,
      -this.triangleHeight / 2,
      this.triangleWidth / 2,
      this.triangleHeight / 2,
      -this.triangleWidth / 2,
      this.triangleHeight / 2,
    ]).fill(this.fillColor)
  }

  get area(): number {
    return (this.triangleWidth * this.triangleHeight) / 2
  }
}

export default Triangle
