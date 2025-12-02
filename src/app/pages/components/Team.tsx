
export default function Teams() {
  return (
    <div className="team-page">
      {/* LEFT COLUMN */}
      <div className="col-left">
        {/* SNARVEIER */}
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

        {/* TEGNINGER */}
        <div className="card">
          <h2>Tegninger:</h2>
          <div className="drawing-grid">
            <img src="../src/app/pages/img/painting1.png" alt="" />
            <img src="../src/app/pages/img/painting2.png" alt="" />
            <img src="../src/app/pages/img/painting3.png" alt="" />
            <div className="see-more">Se mer</div>
          </div>
        </div>
      </div>

      {/* CENTER COLUMN — FILER */}
      <div className="col-center">
        <div className="card">
          <h2>Filer:</h2>

          <div className="file-item">
            <h3>Ny skisse opprettet</h3>
            <p>Ideer.svg lagt til av [BRUKER]</p>
            <button>Se fil</button>
          </div>

          <div className="file-item">
            <h3>Nytt tekst opprettet</h3>
            <p>tekst.pdf laget av [BRUKER]</p>
            <button>Se fil</button>
          </div>

          <button className="see-more-btn">Se mer</button>
        </div>

        {/* BIG ADD BUTTON */}
        <div className="add-card">
          <div className="plus">+</div>
        </div>
      </div>

      {/* RIGHT COLUMN — MEDLEMMER + DET NYESTE */}
      <div className="col-right">
        {/* MEDLEMMER */}
        <div className="card">
          <h2>Medlemmer:</h2>

          <h3 className="role">👑 Leder</h3>
          <div className="member">
            <img src="public/avatars/pfp2.jpg" alt="Oskar" />
            <span>Oskar</span>
          </div>

          <h3 className="role">🥈 Nest-leder</h3>
          <div className="member">
            <img src="public/avatars/pfp3.jpg" alt="Jonas" />
            <span>Jonas</span>
          </div>

          <h3 className="role">👨‍👩‍👧‍👦 Andre</h3>
          <div className="member">
            <img src="../src/app/pages/img/pfp.jpg" alt="Person 1" />
            <span>Person 1</span>
          </div>
          <div className="member">
            <img src="../src/app/pages/img/pfp.jpg" alt="Person 2" />
            <span>Person 2</span>
          </div>
          <div className="member">
            <img src="../src/app/pages/img/pfp.jpg" alt="Person 3" />
            <span>Person 3</span>
          </div>
          <div className="member">
            <img src="../src/app/pages/img/pfp.jpg" alt="Person 4" />
            <span>Person 4</span>
          </div>
        </div>

        {/* DET NYESTE */}
        <div className="card tall">
          <h2>Det nyeste:</h2>

          <div className="news-item">
            <h3>Nytt lag opprettet</h3>
            <p>Navn har opprettet ny gruppe</p>
            <button>Les mer</button>
          </div>

          <div className="news-item">
            <h3>Nytt prosjekt opprettet</h3>
            <p>Team har laget nytt prosjekt</p>
            <button>Les mer</button>
          </div>

          <div className="news-item">
            <h3>Nye filer tilgjengelig</h3>
            <p>[Navn] har lagt ut filer</p>
            <button>Se filer</button>
          </div>
        </div>
      </div>
    </div>
  );
}
