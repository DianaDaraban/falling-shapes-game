export function randomNumber(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

export function randomInt(max: number) {
  return Math.floor(Math.random() * max)
}
