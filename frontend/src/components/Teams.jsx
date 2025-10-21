import React from 'react';

export default function Teams() {
  const teams = [
    { name: 'Team Instinct', image: 'src/assets/img/instinct.png' },
    { name: 'Team Valor', image: 'src/assets/img/instinct.png' },
    { name: 'Team Mystic', image: 'src/assets/img/instinct.png' },
  ];

  return (
    <>
      <h1>Teams</h1>
      {teams.map(team => (
        <section key={team.name}>
          <h2>{team.name}</h2>
          <img src={team.image} alt={team.name} />
        </section>
      ))}
    </>
  );
}
