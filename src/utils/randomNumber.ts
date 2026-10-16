export function randomNumber(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

export function randomInt(min: number, max: number) {
  return Math.floor(randomNumber(min, max))
}
