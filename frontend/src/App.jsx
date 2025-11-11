import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Dashbord from './components/Dashbord';
import Canvas from './components/Canvas';
import Team from './components/Team';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashbord />} />
          <Route path="Canvas" element={<Canvas />} />
          <Route path="Team" element={<Team />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
