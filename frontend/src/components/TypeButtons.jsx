// Importer nødvendige moduler fra React og React Router.
import React from 'react';
import { Link } from 'react-router-dom';

// Funksjonell komponent for å vise knapper for ulike Pokémon-typer.
function TypeButtons() {
  // Liste over Pokémon-typer.
  const types = [
    'Normal', 'Fire', 'Water', 'Grass', 'Flying', 'Fighting', 'Poison', 'Electric',
    'Ground', 'Rock', 'Psychic', 'Ice', 'Bug', 'Ghost', 'Steel', 'Dragon', 'Dark', 'Fairy'
  ];

  // Returner JSX som viser en overskrift og en seksjon med knapper for hver type.
  return (
    <>
      <h1>Types</h1>
      <section id="types">
        {types.map(type => (
          <Link key={type} to={`/type/${type.toLowerCase()}`} className="type-link">
            <button className={`${type.toLowerCase()}`}>
              <img src={`src/assets/img/${type.toLowerCase()}.png`} alt={type} />
              <span>{type}</span>
            </button>
          </Link>
        ))}
      </section>
    </>
  );
}

export default TypeButtons;
