// Importerer nødvendige moduler og hooks fra React og React Router.
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

// Funksjonell komponent for å vise detaljer om en Pokémon.
function Pokemon() {
  // Henter id-parameteren fra URL-en ved hjelp av useParams-hooken.
  const { id } = useParams();
  // Tilstand for å lagre Pokémon-data og evne-detaljer.
  const [pokemon, setPokemon] = useState(null);
  const [abilityDetails, setAbilityDetails] = useState([]);

  // useEffect for å hente Pokémon-data og evne-detaljer når komponenten lastes eller id endres.
  useEffect(() => {
    // Asynkron funksjon for å hente Pokémon-data og evne-detaljer.
    async function fetchPokemon() {
      try {
        // Henter Pokémon-data fra PokeAPI ved hjelp av Pokémon-id'en.
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        setPokemon(response.data);

        // Henter detaljer for hver evne.
        const abilityPromises = response.data.abilities.map(async (ability) => {
          const abilityResponse = await axios.get(ability.ability.url);
          return abilityResponse.data;
        });

        // Venter på at alle evne-detaljene skal bli hentet før de blir satt i tilstanden.
        const abilityData = await Promise.all(abilityPromises);
        setAbilityDetails(abilityData);
      } catch (error) {
        console.error('Error fetching Pokemon:', error);
      }
    }
    fetchPokemon(); // Kaller funksjonen for å hente Pokémon-data og evne-detaljer.
  }, [id]); // useEffect vil kjøre på nytt hvis id endres.

  // Returnerer "Loading..." hvis Pokémon-data ikke er lastet ennå.
  if (!pokemon) {
    return <div>Loading...</div>;
  }

  // Returnerer JSX som viser detaljer om Pokémon-en.
  return (
    <>
      {/* Viser Pokémon-navnet */}
      <h1>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h1>
      {/* Viser Pokémon-bildet */}
      <section id='pokemonimage'>
        <img src={pokemon.sprites.other.dream_world.front_default} alt={pokemon.name} />
      </section>
      <section>
        {/* Viser Pokémon-typene */}
        <section id='types'>
          <h2>Type(s)</h2>
          {pokemon.types.map(typeInfo => (
            <button className={`${typeInfo.type.name.toLowerCase()}`} key={typeInfo.type.name}>
              {/* Lenke til siden for denne typen */}
              <Link to={`/type/${typeInfo.type.name}`}>
                {/* Viser typens bilde og navn */}
                <img src={`/src/assets/img/${typeInfo.type.name}.png`} alt={typeInfo.type.name} />
                <a>{typeInfo.type.name}</a>
              </Link>
            </button>
          ))}
        </section>
        {/* Viser Pokémon-statistikk */}
        <section id='stats'>
          <h2>Stats</h2>
          {pokemon.stats.map(stat => (
            <section key={stat.stat.name}>
              <p id='statname'>{stat.stat.name}</p>
              <p>{stat.base_stat}</p>
            </section>
          ))}
        </section>
      </section>
      {/* Viser Pokémon-evnene */}
      <section>
        <h2>Abilities</h2>
        {abilityDetails.map(abilityInfo => (
          <section key={abilityInfo.name}>
            <p>{abilityInfo.name}: {abilityInfo.effect_entries[0].effect}</p>
          </section>
        ))}
      </section>
    </>
  );
}

export default Pokemon; // Eksporterer Pokemon-komponenten som standard eksport.
