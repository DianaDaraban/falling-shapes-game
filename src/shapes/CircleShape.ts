import Shape from './Shape'
class CircleShape extends Shape {
  readonly radius: number
  constructor(radius: number, x: number, y: number, fillColor: string) {
    super(x, y, fillColor)
    this.radius = radius
    this.draw()
  }
  draw(): void {
    this.circle(0, 0, this.radius).fill(this.fillColor)
  }
  get area(): number {
    return Math.PI * this.radius ** 2
  }
}

export default CircleShape
