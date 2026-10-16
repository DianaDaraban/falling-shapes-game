import { Application, Container, Graphics } from 'pixi.js'
import { CONSTANTS, COLORS } from './constants'
import type Shape from './shapes/Shape'
import { randomNumber } from './utils/randomNumber'
import InfoPanel from './components/InfoPanel'
import ShapeFactory from './shapes/ShapeFactory'
import { getElement } from './utils/getElement'
import Controls from './components/Controls'

class Game {
  #app: Application = new Application()
  #scene: Container = new Container({ isRenderGroup: true })
  #infoPanel = new InfoPanel()
  #shapes: Shape[] = []
  #shapesPerSecond = CONSTANTS.defaultShapesPerSecond
  #secondsSinceLastShape = 0
  #gravity = CONSTANTS.defaultGravity
  #controls = new Controls({
    onShapesPerSecondChange: (direction) =>
      this.#changeShapesPerSecond(direction),
    onGravityChange: (direction) => this.#changeGravity(direction),
  })

  async #initApp() {
    await this.#app.init({
      width: CONSTANTS.canvasWidth,
      height: CONSTANTS.canvasHeight,
      background: COLORS.canvasBackground,
      backgroundAlpha: 0.9,
      resolution: window.devicePixelRatio,
      autoDensity: true,
    })

    const appElem = getElement('#app')
    appElem.appendChild(this.#app.canvas)
  }

  #setCssVariables() {
    const root = document.documentElement
    root.style.setProperty('--play-area-x', `${CONSTANTS.playAreaX}px`)
    root.style.setProperty('--play-area-y', `${CONSTANTS.playAreaY}px`)
    root.style.setProperty(
      '--bottom-band-height',
      `${((CONSTANTS.canvasHeight - CONSTANTS.playAreaY - CONSTANTS.playAreaHeight) / CONSTANTS.canvasHeight) * 100}%`,
    )
    root.style.setProperty(
      '--play-area-top',
      `${(CONSTANTS.playAreaY / CONSTANTS.canvasHeight) * 100}%`,
    )
    root.style.setProperty(
      '--play-area-width',
      `${(CONSTANTS.playAreaWidth / CONSTANTS.canvasWidth) * 100}%`,
    )
    root.style.setProperty('--canvas-width', `${CONSTANTS.canvasWidth}px`)

    Object.entries(COLORS).forEach((color) => {
      root.style.setProperty('--' + color[0], color[1])
    })
  }

  #createPlayArea() {
    const playArea = this.#createPlayAreaRect()
    const mask = this.#createPlayAreaRect()

    playArea.eventMode = 'static'
    playArea.on('pointerdown', (event) => {
      this.#addShape(
        ShapeFactory.createIrregular(event.global.x, event.global.y),
      )
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
        const randomX = randomNumber(
          CONSTANTS.playAreaX + CONSTANTS.shapeSize / 2,
          CONSTANTS.playAreaWidth +
            CONSTANTS.playAreaX -
            CONSTANTS.shapeSize / 2,
        )
        const randomY = CONSTANTS.playAreaY - CONSTANTS.shapeSize / 2

        this.#addShape(ShapeFactory.create(randomX, randomY))
        this.#secondsSinceLastShape = 0
      }
      for (let i = this.#shapes.length - 1; i >= 0; i--) {
        const shape = this.#shapes[i]
        if (
          shape.getBounds().minY <=
          CONSTANTS.playAreaY + CONSTANTS.playAreaHeight
        ) {
          shape.update(seconds, this.#gravity)
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
        CONSTANTS.roundRect,
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

  #addShape(shape: Shape) {
    this.#scene.addChild(shape)
    this.#shapes.push(shape)

    shape.eventMode = 'static'
    shape.on('pointerdown', () => {
      this.#removeShape(shape)
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

  #changeShapesPerSecond(direction: number) {
    const newShapesPerSecond =
      this.#shapesPerSecond + direction * CONSTANTS.shapesPerSecondStep
    this.#shapesPerSecond =
      newShapesPerSecond <= CONSTANTS.maxShapesPerSecond &&
      newShapesPerSecond >= CONSTANTS.minShapesPerSecond
        ? newShapesPerSecond
        : this.#shapesPerSecond

    this.#controls.update(this.#shapesPerSecond, this.#gravity)
  }

  #changeGravity(direction: number) {
    const newGravity = this.#gravity + direction * CONSTANTS.gravityStep
    this.#gravity =
      newGravity <= CONSTANTS.maxGravity && newGravity >= CONSTANTS.minGravity
        ? newGravity
        : this.#gravity

    this.#controls.update(this.#shapesPerSecond, this.#gravity)
  }

  async init() {
    await this.#initApp()
    this.#setCssVariables()
    this.#createPlayArea()
    this.#startTicker()
    this.#controls.update(this.#shapesPerSecond, this.#gravity)
  }
}
export default Game
