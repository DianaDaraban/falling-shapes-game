import { Application, Container, Graphics } from 'pixi.js'
import { CONSTANTS } from './constants'

class Game {
  #app: Application = new Application()
  #container: Container = new Container()

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
    this.#container.addChild(playArea)
    this.#app.stage.addChild(this.#container)
  }
}
export default Game
