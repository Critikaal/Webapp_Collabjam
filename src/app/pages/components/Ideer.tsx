
export default function Ideas() {
  return (
    <div className="ideas-page">
      {/* HEADER ROW */}
      <div className="ideas-header card">
        <h2>Idéer</h2>
        <div className="ideas-header-actions">
          <input placeholder="Søk i idéer..." />
          <select defaultValue="alle">
            <option value="alle">Alle</option>
            <option value="aktive">Aktive</option>
            <option value="ferdige">Ferdige</option>
          </select>
          <button>Ny idé</button>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="ideas-grid">
        <div className="card idea-card">
          <h3>Collabjam App v1</h3>
          <p>Skisse og funksjonsforslag.</p>
          <div className="idea-meta">
            <span>⭐ 6 / 10</span>
            <span>Av Oskar</span>
          </div>
          <button>Åpne</button>
        </div>

        <div className="card idea-card">
          <h3>Matchmaking Flow</h3>
          <p>Hvordan brukere finner hverandre.</p>
          <div className="idea-meta">
            <span>⭐ 8 / 10</span>
            <span>Av Jonas</span>
          </div>
          <button>Åpne</button>
        </div>

        <div className="card idea-card">
          <h3>UI / Theme</h3>
          <p>Fargevalg, typografi og layout.</p>
          <div className="idea-meta">
            <span>⭐ 5 / 10</span>
            <span>Av Team</span>
          </div>
          <button>Åpne</button>
        </div>

        {/* CREATE TILE */}
        <div className="add-card idea-add">
          <div className="plus">+</div>
        </div>
      </div>
    </div>
  );
}
