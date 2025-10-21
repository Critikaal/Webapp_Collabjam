// Importer nødvendige moduler fra React og React Router.
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

// Asynkron funksjon for å hente Pokémon basert på type fra API-et.
async function getPokemonsByType(type) {
  const response = await axios.get(`https://pokeapi.co/api/v2/type/${type}`);
  return response.data.pokemon.map(p => p.pokemon);
}

// Funksjonell komponent som viser Pokémon basert på valgt type.
function Type() {
  // Hent typen fra URL-parameterne.
  const { type } = useParams();
  // Tilstandshooks for å lagre pokemons og lastestatus.
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect for å hente Pokémon basert på type når komponenten monteres eller når typen endres.
  useEffect(() => {
    // Asynkron funksjon for å hente detaljer for en spesifikk Pokémon.
    async function fetchPokemonDetails(pokemon) {
      const response = await axios.get(pokemon.url);
      const { id, name, sprites } = response.data;
      return { id, name, sprite: sprites.front_default };
    }

    // Asynkron funksjon for å hente Pokémon basert på type og deres detaljer.
    async function fetchPokemons() {
      setLoading(true); // Sett lastestatus til true.
      try {
        // Hent grunnleggende Pokémon-data basert på type.
        const basicPokemonData = await getPokemonsByType(type);
        // Hent detaljer for hver Pokémon.
        const detailedPokemonData = await Promise.all(basicPokemonData.map(fetchPokemonDetails));
        setPokemons(detailedPokemonData); // Oppdater tilstanden med detaljerte Pokémon-data.
      } catch (error) {
        console.error(error); // Logg eventuell feil.
      }
      setLoading(false); // Sett lastestatus til false.
    }

    fetchPokemons();
  }, [type]);

  // Returner en "Loading..." melding mens data hentes.
  if (loading) return <p>Loading...</p>;

  // Returner JSX som viser Pokémon basert på valgt type.
  return (
    <>
      <section id='typestitle'>
        <img src={`/src/assets/img/${type.toLowerCase()}.png`} alt={type} />
        <h1>{type.charAt(0).toUpperCase() + type.slice(1)}</h1>
      </section>

      <section className='pokemon-list'>
        {pokemons.map((pokemon) => (
          <article key={pokemon.id}>
            <p>#{pokemon.id.toString().padStart(4, '0')}</p>
            <img src={pokemon.sprite} alt={pokemon.name} />
            <h2>
              <Link to={`/pokemon/${pokemon.name}`}>
                {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
              </Link>
            </h2>
          </article>
        ))}
      </section>
    </>
  );
}

export default Type;
