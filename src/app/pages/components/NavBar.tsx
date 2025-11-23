"use client";
import React, { useState, useEffect } from "react";
function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function checkMobile() {
      setIsMobile(window.innerWidth <= 600);
      if (window.innerWidth > 600) setMenuOpen(false);
    }
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <nav>
      <section className="nav-left">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <a href="/"><img src="../src/app/pages/components/premier-ball.png" alt="LOGO" /></a>
        </div>

        <button
          className="nav-toggle"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {(!isMobile || menuOpen) && (
          <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <a href="/" onClick={() => setMenuOpen(false)}>Dashbord (virker)</a>
            <a href="/team" onClick={() => setMenuOpen(false)}>Team</a>
            <a href="/mingle" onClick={() => setMenuOpen(false)}>Mingling</a>
            <a href="/idea" onClick={() => setMenuOpen(false)}>Ideér</a>
            <a href="/files" onClick={() => setMenuOpen(false)}>Filer</a>
            <a href="/canvas" onClick={() => setMenuOpen(false)}>Canvas (virker)</a>
            <a href="/feedback" onClick={() => setMenuOpen(false)}>Feedback</a>
          </div>
        )}
      </section>
      <section className="pfp">
        <a href="/">🔔</a>
        <p>Velkommen, "name"</p>
        <a href="/"><img src="../src/app/pages/components/pfp.jpg" alt="pfp" /></a>
      </section>
    </nav>
  );
}

export default NavBar;