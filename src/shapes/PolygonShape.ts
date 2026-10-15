import Shape from './Shape'

class PolygonShape extends Shape {
  readonly points: number[]
  readonly fillColor: string
  constructor(points: number[], x: number, y: number, fillColor: string) {
    super()
    this.points = points
    this.x = x
    this.y = y
    this.fillColor = fillColor
    this.draw()
  }

  draw(): void {
    this.poly(this.points).fill(this.fillColor)
  }

  get area(): number {
    let sum = 0
    const n = this.points.length / 2

    for (let i = 0; i < n; i++) {
      const j = (i + 1) % n
      const x = this.points[2 * i]
      const y = this.points[2 * i + 1]
      const xNext = this.points[2 * j]
      const yNext = this.points[2 * j + 1]

      sum += x * yNext - xNext * y
    }

    return Math.abs(sum) / 2
  }
}

export default PolygonShape
