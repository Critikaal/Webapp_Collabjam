// src/app/pages/components/Profil.tsx
"use client";

import { useEffect, useState } from "react";
import { getRandomProfile } from "../../actions/profile";

type ProfileRow = {
  id: number;
  displayName: string;
  role: string | null;
  avatarKey: string;
};

// 🔹 Nå peker vi direkte på filer i /public/avatars
const avatarMap: Record<string, string> = {
  pfp1: "/avatars/pfp1.jpg", // eller .jpg hvis det er filtype
  pfp2: "/avatars/pfp2.jpg",
  pfp3: "/avatars/pfp3.jpg",
};

export default function Profile() {
  const [profile, setProfile] = useState<ProfileRow | null>(null);

  useEffect(() => {
    getRandomProfile().then((p) => {
      setProfile(p as ProfileRow);
    });
  }, []);

  const avatarSrc =
    (profile && avatarMap[profile.avatarKey]) || "/avatars/pfp1.jpg";

  return (
    <div className="profile-page">
      <div className="card profile-header">
        <img
          className="profile-avatar"
          src={avatarSrc}
          alt="Profilbilde"
        />

        <div className="profile-info">
          <h3>{profile?.displayName ?? "Oskar"}</h3>
          <p>{profile?.role ?? "Frontend / UI • Collabjam Team"}</p>
        </div>

          <div className="profile-stats">
            <div>
              <h3>Idéer</h3>
              <span>12</span>
            </div>
            <div>
              <h3>Filer</h3>
              <span>34</span>
            </div>
            <div>
              <h3>Stemmer</h3>
              <span>58</span>
            </div>
          </div>
        </div>

        <button className="profile-edit">Rediger profil</button>

      {/* BOTTOM GRID */}
      <div className="profile-grid">
        {/* Recent activity */}
        <div className="card tall">
          <h2>Aktivitet</h2>

          <div className="profile-item">
            <h3>Ny idé opprettet</h3>
            <p>“Matchmaking Flow” • 2 dager siden</p>
            <button>Åpne</button>
          </div>

          <div className="profile-item">
            <h3>Ny fil lastet opp</h3>
            <p>wireframe_v2.png • i går</p>
            <button>Åpne</button>
          </div>
        </div>

        {/* Teams */}
        <div className="card tall">
          <h2>Team</h2>

          <div className="team-row">🎮 Collabjam Core</div>
          <div className="team-row">🧩 Jam Partners</div>
          <div className="team-row">🎨 UI Squad</div>

          <button className="see-more-btn">Se alle team</button>
        </div>

        {/* Settings */}
        <div className="card tall">
          <h2>Innstillinger</h2>

          <div className="settings-row">
            <span>E-postvarsler</span>
            <input type="checkbox" defaultChecked />
          </div>

          <div className="settings-row">
            <span>Privat profil</span>
            <input type="checkbox" />
          </div>

          <div className="settings-row">
            <span>Mørk modus</span>
            <input type="checkbox" />
          </div>

          <button className="profile-save">Lagre</button>
        </div>
      </div>
    </div>
  );
}
