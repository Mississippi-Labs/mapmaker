import React from 'react';
import { useLocation } from 'react-router-dom';

const Map = () => {
  const { state } = useLocation();

  console.log(state);

  return (
    <div>
    map
    </div>
  );
};

export default Map;