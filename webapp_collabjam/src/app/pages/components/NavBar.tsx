import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

function NavBar() {
  const [search, setSearch] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `/searchresults/${encodeURIComponent(search)}`;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <nav>
      <section>
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/premier-ball.png" alt="LOGO" />
        <a href="/">Dashbord (virker)</a>
        <a href="/">Team</a>
        <a href="/">Mingling</a>
        <a href="/">Ideér</a>
        <a href="/">Filer</a>
        <a href="/canvas">Canvas (virker)</a>
        <a href="/">Feedback</a>
      </section>

      <section className="pfp">
        <form onSubmit={handleSubmit} style={{ display: 'inline' }}>
          <input type="text" value={search} onChange={handleChange} placeholder="Søk..." />
          <button type="submit">Søk</button>
        </form>

        <a href="/"><FontAwesomeIcon icon={faBell} /></a>
        <p>Velkommen, NAVN</p>
        <a href="/"><img src="../src/assets/img/pfp.jpg" alt="pfp" /></a>
      </section>
    </nav>
  );
}

export default NavBar;