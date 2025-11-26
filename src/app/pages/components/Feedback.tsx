
export default function Feedback() {
  return (
    <div className="feedback-page">
      {/* LEFT: Send feedback form */}
      <div className="feedback-left">
        <div className="card tall">
          <h2>Gi feedback</h2>

          <label className="fb-label">Type</label>
          <select className="fb-select" defaultValue="bug">
            <option value="bug">Bug / Feil</option>
            <option value="idea">Forslag / Idé</option>
            <option value="ui">Design / UI</option>
            <option value="other">Annet</option>
          </select>

          <label className="fb-label">Tittel</label>
          <input className="fb-input" placeholder="Kort tittel..." />

          <label className="fb-label">Beskrivelse</label>
          <textarea
            className="fb-textarea"
            placeholder="Forklar hva du mener, eller hva som skjedde..."
            rows={6}
          />

          <label className="fb-label">Prioritet</label>
          <div className="fb-radio-row">
            <label>
              <input type="radio" name="prio" defaultChecked /> Lav
            </label>
            <label>
              <input type="radio" name="prio" /> Medium
            </label>
            <label>
              <input type="radio" name="prio" /> Høy
            </label>
          </div>

          <button className="fb-submit">Send inn</button>
        </div>
      </div>

      {/* RIGHT: Recent feedback list */}
      <div className="feedback-right">
        <div className="card tall">
          <h2>Siste feedback</h2>

          <div className="fb-item">
            <div>
              <h3>Canvas lagrer ikke</h3>
              <p>Bug • Høy prioritet • Av Oskar</p>
            </div>
            <button>Se mer</button>
          </div>

          <div className="fb-item">
            <div>
              <h3>Legg til mørk modus</h3>
              <p>Forslag • Medium • Av Jonas</p>
            </div>
            <button>Se mer</button>
          </div>

          <div className="fb-item">
            <div>
              <h3>Bedre filtrering i Files</h3>
              <p>Idé • Lav • Av Team</p>
            </div>
            <button>Se mer</button>
          </div>

          <button className="see-more-btn">Se alle</button>
        </div>
      </div>
    </div>
  );
}
