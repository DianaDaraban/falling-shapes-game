import { getElement } from '../utils/getElement'
class InfoPanel {
  #counterElement: HTMLElement
  #areaElement: HTMLElement
  constructor() {
    this.#counterElement = getElement('#shapes_counter')
    this.#areaElement = getElement('#shapes_area')
  }
  update(count: number, area: number) {
    this.#counterElement.textContent = `${count}`
    this.#areaElement.textContent = `${Math.round(area)}`
  }
}

export default InfoPanel
