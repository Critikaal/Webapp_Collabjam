import React from 'react';

function PokemonCard({ id, name, type1, type2 }) {
  return (
    <section>
      <img src="src/assets/img/001.png" alt={name} />
      <p>#{id.toString().padStart(4, '0')}</p>
      <h2><a href="">{name}</a></h2>
      <p>{type1}</p>
      <p>{type2}</p>
    </section>
  );
}

export default PokemonCard;
