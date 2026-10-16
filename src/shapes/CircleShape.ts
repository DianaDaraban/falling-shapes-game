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

// const gradient = new FillGradient({
//   end: { x: 1, y: 0 },
//   colorStops: [
//     { offset: 0, color: 0xff0000 }, // Red at start
//     { offset: 0.5, color: 0x00ff00 }, // Green at middle
//     { offset: 1, color: 0x0000ff }, // Blue at end
//   ],
// })

// graphics.circle(250, 100, 40).fill({ fill: gradient })
