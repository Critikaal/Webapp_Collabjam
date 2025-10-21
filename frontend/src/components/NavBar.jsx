// Importer nødvendige moduler og komponenter fra React og React Router.
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Brukes for navigering til andre sider i programmet.
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importer ikonkomponenten fra FontAwesome biblioteket.
import { faSearch } from '@fortawesome/free-solid-svg-icons'; // Importer et ikon fra FontAwesome ikonsett.

// Funksjonell komponent som representerer navigasjonslinjen.
function NavBar() {
  // Tilstand for å lagre verdien av søkefeltet.
  const [search, setSearch] = useState('');
  // Hent navigate-funksjonen fra React Router for å navigere til andre sider.
  const navigate = useNavigate();

  // Funksjon som håndterer innsendingen av søket.
  const handleSubmit = (e) => {
    e.preventDefault(); // Forhindrer standardoppførselen til skjemainnsending.
    navigate(`/searchresults/${search}`); // Navigerer til søkeresultatsiden med søket som parameter.
  };

  // Funksjon som håndterer endringer i søkefeltet.
  const handleChange = (event) => {
    setSearch(event.target.value); // Oppdaterer tilstanden med verdien av søkefeltet.
  };

  // Returnerer JSX som representerer navigasjonslinjen.
  return (
    <nav>
      <section>
        {/* Pokeball-ikon */}
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" alt="pokeball" />
        {/* Lenke til hovedsiden */}
        <a href="/">UIN POKÉDEX</a>
        {/* Lenke til teamsiden */}
        <a href="/teams">TEAMS</a>
      </section>
      <section>
        {/* Skjema for søk */}
        <form onSubmit={handleSubmit} className='search'>
          {/* Inntastingsfelt for søk */}
          <input type="text" placeholder="Search for a Pokémon..." value={search} onChange={handleChange} />
          {/* Knapp for å sende inn søket */}
          <button type="submit"><FontAwesomeIcon icon={faSearch} /></button>
        </form>
      </section>
    </nav>
  );
}

export default NavBar; // Eksporterer NavBar-komponenten som standard eksport.
