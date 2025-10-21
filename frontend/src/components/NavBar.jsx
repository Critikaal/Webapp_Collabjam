// Importer nødvendige moduler og komponenter fra React og React Router.
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Brukes for navigering til andre sider i programmet.
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importer ikonkomponenten fra FontAwesome biblioteket.
import { faBell } from '@fortawesome/free-solid-svg-icons'; // Importer et ikon fra FontAwesome ikonsett.

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
        {/* Logo */}
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/premier-ball.png" alt="LOGO" />
        {/* Lenke til hovedsiden */}
        <a href="/">Dashbord</a>
        {/* Lenke til teamsiden */}
        <a href="/teams">Team</a>
        {/* Lenke til mingling */}
        <a href="/teams">Mingling</a>
        {/* Lenke til ideér */}
        <a href="/teams">Ideér</a>
        {/* Lenke til filer */}
        <a href="/teams">Filer</a>
        {/* Lenke til nyheter */}
        <a href="/teams">Nyheter</a>
        {/* Lenke til feedback */}
        <a href="/teams">Feedback</a>
      </section>
      <section>
          <a href="/teams"><FontAwesomeIcon icon={faBell} /></a>
          <p>Velkommen, NAVN</p>
          <img src="../src/assets/img/pfp.jpg" alt="pfp" />
      </section>
    </nav>
  );
}

export default NavBar; // Eksporterer NavBar-komponenten som standard eksport.
