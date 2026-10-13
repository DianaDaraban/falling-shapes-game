import { Application, Container, Graphics } from 'pixi.js'
import { CONSTANTS } from './constants'
import Triangle from './shapes/Triangle'
import type Shape from './shapes/Shape'

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

    const triangle = new Triangle(
      50,
      50,
      400,
      CONSTANTS.playAreaY - 25,
      '#ff0000',
    ).stroke({ width: 2, color: 0x000000 })

    const secondTriangle = new Triangle(
      60,
      60,
      200,
      CONSTANTS.playAreaY - 25,
      '#ff0000',
    )

    this.#scene.addChild(playArea)
    this.#scene.mask = mask
    this.#scene.addChild(triangle)
    this.#scene.addChild(secondTriangle)
    this.#shapes.push(triangle)
    this.#shapes.push(secondTriangle)

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
