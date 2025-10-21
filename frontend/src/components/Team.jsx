import React from 'react';
import PokemonCard from './PokemonCard';

export default function Team() {
  const pokemons = [
    { id: 145, name: 'Zapdos', type1: 'Electric', type2: 'Flying' },
    { id: 84, name: 'Doduo', type1: 'Normal', type2: 'Flying' },
    { id: 102, name: 'Exeggcute', type1: 'Grass', type2: 'Psychic' },
  ];

  return (
    <>
      <h1>Team Instinct (or whichever team you press)</h1>
      <h2>Pokémons (to be dynamic obviously)</h2>
      {pokemons.map(pokemon => (
        <PokemonCard key={pokemon.id} {...pokemon} />
      ))}
    </>
  );
}
