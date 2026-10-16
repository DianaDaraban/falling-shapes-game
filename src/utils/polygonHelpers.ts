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
    const x = radius * Math.cos(angle)
    const y = radius * Math.sin(angle)
    points.push(x, y)
  }
  return points
}

export function starPoints(
  spikes: number,
  outerRadius: number,
  innerRadius: number,
) {
  const points: number[] = []
  for (let i = 0; i < 2 * spikes; i++) {
    const angle = i * (Math.PI / spikes) - Math.PI / 2
    const radius = i % 2 === 0 ? outerRadius : innerRadius
    const x = radius * Math.cos(angle)
    const y = radius * Math.sin(angle)
    points.push(x, y)
  }
  return points
}
