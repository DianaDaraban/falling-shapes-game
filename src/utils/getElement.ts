export function getElement(selector: string): HTMLElement {
    const element = document.querySelector<HTMLElement>(selector)
    if (!element) throw new Error(`${selector} not found`)
    return element
  }