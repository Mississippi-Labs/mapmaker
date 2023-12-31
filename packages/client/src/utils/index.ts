import { Count2Weight, FlagTypes, Side, TypeFlags, Types } from '../contants';

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

export const getTypeByWeight = (types, adjacentTypeCount) => {
  let totalWeight = 0;
  const typesWeight = types.map((type) => {
    const weight = (adjacentTypeCount[type] && type !== Types.space) ? Count2Weight[adjacentTypeCount[type]] : 1;
    totalWeight += weight;
    return weight;
  });
  const random = Math.random();
  let temp = 0;
  const index = typesWeight.findIndex((weight) => {
    temp += weight;
    return random < temp / totalWeight;
  });
  return types[index];
}

export const getRandomType = (typeMap, adjacentTypeCount) => {
  const types = Object.keys(typeMap).filter(type => typeMap[type] > 0);
  types.push(Types.wall);
  return getTypeByWeight(types, adjacentTypeCount);
}

export const getRandomMovableType = (typeMap, adjacentTypeCount) => {
  const types = Object.keys(typeMap).filter(type => typeMap[type] > 0 && isMovableType(type));
  return getTypeByWeight(types, adjacentTypeCount);
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

const adjacentPoints = [
  { x: 0, y: -1}, { x: -1, y: 0}, { x: 0, y: 1}, { x: 1, y: 0}
];
export const getAdjacentTypeCount = (data, point) => {
  const count = {};
  adjacentPoints.forEach((item) => {
    const adjacentPoint = {
      x: point.x + item.x,
      y: point.y + item.y
    };
    const type = FlagTypes.get(data[adjacentPoint.y][adjacentPoint.x]);
    if (count[type]) {
      count[type]++
    } else {
      count[type] = 1;
    }
  });
  return count;
}

export const getFilledWallData = (data) => {
  data.forEach((row, y) => {
    row.forEach((flag, x) => {
      if (flag === TypeFlags.empty) {
        const aroundNotEmpty = around1RelativePoints.some((point) => {
          const relativePoint = {
            x: x + point.x,
            y: y + point.y
          };
          const relativeFlag = data[relativePoint.y]?.[relativePoint.x];
          return relativeFlag !== undefined && relativeFlag !== TypeFlags.empty && relativeFlag !== TypeFlags.wall;
        });
        if (aroundNotEmpty) {
          data[y][x] = TypeFlags.wall;
        }
      }
    });
  })
  return [...data];
}

export const getFormatMUDData = (data) => {
  const start = {
    x: data[0].findIndex((_, index) => data.some((row) => row[index] !== TypeFlags.empty)),
    y: data.findIndex((row) => row.some(flag => flag !== TypeFlags.empty))
  };

  const end = {
    x: data[0].findLastIndex((_, index) => data.some((row) => row[index] !== TypeFlags.empty)),
    y: data.findLastIndex((row) => row.some(flag => flag !== TypeFlags.empty)),
  };

  const mudData = data.slice(start.y, end.y + 1).map((row) => row.slice(start.x, end.x + 1)).flat();

  return {
    start,
    end,
    mudData
  }
}