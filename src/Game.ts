import { Application, Container, Graphics } from 'pixi.js'
import { CONSTANTS, COLORS, SHAPE_COLORS } from './constants'
import Triangle from './shapes/Triangle'
import type Shape from './shapes/Shape'
import { randomNumber } from './utils/randomNumber'
import InfoPanel from './components/InfoPanel'

class Game {
  #app: Application = new Application()
  #scene: Container = new Container({ isRenderGroup: true })
  #infoPanel = new InfoPanel()
  #shapes: Shape[] = []
  #shapesPerSecond = CONSTANTS.defaultShapesPerSecond
  #secondsSinceLastShape = 0

  async #initApp() {
    await this.#app.init({
      width: CONSTANTS.canvasWidth,
      height: CONSTANTS.canvasHeight,
      background: COLORS.canvasBackground,
      backgroundAlpha: 0.9,
      resolution: window.devicePixelRatio,
      autoDensity: true,
    })

    const appElem = document.querySelector('#app')
    if (!appElem) throw new Error('#app element not found')
    appElem.appendChild(this.#app.canvas)
  }

  #setCssVariables() {
    const root = document.documentElement
    root.style.setProperty('--play-area-x', `${CONSTANTS.playAreaX}px`)
    root.style.setProperty('--play-area-y', `${CONSTANTS.playAreaY}px`)

    Object.entries(COLORS).forEach(color => {
      root.style.setProperty('--' + color[0], color[1])
    })
  }

  #createPlayArea() {
    const playArea = this.#createPlayAreaRect()
    const mask = this.#createPlayAreaRect()

    playArea.eventMode = 'static'
    playArea.on('pointerdown', (event) => {
      this.#generateShape(event.global.x, event.global.y)
    })

    this.#scene.addChild(playArea)
    this.#scene.mask = mask

    this.#app.stage.addChild(this.#scene)
  }
  #startTicker() {
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

  #createPlayAreaRect() {
    return new Graphics()
      .roundRect(
        CONSTANTS.playAreaX,
        CONSTANTS.playAreaY,
        CONSTANTS.playAreaWidth,
        CONSTANTS.playAreaHeight,
        10,
      )
      .fill({ color: COLORS.playArea, alpha: 0.8 })
      .stroke({ width: 1, color: COLORS.textSecondary, alpha: 0.4 })
  }

  #removeShape(shape: Shape) {
    this.#scene.removeChild(shape)
    this.#shapes = this.#shapes.filter((item) => item !== shape)
    shape.destroy({ context: true })

    this.#updateInfoPanel()
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
      SHAPE_COLORS.shape1,
    )

    this.#scene.addChild(triangle)
    this.#shapes.push(triangle)

    triangle.eventMode = 'static'
    triangle.on('pointerdown', () => {
      this.#removeShape(triangle)
    })

    this.#updateInfoPanel()
  }

  #updateInfoPanel() {
    const shapesNumber = this.#shapes.length
    const shapesArea = this.#shapes.reduce((acc, shape) => {
      acc += shape.area
      return acc
    }, 0)

    this.#infoPanel.update(shapesNumber, shapesArea)
  }

  async init() {
    await this.#initApp()
    this.#setCssVariables()
    this.#createPlayArea()
    this.#startTicker()
  }
}
export default Game
