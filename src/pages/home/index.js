import React, { useState } from 'react';
import './styles.scss';
import { Link } from 'react-router-dom';
import { Input, Slider } from 'antd';

const Home = () => {

  const [space, setSpace] = useState(30);
  const [grass, setGrass] = useState(30);
  const [water, setWater] = useState(30);
  const [stone, setStone] = useState(30);
  const [hole, setHole] = useState(30);

  return (
    <div className="home-wrapper">
      <h1>MAPMAKER</h1>
      <p>some message...</p>
      <ul className="cfg-list">
        <li>
          <img src="/assets/earth.png" alt="Space"/>
          <h3>Space</h3>
          <Input value={space} onChange={(e) => setSpace(e.target.value)}/>
        </li>
        <li>
          <img src="/assets/grass.png" alt="Grass"/>
          <h3>Grass</h3>
          <Slider value={grass} min={1} max={100} onChange={(value) => setGrass(value)}/>
        </li>
        <li>
          <img src="/assets/water.png" alt="Sea"/>
          <h3>Sea</h3>
          <Slider value={water} min={1} max={100} onChange={(value) => setWater(value)}/>
        </li>
        <li>
          <img src="/assets/stone.png" alt="Stone"/>
          <h3>Stone</h3>
          <Slider value={stone} min={1} max={100} onChange={(value) => setStone(value)}/>
        </li>
        <li>
          <img src="/assets/hole.png" alt="Hole"/>
          <h3>Hole</h3>
          <Slider value={hole} min={1} max={100} onChange={(value) => setHole(value)}/>
        </li>
      </ul>

      <Link
        to="/map"
        state={{
          hole,
          stone,
          water,
          grass,
          space
        }}
        className="go-map">GO</Link>
    </div>
  );
};

export default Home;