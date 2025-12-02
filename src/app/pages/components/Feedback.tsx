// src/app/pages/components/Feedback.tsx
"use client";

import { useEffect, useState, useTransition } from "react";
import { createFeedback, listFeedback } from "../../actions/feedback";

type FeedbackItem = {
  id: string;
  type: string;
  message: string;
  createdAt: string | null;
};

const typeLabels: Record<string, string> = {
  bug: "Bug / Feil",
  idea: "Forslag / Idé",
  ui: "Design / UI",
  other: "Annet",
};

export default function Feedback() {
  const [items, setItems] = useState<FeedbackItem[]>([]);
  const [isPending, startTransition] = useTransition();

  // Hent eksisterende feedback når siden lastes
  useEffect(() => {
    listFeedback().then((rows) => {
      setItems(rows as unknown as FeedbackItem[]);
    });
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    startTransition(async () => {
      // 1) lagre i DB
      await createFeedback(formData);

      // 2) hente oppdatert liste
      const rows = await listFeedback();
      setItems(rows as unknown as FeedbackItem[]);
    });

    form.reset();
  }

  return (
    <div className="feedback-page">
      {/* VENSTRE: Skjema */}
      <div className="feedback-left">
        <div className="card tall">
          <h2>Gi feedback</h2>

          <form onSubmit={handleSubmit} className="feedback-form">
            <label className="fb-label" htmlFor="fb-type">
              Type
            </label>
            <select
              id="fb-type"
              name="type"
              className="fb-select"
              defaultValue="bug"
            >
              <option value="bug">Bug / Feil</option>
              <option value="idea">Forslag / Idé</option>
              <option value="ui">Design / UI</option>
              <option value="other">Annet</option>
            </select>

            <label className="fb-label" htmlFor="fb-message">
              Beskrivelse
            </label>
            <textarea
              id="fb-message"
              name="message"
              className="fb-textarea"
              placeholder="Beskriv hva som ikke fungerer, eller hva du ønsker å forbedre..."
              rows={6}
            />

            <button
              type="submit"
              className="primary-btn"
              disabled={isPending}
            >
              {isPending ? "Sender..." : "Send inn feedback"}
            </button>
          </form>
        </div>
      </div>

      {/* HØYRE: Liste med innsendt feedback */}
      <div className="feedback-right">
        <div className="card tall">
          <h2>Siste tilbakemeldinger</h2>

          {items.length === 0 && (
            <p className="fb-empty">
              Ingen tilbakemeldinger enda. Vær den første til å si ifra! ✨
            </p>
          )}

          {items.map((item) => {
            const label = typeLabels[item.type] ?? "Annet";
            const created =
              item.createdAt &&
              new Date(item.createdAt).toLocaleString("nb-NO", {
                dateStyle: "short",
                timeStyle: "short",
              });

            return (
              <div key={item.id} className="fb-item">
                <div>
                  <h3>{item.message}</h3>
                  <p>
                    {label}
                    {created ? ` • ${created}` : null}
                  </p>
                </div>
                <button type="button">Se mer</button>
              </div>
            );
          })}

          {items.length > 0 && (
            <button type="button" className="see-more-btn">
              Se alle
            </button>
          )}
        </div>
      </div>
    </div>
  );
}