import { Application, Container } from 'pixi.js'
import { CONSTANTS } from './constants'

class Game {
  #app: Application = new Application()
  #container: Container = new Container()

  async init() {
    await this.#app.init({
      width: CONSTANTS.width,
      height: CONSTANTS.height,
      background: CONSTANTS.backgroundColor,
      resolution: window.devicePixelRatio,
      autoDensity: true,
    })
    const appElem = document.querySelector('#app')
    if(!appElem) throw new Error('#app element not found')
    appElem.appendChild(this.#app.canvas)
  }
}
export default Game
