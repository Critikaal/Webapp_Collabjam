// Importer axios-modulen for å utføre HTTP-forespørsler.
import axios from 'axios';

// Definerer basen for PokeAPI-endepunktene.
const PokeAPI = 'https://pokeapi.co/api/v2';

// Funksjon for å hente detaljert informasjon om en Pokémon basert på ID.
export const getPokemonById = async (id) => {
  try {
    // Utfører en GET-forespørsel til PokeAPI for å hente informasjon om en spesifikk Pokémon.
    const response = await axios.get(`${PokeAPI}/pokemon/${id}`);
    // Returnerer dataen for Pokémon-en.
    return response.data;
  } catch (error) {
    // Hvis det oppstår en feil under forespørselen, logges feilen og det returneres null.
    console.error('Error fetching Pokémon data:', error);
    return null;
  }
};

// Funksjon for å hente en liste over Pokémoner med begrenset antall.
export const getPokemons = async () => {
  try {
    // Utfører en GET-forespørsel til PokeAPI for å hente en begrenset liste over Pokémoner.
    const response = await axios.get(`${PokeAPI}/pokemon?limit=9`);
    // Returnerer resultatene fra forespørselen.
    return response.data.results;
  } catch (error) {
    // Hvis det oppstår en feil under forespørselen, logges feilen og det returneres en tom liste.
    console.error('Error fetching all Pokémon:', error);
    return [];
  }
};

// Funksjon for å hente en fullstendig liste over Pokémoner.
export const getAllPokemons = async () => {
  try {
    // Utfører en GET-forespørsel til PokeAPI for å hente en fullstendig liste over Pokémoner.
    const response = await axios.get(`${PokeAPI}/pokemon?limit=1025`);
    // Returnerer resultatene fra forespørselen.
    return response.data.results;
  } catch (error) {
    // Hvis det oppstår en feil under forespørselen, logges feilen og det returneres en tom liste.
    console.error('Error fetching all Pokémon:', error);
    return [];
  }
};
