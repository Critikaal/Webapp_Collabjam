// Importerer nødvendige moduler og funksjoner fra React og React Router.
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Importerer funksjoner for å hente Pokémon-data fra en ekstern API.
import { getPokemonById, getAllPokemons, getPokemons } from '../assets/api';

// Funksjonell komponent for å vise en liste over Pokémon.
function PokemonList() {
  // Tilstand for å lagre Pokémon-data.
  const [pokemons, setPokemons] = useState([]);

  // useEffect for å hente Pokémon-data når komponenten monteres.
  useEffect(() => {
    // Asynkron funksjon for å hente Pokémon-data.
    async function fetchPokemons() {
      // Henter alle Pokémon-navnene fra API-et.
      const allPokemons = await getPokemons();
      
      // For hvert Pokémon-navn, henter detaljert informasjon om Pokémon-en.
      const pokemonDetailsPromises = allPokemons.map(pokemon => getPokemonById(pokemon.name));
      
      // Venter på at alle detaljene skal bli hentet før de settes i tilstanden.
      const detailedPokemons = await Promise.all(pokemonDetailsPromises);
      
      // Oppdaterer tilstanden med detaljert Pokémon-data.
      setPokemons(detailedPokemons);
    }
    fetchPokemons(); // Kaller funksjonen for å hente Pokémon-data.
  }, []); // useEffect vil kun kjøre en gang ved montering av komponenten.

  // Returnerer "Loading..." hvis Pokémon-data ikke er lastet ennå.
  if (pokemons.length === 0) {
    return <div>Loading...</div>;
  }

  // Returnerer JSX som viser en liste over Pokémon.
  return (
    <section className='pokemon-list'>
      {pokemons.map(pokemon => (
        <article key={pokemon.id}>
          {/* Lenke til detaljsiden for hver Pokémon */}
          <Link to={`/pokemon/${pokemon.id}`}>
            {/* Viser Pokémon-bilde */}
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            {/* Viser Pokémon-nummer */}
            <p>#{pokemon.id.toString().padStart(4, '0')}</p>
            {/* Viser Pokémon-navn */}
            <h2>
              <Link to={`/pokemon/${pokemon.id}`}>
                {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
              </Link>
            </h2>
          </Link>
        </article>
      ))}
    </section>
  );
}

export default PokemonList; // Eksporterer PokemonList-komponenten som standard eksport.
