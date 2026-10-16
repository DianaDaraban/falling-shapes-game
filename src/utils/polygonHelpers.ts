import { randomInt, randomNumber } from './randomNumber'

function pointOnCircle(radius: number, angle: number):number[] {
  const x = radius * Math.cos(angle)
  const y = radius * Math.sin(angle)
  return [x, y]
}

export function polygonArea(points: number[]): number {
  let sum = 0
  const n = points.length / 2

  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n
    const x = points[2 * i]
    const y = points[2 * i + 1]
    const xNext = points[2 * j]
    const yNext = points[2 * j + 1]

    sum += x * yNext - xNext * y
  }

  return Math.abs(sum) / 2
}

export function regularPolygonPoints(sides: number, radius: number): number[] {
  const points: number[] = []
  const step = (2 * Math.PI) / sides
  for (let i = 0; i < sides; i++) {
    const angle = i * step - Math.PI / 2
    points.push(...pointOnCircle(radius, angle))
  }
  return points
}

export function irregularPolygonPoints(maxRadius: number): number[] {
  const points: number[] = []
  const angles: number[] = []
  const n = randomInt(5, 10)

  for (let i = 0; i < n; i++) {
    angles.push(randomNumber(0, 2 * Math.PI))
  }
  angles.sort((a, b) => a - b)

  angles.forEach((angle) => {
    const radius = randomNumber(0.4 * maxRadius, maxRadius)
    points.push(...pointOnCircle(radius, angle))
  })

  return points
}

export function starPoints(
  spikes: number,
  outerRadius: number,
  innerRadius: number,
): number[] {
  const points: number[] = []
  for (let i = 0; i < 2 * spikes; i++) {
    const angle = i * (Math.PI / spikes) - Math.PI / 2
    const radius = i % 2 === 0 ? outerRadius : innerRadius
    points.push(...pointOnCircle(radius, angle))
  }
  return points
}
