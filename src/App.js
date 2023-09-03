import { Routes, Route } from "react-router-dom";
import './App.css';
import Home from './pages/home';
import Map from './pages/map';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="map" element={<Map />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
