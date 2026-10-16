import Shape from './Shape'
import { polygonArea } from '../utils/polygonHelpers'

class PolygonShape extends Shape {
  readonly points: number[]
  constructor(points: number[], x: number, y: number, fillColor: string) {
    super(x, y, fillColor)
    this.points = points
    this.draw()
  }

  draw(): void {
    this.poly(this.points).fill(this.fillColor)
  }

  get area(): number {
    return polygonArea(this.points)
  }
}

export default PolygonShape
