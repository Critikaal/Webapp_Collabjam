// Importer nødvendige moduler og hooks fra React og React Router.
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

// Asynkron funksjon for å hente alle Pokémon-data fra API-et.
async function getAllPokemons() {
  const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1000');
  return response.data.results;
}

// Asynkron funksjon for å hente detaljer for en spesifikk Pokémon ved hjelp av URL.
async function getPokemonDetails(pokemonUrl) {
  const response = await axios.get(pokemonUrl);
  const { id, name, sprites } = response.data;
  return { id, name, sprite: sprites.front_default };
}

// Komponent for å vise søkeresultater.
function SearchResults() {
  // Hent søkespørringen fra URL-parameterne.
  const { query } = useParams();
  // Tilstandshooks for å lagre pokemons, filtrerte pokemons og lastestatus.
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect for å hente alle pokemons når komponenten monteres.
  useEffect(() => {
    async function fetchPokemons() {
      const allPokemons = await getAllPokemons();
      setPokemons(allPokemons);
      setLoading(false);
    }
    fetchPokemons();
  }, []);

  // useEffect for å filtrere pokemons basert på søkespørringen.
  useEffect(() => {
    async function filterPokemons() {
      if (query) {
        setLoading(true);
        // Filtrer pokemons basert på søkespørringen.
        const filteredResults = pokemons.filter(pokemon =>
          pokemon.name.toLowerCase().includes(query.toLowerCase())
        );
        // Hent detaljer for de filtrerte pokemons.
        const detailedPokemons = await Promise.all(filteredResults.map(pokemon => getPokemonDetails(pokemon.url)));
        setFilteredPokemons(detailedPokemons);
        setLoading(false);
      } else {
        // Nullstill filtrerte pokemons hvis det ikke er noen søkespørring.
        setFilteredPokemons([]);
      }
    }

    filterPokemons();
  }, [query, pokemons]);

  // Returner en "Loading..." melding mens data hentes.
  if (loading) {
    return <div>Loading...</div>;
  }

  // Returner listen over filtrerte pokemons eller en melding hvis ingen resultater.
  return (
    <section className='pokemon-list'>
      {filteredPokemons.length ? (
        filteredPokemons.map(pokemon => (
          <article key={pokemon.id}>
            <p>#{pokemon.id.toString().padStart(4, '0')}</p>
            <img src={pokemon.sprite} alt={pokemon.name} />
            <h2>
              <Link to={`/pokemon/${pokemon.name}`}>
                {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
              </Link>
            </h2>
          </article>
        ))
      ) : (
        <p>Det du søker etter finnes ikke.</p>
      )}
    </section>
  );
}

// Eksporter SearchResults-komponenten som standard eksport.
export default SearchResults;
