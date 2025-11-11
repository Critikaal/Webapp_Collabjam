import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from '../../webapp_collabjam/src/app/pages/components/Layout';
import Dashbord from '../../webapp_collabjam/src/app/pages/components/Dashbord';
import Canvas from '../../webapp_collabjam/src/app/pages/components/Canvas';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashbord />} />
          <Route path="Canvas" element={<Canvas />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
