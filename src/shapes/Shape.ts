import { Graphics } from 'pixi.js'

abstract class Shape extends Graphics {
  velocityY = 0
  readonly fillColor: string
  constructor(x: number, y: number, fillColor: string) {
    super()
    this.x = x
    this.y = y
    this.fillColor = fillColor
  }

  abstract draw(): void

  abstract get area(): number

  update(seconds: number, gravity: number) {
    this.velocityY += seconds * gravity
    this.y += this.velocityY * seconds
  }
}

export default Shape
