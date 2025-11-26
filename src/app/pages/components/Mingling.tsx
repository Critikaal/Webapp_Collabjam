
export default function Mingling() {
  return (
    <div className="mingling-page">
      {/* LEFT COLUMN — Active rooms */}
      <div className="mingling-left">
        <div className="card">
          <h2>Aktive rom</h2>

          <div className="room-item">
            <div className="room-info">
              <h3>Game Jam Lobby</h3>
              <p>4 personer • Voice + Chat</p>
            </div>
            <button>Bli med</button>
          </div>

          <div className="room-item">
            <div className="room-info">
              <h3>UI Brainstorm</h3>
              <p>2 personer • Chat</p>
            </div>
            <button>Bli med</button>
          </div>

          <div className="room-item">
            <div className="room-info">
              <h3>Pitch Corner</h3>
              <p>5 personer • Voice</p>
            </div>
            <button>Bli med</button>
          </div>

          <button className="see-more-btn">Se flere rom</button>
        </div>
      </div>

      {/* CENTER COLUMN — Feed */}
      <div className="mingling-center">
        <div className="card tall">
          <h2>Mingling-feed</h2>

          <div className="feed-item">
            <h3>Oskar startet et rom</h3>
            <p>“UI Brainstorm” er nå åpent.</p>
            <button>Gå til rom</button>
          </div>

          <div className="feed-item">
            <h3>Jonas delte en idé</h3>
            <p>Ny skisse i “Collabjam App”.</p>
            <button>Se idé</button>
          </div>

          <div className="feed-item">
            <h3>Ny fil lagt til</h3>
            <p>wireframe_v2.png ble lastet opp.</p>
            <button>Se fil</button>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN — Create / actions */}
      <div className="mingling-right">
        <div className="add-card">
          <div className="plus">+</div>
        </div>

        <div className="card">
          <h2>Hurtigvalg</h2>
          <div className="action-list">
            <button>Opprett rom</button>
            <button>Start voice</button>
            <button>Inviter team</button>
          </div>
        </div>
      </div>
    </div>
  );
}
