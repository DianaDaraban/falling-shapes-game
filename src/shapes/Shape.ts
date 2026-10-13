import { Graphics } from 'pixi.js'

abstract class Shape extends Graphics {
  velocityY = 0

  abstract draw(): void

  abstract get area(): number

  update(seconds: number, gravity: number) {
    this.velocityY += seconds * gravity
    this.y += this.velocityY * seconds
  }
}

export default Shape
