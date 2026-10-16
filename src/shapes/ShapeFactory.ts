import { CONSTANTS, SHAPE_COLORS } from '../constants'
import { regularPolygonPoints, starPoints } from '../utils/polygonHelpers'
import PolygonShape from './PolygonShape'
import Shape from './Shape'
import CircleShape from './CircleShape'
import EllipseShape from './EllipseShape'
import { randomInt } from '../utils/randomNumber'
type ShapeCreator = (x: number, y: number, color: string) => Shape

class ShapeFactory {
  static #radius: number = CONSTANTS.shapeSize / 2
  static #creators: ShapeCreator[] = [
    (x, y, color) =>
      new PolygonShape(regularPolygonPoints(3, this.#radius), x, y, color),
    (x, y, color) =>
      new PolygonShape(regularPolygonPoints(4, this.#radius), x, y, color),
    (x, y, color) =>
      new PolygonShape(regularPolygonPoints(5, this.#radius), x, y, color),
    (x, y, color) =>
      new PolygonShape(regularPolygonPoints(6, this.#radius), x, y, color),
    (x, y, color) =>
      new PolygonShape(
        starPoints(5, this.#radius, this.#radius / 2),
        x,
        y,
        color,
      ),
    (x, y, color) => new CircleShape(this.#radius, x, y, color),
    (x, y, color) =>
      new EllipseShape(this.#radius, this.#radius / 2, x, y, color),
  ]
  static create(x: number, y: number): Shape {
    const creator = this.#creators[randomInt(0 ,this.#creators.length)]
    const color = SHAPE_COLORS[randomInt(0,SHAPE_COLORS.length)]

    return creator(x, y, color)
  }
}

export default ShapeFactory
