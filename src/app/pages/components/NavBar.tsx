"use client";

import { useEffect, useState } from "react";
import { getRandomProfile } from "../../actions/profile";

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Collapse/expand the nav based on viewport width
    function checkMobile() {
      setIsMobile(window.innerWidth <= 600);
      if (window.innerWidth > 600) setMenuOpen(false);
    }
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  type ProfileRow = {
    id: number;
    displayName: string;
    role: string | null;
    avatarKey: string;
  };
  
  // Static mapping to local avatar assets
  const avatarMap: Record<string, string> = {
    pfp1: "/avatars/pfp1.jpg",
    pfp2: "/avatars/pfp2.jpg",
    pfp3: "/avatars/pfp3.jpg",
  };
  
  const [profile, setProfile] = useState<ProfileRow | null>(null);

  useEffect(() => {
    // Fetch a random profile once on mount
    getRandomProfile().then((p) => {
      setProfile(p as ProfileRow);
    });
  }, []);

  const avatarSrc =
    (profile && avatarMap[profile.avatarKey]) || "/avatars/pfp1.jpg";

  return (
    <nav>
        <section className="nav-left">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <a href="/"><img src="../src/app/pages/img/logo.png" alt="LOGO" /></a>
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
              <a href="/" onClick={() => setMenuOpen(false)}>Dashbord</a>
              <a href="/team" onClick={() => setMenuOpen(false)}>Team</a>
              <a href="/mingle" onClick={() => setMenuOpen(false)}>Mingling</a>
              <a href="/idea" onClick={() => setMenuOpen(false)}>Ideér</a>
              <a href="/files" onClick={() => setMenuOpen(false)}>Filer</a>
              <a href="/canvas" onClick={() => setMenuOpen(false)}>Canvas</a>
              <a href="/feedback" onClick={() => setMenuOpen(false)}>Feedback</a>
            </div>
          )}
        </section>
        <section className="pfp">
          <a href="/">🔔</a>
          <p>Velkommen, {profile?.displayName ?? "Oskar"}</p>
          <a href="/profile"><img src={avatarSrc} alt="pfp" /></a>
        </section>
    </nav>
  );
}

export default NavBar;
