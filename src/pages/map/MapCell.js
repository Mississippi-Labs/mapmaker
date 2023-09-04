import React from 'react';

const MapCell = (props) => {
  const coordinate = props.coordinate;
  return (
    <div className={`mi-map-cell ${props.className ?? ''}`}>
      {coordinate.x}-{coordinate.y}
    </div>
  );
};

export default MapCell;