import { FlagTypes, TypeFlags } from '../contants';

export const createEmptyData = (width, height) => {
  return Array(height).fill(0).map(() => Array(width).fill(0));
}

export const flagToClassName = (flag) => {
  if (flag === 0) {
    return '';
  }
  return FlagTypes.get(flag);
}

export const isMovableType = (type) => !(TypeFlags[type] & 1);

/**
 * 5 1 6
 * 2 # 4
 * 7 3 8
 */
const around1RelativePoints = [
  { x: 0, y: -1}, { x: -1, y: 0}, { x: 0, y: 1}, { x: 1, y: 0}, { x: -1, y: -1}, { x: 1, y: -1}, { x: -1, y: 1},
  { x: 1, y: 1}
];

/**
 * 3  1  4  5  7
 * 2  #  #  #  6
 * 8  #  #  #  13
 * 9  #  #  #  14
 * 11 10 12 15 16
 */
const around2RelativePoints = [
  {x: -1, y: -2}, {x: -2, y: -1}, {x: -2, y: -2}, {x: 0, y: -2}, {x: 1, y: -2}, {x: 2, y: -1}, {x: 2, y: -2},
  {x: -2, y: 0}, {x: -2, y: 1}, {x: -1, y: 2}, {x: -2, y: 2}, {x: 0, y: 2}, {x: 2, y: 0}, {x: 2, y: 1}, {x: 1, y: 2},
  {x: 2, y: 2}
];

const aroundRelativePoints = [...around1RelativePoints, ...around2RelativePoints];
/**
 * 坐标顺序
 * @param target
 */
export const getTargetAroundPoint = (target) => {
  return aroundRelativePoints.map((relativePoints) => ({
    x: target.x + relativePoints.x,
    y: target.y + relativePoints.y
  }))
};

const types = Object.keys(TypeFlags);
console.log(types, 'types')
export const getRandomType = (exclude = []) => {
  let type;
  do {
    type = types[~~(Math.random() * types.length)]
  } while (exclude.includes(type))
  return type;
}

const movableTypes = types.filter(isMovableType);
console.log(movableTypes, 'movableTypes')
export const getRandomMovableType = (exclude = []) => {
  let type;
  do {
    type = movableTypes[~~(Math.random() * movableTypes.length)]
  } while (exclude.includes(type))
  return type;
}

export const getImmovableCount = (points, data) => {
  return points.reduce((prev, cur) => {
    return prev + (isMovableType(data[cur.y][cur.x]) ? 0 : 1);
  }, 0);
}