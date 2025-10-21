import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Pokemon from './components/Pokemon';
import Pokemons from './components/Pokemons';
import Teams from './components/Teams';
import Team from './components/Team';
import Type from './components/Type';
import SearchResults from './components/SearchResults';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Pokemons />} />
          <Route path="/searchresults/:query" element={<SearchResults />} />
          <Route path="pokemon/:id" element={<Pokemon />} />
          <Route path="teams" element={<Teams />} />
          <Route path="team/:id" element={<Team />} />
          <Route path="type/:type" element={<Type />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
