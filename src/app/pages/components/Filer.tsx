import React from "react";

export default function Files() {
  return (
    <div className="files-page">
      {/* LEFT — Folders */}
      <div className="files-left">
        <div className="card">
          <h2>Mapper</h2>

          <div className="folder-item">📁 Skisser</div>
          <div className="folder-item">📁 Prototyper</div>
          <div className="folder-item">📁 Dokumenter</div>
          <div className="folder-item">📁 Eksport</div>

          <button className="see-more-btn">Ny mappe</button>
        </div>
      </div>

      {/* CENTER — File list */}
      <div className="files-center">
        <div className="card tall">
          <h2>Filer</h2>

          <div className="file-row">
            <div>
              <h3>wireframe_v2.png</h3>
              <p>Lastet opp av Oskar • i går</p>
            </div>
            <button>Åpne</button>
          </div>

          <div className="file-row">
            <div>
              <h3>ideer.svg</h3>
              <p>Lastet opp av Jonas • 2 dager siden</p>
            </div>
            <button>Åpne</button>
          </div>

          <div className="file-row">
            <div>
              <h3>rapport.pdf</h3>
              <p>Lastet opp av Team • 1 uke siden</p>
            </div>
            <button>Åpne</button>
          </div>
        </div>
      </div>

      {/* RIGHT — Upload */}
      <div className="files-right">
        <div className="add-card">
          <div className="plus">+</div>
        </div>

        <div className="card">
          <h2>Last opp</h2>
          <p>Dra filer hit eller trykk knappen.</p>
          <button>Velg filer</button>
        </div>
      </div>
    </div>
  );
}
