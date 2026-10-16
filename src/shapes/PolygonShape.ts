import Shape from './Shape'
import { polygonArea } from '../utils/polygonHelpers'

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
    return polygonArea(this.points)
  }
}

export default PolygonShape
