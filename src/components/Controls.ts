import { getElement } from "../utils/getElement"

type ChangeHandler = (direction: number) => void

type Handlers = {
  onShapesPerSecondChange: ChangeHandler
  onGravityChange: ChangeHandler
}

class Controls {
  #shapesPerSecondElement: HTMLElement
  #gravityElement: HTMLElement

  constructor(handlers: Handlers) {
    const shapesPerSecondDecrease = getElement('#shapes_per_second_decrease')

    const shapesPerSecondIncrease = getElement('#shapes_per_second_increase')
    const gravityDecrease = getElement('#gravity_decrease')
    const gravityIncrease = getElement('#gravity_increase')

    this.#handleCounter(
      shapesPerSecondDecrease,
      shapesPerSecondIncrease,
      handlers.onShapesPerSecondChange,
    )
    this.#handleCounter(
      gravityDecrease,
      gravityIncrease,
      handlers.onGravityChange,
    )

    this.#shapesPerSecondElement = getElement('#shapes_per_second_value')
    this.#gravityElement = getElement('#gravity_value')
  }



  #handleCounter(
    decrease: HTMLElement,
    increase: HTMLElement,
    onChange: ChangeHandler,
  ) {
    decrease.addEventListener('click', () => onChange(-1))
    increase.addEventListener('click', () => onChange(1))
  }

  update(shapesPerSecond: number, gravity: number) {
    this.#shapesPerSecondElement.textContent = `${shapesPerSecond}`
    this.#gravityElement.textContent = `${gravity}`
  }
}
export default Controls
