import { FlagTypes, Side, TypeFlags } from '../contants';

export const createEmptyData = (width, height) => {
  return Array(height).fill(0).map(() => Array(width).fill(0));
}

export const flagToClassName = (flag) => {
  if (flag === 0) {
    return '';
  }
  return FlagTypes.get(flag);
}

export const isMovableType = (type) => !(TypeFlags[type] & 1) && (TypeFlags[type] !== TypeFlags.empty);
export const isMovableFlag = (type) => !(type & 1) && (type !== TypeFlags.empty);

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
export const getRandomType = (typeMap) => {
  const types = Object.keys(typeMap).filter(type => typeMap[type] > 0);
  return types[~~(Math.random() * types.length)];
}

const movableTypes = types.filter(isMovableType);
console.log(movableTypes, 'movableTypes')
export const getRandomMovableType = (typeMap) => {
  const types = Object.keys(typeMap).filter(type => typeMap[type] > 0 && isMovableType(type));
  return types[~~(Math.random() * types.length)];
}

export const getImmovableCount = (points, data) => {
  return points.reduce((prev, cur) => {
    const flag = data[cur.y][cur.x];
    if (flag === TypeFlags.empty || isMovableFlag(flag)) {
      return prev;
    }
    return prev + 1;
  }, 0);
};

export const expandMapData = (data, side) => {
  switch (side) {
    case Side.top:
      data.unshift(Array(data[0].length).fill(TypeFlags.empty));
      break;
    case Side.bottom:
      data.push(Array(data[0].length).fill(TypeFlags.empty));
      break;
    case Side.left:
      data.forEach((row) => {
        row.unshift(TypeFlags.empty);
      })
      break;
    default:
      data.forEach((row) => {
        row.push(TypeFlags.empty);
      })
  }
}