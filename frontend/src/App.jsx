import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Dashbord from "./components/Dashbord";
import Canvas from "./components/Canvas";
import Team from "./components/Team";
import Filer from "./components/Filer";
import Ideer from "./components/Ideer";
import Mingling from "./components/Mingling";
import Feedback from "./components/Feedback";
import Profile from "./components/Profil";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashbord />} />
          <Route path="Canvas" element={<Canvas />} />
          <Route path="Team" element={<Team />} />
          <Route path="Filer" element={<Filer />} />
          <Route path="Ideer" element={<Ideer />} />
          <Route path="Mingling" element={<Mingling />} />
          <Route path="Feedback" element={<Feedback />} />
          <Route path="Profil" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
