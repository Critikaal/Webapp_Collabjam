"use client";
import React, { useState } from "react";

function NavBar() {
  const [search, setSearch] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    window.location.href = `/searchresults/${encodeURIComponent(search)}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <nav>
      <section>
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/premier-ball.png"
          alt="LOGO"
        />
        <a href="/">Dashbord (virker)</a>
        <a href="/">Team</a>
        <a href="/">Mingling</a>
        <a href="/">Ideér</a>
        <a href="/">Filer</a>
        <a href="/canvas">Canvas (virker)</a>
        <a href="/">Feedback</a>
      </section>

      <section className="pfp">
        <form onSubmit={handleSubmit} style={{ display: "inline" }}>
          <input
            name="q"
            type="text"
            value={search}
            onChange={handleChange}
            placeholder="Søk..."
          />
          <button type="submit">Søk</button>
        </form>

        <a href="/">🔔</a>
        <p>Velkommen, NAVN</p>
        <a href="/"><img src="../src/assets/img/pfp.jpg" alt="pfp" /></a>
      </section>
    </nav>
  );
}

export default NavBar;