
export default function Dashboard() {
  return (
    <div className="dashboard-page">
      {/* LEFT: DET NYESTE */}
      <div className="dash-left">
        <div className="card">
          <h2>Det nyeste:</h2>

          <div className="news-item">
            <h3>Nytt lag opprettet</h3>
            <p>
              {`{navn}`} har opprettet ny gruppe med {`{navn}`}
            </p>
            <button>Les mer</button>
          </div>

          <div className="news-item">
            <h3>Nytt prosjekt opprettet</h3>
            <p>
              {`{team}`} har opprettet nytt prosjekt {`{navn}`}
            </p>
            <button>Les mer</button>
          </div>

          <div className="news-item">
            <h3>Nye filer tilgjengelig</h3>
            <p>{`{navn}`} har lastet opp nye filer</p>
            <button>Se filer</button>
          </div>

          <div className="news-item">
            <h3>Rolle endring</h3>
            <p>
              {`{navn}`} er nå leder av {`{team}`}
            </p>
            <button>Les mer</button>
          </div>
        </div>
      </div>

      {/* MIDDLE: SNARVEIER */}
      <div className="dash-center">
        <div className="card">
          <h2>Snarveier:</h2>

          <div className="shortcut-grid">
            <a className="shortcut" href="/canvas">
              <h3>Tegn</h3>
              <img src="../src/app/pages/img/pen.png" alt="Tegn" />
            </a>
            <div className="shortcut">
              <h3>Søk</h3>
              <img src="../src/app/pages/img/search.png" alt="Søk" />
            </div>
            <a className="shortcut" href="/files">
              <h3>Filer</h3>
              <img src="../src/app/pages/img/files.png" alt="Filer" />
            </a>
            <a className="shortcut" href="/idea">
              <h3>Idéer</h3>
              <img src="../src/app/pages/img/ideas.png" alt="Ideer" />
            </a>
          </div>
        </div>
      </div>

      {/* RIGHT: BIG + CARD */}
      <div className="dash-right">
        <div className="add-card">
          <div className="plus">+</div>
        </div>
      </div>
    </div>
  );
}
