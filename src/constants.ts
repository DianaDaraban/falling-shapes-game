export const COLORS = {
  canvasBackground: '#071a14',
  playArea: '#0f2e25',
  infoPanel: '#04110d',
  text: '#dde5f0',
  textSecondary: '#cad8eb',
  accent: '#9ef0c0',
}

export const SHAPE_COLORS: string[] = [
  '#ff6b6b',
  '#fbbf24',
  '#f472b6',
  '#38bdf8',
  '#a78bfa',
  '#2dd4bf',
]

const DESKTOP_LAYOUT = {
  canvasWidth: 800,
  canvasHeight: 660,
  playAreaX: 150,
  playAreaY: 140,
  playAreaWidth: 500,
  playAreaHeight: 380,
}

const phoneWidth = window.innerWidth - 16
const phoneHeight = window.innerHeight - 200

const PHONE_LAYOUT = {
  canvasWidth: phoneWidth,
  canvasHeight: phoneHeight,
  playAreaX: 8,
  playAreaY: 8,
  playAreaWidth: phoneWidth - 16,
  playAreaHeight: phoneHeight - 16,
}

const isPhone = window.matchMedia('(max-width: 38em)').matches

export const CONSTANTS = {
  ...(isPhone ? PHONE_LAYOUT : DESKTOP_LAYOUT),
  defaultGravity: 100,
  minGravity: 10,
  maxGravity: 320,
  gravityStep: 10,
  shapeSize: 50,
  defaultShapesPerSecond: 1,
  minShapesPerSecond: 1,
  maxShapesPerSecond: 12,
  shapesPerSecondStep: 1,
  roundRect: 8,
}
