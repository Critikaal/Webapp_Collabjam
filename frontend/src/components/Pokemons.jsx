import React from 'react';
import PokemonList from './PokemonList';
import TypeButtons from './TypeButtons';

export default function Pokemons() {
  return (
    <>
        <h1>Pokémons</h1>
        <PokemonList />
        <TypeButtons />
    </>
  );
}
