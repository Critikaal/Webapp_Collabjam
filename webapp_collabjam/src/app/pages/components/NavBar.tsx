"use client";
import React, { useState } from "react";
import '../index.css'

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
          src="../src/app/pages/components/premier-ball.png"
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

        <a href="/">🔔</a>
        <p>Velkommen, NAVN</p>
        <a href="/"><img src="../src/app/pages/components/pfp.jpg" alt="pfp" /></a>
      </section>
    </nav>
  );
}

export default NavBar;