import { Application, Container, Graphics } from 'pixi.js'
import { CONSTANTS } from './constants'
import Triangle from './shapes/Triangle'
import type Shape from './shapes/Shape'
import { randomNumber } from './utils/randomNumber'

class Game {
  #app: Application = new Application()
  #scene: Container = new Container({ isRenderGroup: true })
  #shapes: Shape[] = []

  #createPlayAreaRect() {
    return new Graphics()
      .rect(
        CONSTANTS.playAreaX,
        CONSTANTS.playAreaY,
        CONSTANTS.playAreaWidth,
        CONSTANTS.playAreaHeight,
      )
      .fill(CONSTANTS.playAreaColor)
  }

  #generateShape() {
    const x = randomNumber(
      CONSTANTS.playAreaX + CONSTANTS.shapeSize / 2,
      CONSTANTS.playAreaWidth + CONSTANTS.playAreaX - CONSTANTS.shapeSize / 2,
    )
    const triangle = new Triangle(
      CONSTANTS.shapeSize,
      CONSTANTS.shapeSize,
      x,
      CONSTANTS.playAreaY - CONSTANTS.shapeSize / 2,
      'green',
    )

    this.#scene.addChild(triangle)
    this.#shapes.push(triangle)
  }

  async init() {
    await this.#app.init({
      width: CONSTANTS.canvasWidth,
      height: CONSTANTS.canvasHeight,
      background: CONSTANTS.backgroundColor,
      resolution: window.devicePixelRatio,
      autoDensity: true,
    })

    const appElem = document.querySelector('#app')
    if (!appElem) throw new Error('#app element not found')
    appElem.appendChild(this.#app.canvas)

    const playArea = this.#createPlayAreaRect()
    const mask = this.#createPlayAreaRect()

    this.#scene.addChild(playArea)
    this.#scene.mask = mask

    this.#generateShape()

    this.#app.stage.addChild(this.#scene)

    this.#app.ticker.add((ticker) => {
      for (let i = this.#shapes.length - 1; i >= 0; i--) {
        const shape = this.#shapes[i]
        if (
          shape.getBounds().minY <=
          CONSTANTS.playAreaY + CONSTANTS.playAreaHeight
        ) {
          shape.update(ticker.deltaMS / 1000, CONSTANTS.initialGravity)
        } else {
          this.#scene.removeChild(shape)
          this.#shapes.splice(i, 1)
          shape.destroy({ context: true })
        }
      }
    })
  }
}
export default Game
