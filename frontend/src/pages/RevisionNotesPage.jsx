import React from "react";
import SummaryShell from "../components/SummaryShell.jsx";
import { useLectureSummary } from "../context/LectureSummaryContext.jsx";

function RevisionNotesPage() {
  const { document, content, clearDocument } = useLectureSummary();

  return (
    <SummaryShell note="This page shows the revision bullets generated from the uploaded lecture file.">
      <header className="summary-header">
        <div className="brand">
          <div className="brand-mark">AI</div>
          <div>
            <p>Lecture Summary Studio</p>
            <span>Revision notes output</span>
          </div>
        </div>
        <div className="header-actions">
          <button type="button" className="ghost-btn" onClick={clearDocument} disabled={!document}>
            Clear file
          </button>
        </div>
      </header>

      <main className="summary-page">
        <section className="hero-card">
          <div className="ring" />
          <div className="ring2" />
          <div className="hero-copy">
            <div className="pill">Revision notes</div>
            <h1>
              Revision note page
              <span>Use these bullets for quick exam review.</span>
            </h1>
            <p className="hero-text">
              The uploaded document is translated into short revision bullets so you can revise faster without reading the full lecture again.
            </p>
          </div>

          <div className="hero-stat">
            <div className="stat-card">
              <span>1</span>
              <strong>Quick recall</strong>
              <p>Short bullet points make revision easier.</p>
            </div>
            <div className="stat-card">
              <span>2</span>
              <strong>Study cues</strong>
              <p>Each note highlights a key idea from the lecture.</p>
            </div>
            <div className="stat-card">
              <span>3</span>
              <strong>One upload</strong>
              <p>The same file stays available from the home page upload.</p>
            </div>
          </div>
        </section>

        <section className="content-grid compact-grid">
          <article className="stack-card">
            <div className="section-title">
              <p>Revision notes</p>
              <span>Bullet notes for revision and exam prep</span>
            </div>
            {content ? (
              <ul className="bullet-list">
                {content.revisionNotes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="empty-message">Upload a lecture file from the home page to generate revision notes.</p>
            )}
          </article>

          <article className="page-card">
            <div className="section-title">
              <p>Current file</p>
              <span>The uploaded lecture is shared across pages</span>
            </div>
            {document ? (
              <div className="file-summary">
                <div className="file-chip">{document.extension}</div>
                <div>
                  <strong>{document.name}</strong>
                  <span>{document.sizeLabel} | Added {document.updatedAt}</span>
                </div>
              </div>
            ) : (
              <p className="empty-message">No lecture file uploaded yet.</p>
            )}
          </article>

          <article className="page-card">
            <div className="section-title">
              <p>How to use</p>
              <span>Revision workflow guidance</span>
            </div>
            <p>
              First upload a file on the home page, then use these revision bullets to review the lecture in shorter study sessions.
            </p>
          </article>
        </section>
      </main>
    </SummaryShell>
  );
}

export default RevisionNotesPage;
