import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  createEmptyData, expandMapData,
  flagToClassName, getImmovableCount,
  getRandomMovableType,
  getRandomType,
  getTargetAroundPoint, isMovableType
} from '../../utils';
import MapCell from './MapCell';

import './styles.scss';
import { LimitSpace, MaxImmovableCount, Side, TypeFlags } from '../../contants';

const Map = () => {

  const width = 21;
  const height = 11;

  const [vertexCoordinate, setVertexCoordinate] = useState({
    x: 0,
    y: 0
  })

  const { x: startX, y: startY } = vertexCoordinate;

  const [data, setData] = useState(createEmptyData(width, height));
  const [target, setTarget] = useState({
    x: 10,
    y: 5
  })
  const cellClassCache = useRef({});
  const { state } = useLocation();
  const cellTypeCount = useRef(state);

  const staticData = useMemo(() => {
    return Array(height).fill(0).map(_ => Array(width).fill(0));
  }, [width, height]);


  const init = () => {
    data[target.y][target.x] = TypeFlags.space;
    cellTypeCount.current.space--;
    setData([...data]);
  }

  const setAroundPoints = () => {
    const aroundPoints = getTargetAroundPoint(target);
    let lastImmovableCount = MaxImmovableCount - getImmovableCount([...aroundPoints, target], data);
    for (let point of aroundPoints) {
      if (data[point.y][point.x]) {
        continue;
      }
      let type = lastImmovableCount === 0 ? getRandomMovableType(cellTypeCount.current) : getRandomType(cellTypeCount.current);
      data[point.y][point.x] = TypeFlags[type];
      cellTypeCount.current[type]--;

      if (!isMovableType(type)) {
        lastImmovableCount--;
      }
    }
    setData([...data]);
  }

  const onKeyDown = (e) => {
    if (e.keyCode < 37 || e.keyCode > 40) {
      return;
    }
    switch (e.keyCode) {
      case 37:
        target.x--;
        if (target.x === LimitSpace) {
          expandMapData(data, Side.left);
          target.x++
        }
        if (target.x - vertexCoordinate.x === LimitSpace) {
          vertexCoordinate.x--;
        }
        break;
      case 38:
        target.y--;
        if (target.y === LimitSpace) {
          expandMapData(data, Side.top);
          target.y++;
        }
        if (target.y - vertexCoordinate.y === LimitSpace) {
          vertexCoordinate.y--;
        }
        break;
      case 39:
        target.x++;
        if (data[0].length - target.x === LimitSpace) {
          expandMapData(data, Side.right)
        }
        if (width - target.x + vertexCoordinate.x === LimitSpace) {
          vertexCoordinate.x++;
        }
        break;
      default:
        target.y++
        if (data.length - target.y === LimitSpace) {
          expandMapData(data, Side.bottom);
        }
        if (height - target.y + vertexCoordinate.y === LimitSpace) {
          vertexCoordinate.y++;
        }
        break;
    }
    setTarget({
      ...target
    });
    setVertexCoordinate({
      ...vertexCoordinate
    });
    setData([...data]);
    setAroundPoints();
  }

  useEffect(() => {
    init();
    setAroundPoints();
  }, []);

  console.log(vertexCoordinate);

  return (
    <div className="mi-map-wrapper" onKeyDown={onKeyDown} tabIndex={0}>
      <div className="tool-tip">
        <ul className="cfg-list">
          <li>
            <img src="../../assets/earth.png" alt="Space"/>
            <div className="type-count">{cellTypeCount.current.space}</div>
          </li>
          <li>
            <img src="../../assets/grass.png" alt="Grass"/>
            <div className="type-count">{cellTypeCount.current.grass}</div>
          </li>
          <li>
            <img src="../../assets/water.png" alt="Sea"/>
            <div className="type-count">{cellTypeCount.current.water}</div>
          </li>
          <li>
            <img src="../../assets/stone.png" alt="Stone"/>
            <div className="type-count">{cellTypeCount.current.stone}</div>
          </li>
          <li>
            <img src="../../assets/hole.png" alt="Hole"/>
            <div className="type-count">{cellTypeCount.current.hole}</div>
          </li>
        </ul>
        <div className="opt-wrapper">
          <button className="restart">Restart</button>
          <button className="back">Back</button>
        </div>
      </div>
      <div className="mi-map-content">
      {
        staticData.map((row, rowIndex) => {
          return (
            <div className="mi-map-row" key={startY + rowIndex}>
              {
                row.map((_, colIndex) => {
                  const x = startX + colIndex;
                  const y = startY + rowIndex;
                  const isTarget = x === target.x && y === target.y;
                  const typeClass = flagToClassName(data[y][x]);
                  return (
                    <MapCell
                      key={startX + colIndex}
                      coordinate={{
                        x,
                        y
                      }}
                      className={`${isTarget ? 'target' : ''} ${typeClass}`}
                      mapData={data}
                      cellClassCache={cellClassCache}
                    />
                  )
                })
              }
            </div>
          )
        })
      }
      </div>
    </div>
  );
};

export default Map;