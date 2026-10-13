import { Application, Container, Graphics } from 'pixi.js'
import { CONSTANTS } from './constants'
import Triangle from './shapes/Triangle'

class Game {
  #app: Application = new Application()
  #scene: Container = new Container({ isRenderGroup: true })

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

    const playArea = new Graphics()
    playArea
      .rect(
        CONSTANTS.playAreaX,
        CONSTANTS.playAreaY,
        CONSTANTS.playAreaWidth,
        CONSTANTS.playAreaHeight,
      )
      .fill(CONSTANTS.playAreaColor)

    const triangle = new Triangle(
      50,
      50,
      400,
      CONSTANTS.playAreaY - 25,
      '#ff0000',
    ).stroke({ width: 2, color: 0x000000 })

    this.#scene.addChild(playArea)
    this.#scene.addChild(triangle)

    this.#app.stage.addChild(this.#scene)

    this.#app.ticker.add((ticker) => {
      triangle.update(ticker.deltaMS / 1000, CONSTANTS.initialGravity)
    })
  }
}
export default Game
