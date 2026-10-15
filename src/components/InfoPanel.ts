class InfoPanel {
  #counterElement: HTMLElement
  #areaElement: HTMLElement
  constructor() {
    const counter = document.querySelector<HTMLElement>('#shapes_counter')
    const area = document.querySelector<HTMLElement>('#shapes_area')
    if (!counter) throw new Error('#shapes_counter not found')
    if (!area) throw new Error('#shapes_area not found')
    this.#counterElement = counter
    this.#areaElement = area
  }
  update(count: number, area: number) {
    this.#counterElement.textContent = `${count}`
    this.#areaElement.textContent = `${Math.round(area)}`
  }
}

export default InfoPanel
