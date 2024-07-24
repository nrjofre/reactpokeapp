import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import PokeGrid from './components/PokeGrid';
import Pokedex from './components/Pokedex';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/pokegrid" element={<PokeGrid />} />
          <Route path="/pokedex/:id" element={<Pokedex />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
