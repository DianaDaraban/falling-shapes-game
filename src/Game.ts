import { Application, Container, Graphics } from 'pixi.js'
import { CONSTANTS } from './constants'
import Triangle from './shapes/Triangle'
import type Shape from './shapes/Shape'
import { randomNumber } from './utils/randomNumber'

class Game {
  #app: Application = new Application()
  #scene: Container = new Container({ isRenderGroup: true })
  #shapes: Shape[] = []
  #shapesPerSecond = CONSTANTS.defaultShapesPerSecond
  #secondsSinceLastShape = 0

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

  #removeShape(shape: Shape) {
    this.#scene.removeChild(shape)
    this.#shapes = this.#shapes.filter((item) => item !== shape)
    shape.destroy({ context: true })
  }

  #generateShape(x?: number, y?: number) {
    const triangle = new Triangle(
      CONSTANTS.shapeSize,
      CONSTANTS.shapeSize,
      x ??
        randomNumber(
          CONSTANTS.playAreaX + CONSTANTS.shapeSize / 2,
          CONSTANTS.playAreaWidth +
            CONSTANTS.playAreaX -
            CONSTANTS.shapeSize / 2,
        ),
      y ?? CONSTANTS.playAreaY - CONSTANTS.shapeSize / 2,
      'green',
    )

    this.#scene.addChild(triangle)
    this.#shapes.push(triangle)

    triangle.eventMode = 'static'
    triangle.on('pointerdown', () => {
      this.#removeShape(triangle)
    })
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

    playArea.eventMode = 'static'
    playArea.on('pointerdown', (event) => {
      this.#generateShape(event.global.x, event.global.y)
    })

    this.#scene.addChild(playArea)
    this.#scene.mask = mask

    this.#app.stage.addChild(this.#scene)

    this.#app.ticker.add((ticker) => {
      const seconds = ticker.deltaMS / 1000
      this.#secondsSinceLastShape += seconds
      const secondsBetweenShapes = 1 / this.#shapesPerSecond

      if (this.#secondsSinceLastShape >= secondsBetweenShapes) {
        this.#generateShape()
        this.#secondsSinceLastShape = 0
      }
      for (let i = this.#shapes.length - 1; i >= 0; i--) {
        const shape = this.#shapes[i]
        if (
          shape.getBounds().minY <=
          CONSTANTS.playAreaY + CONSTANTS.playAreaHeight
        ) {
          shape.update(seconds, CONSTANTS.defaultGravity)
        } else {
          this.#removeShape(shape)
        }
      }
    })
  }
}
export default Game
