import React from "react";
import SummaryShell from "../components/SummaryShell.jsx";
import { useLectureSummary } from "../context/LectureSummaryContext.jsx";

function SummaryPage() {
  const { document, content, clearDocument } = useLectureSummary();

  return (
    <SummaryShell note="This page shows the generated summary and key points from the uploaded lecture file.">
      <header className="summary-header">
        <div className="brand">
          <div className="brand-mark">AI</div>
          <div>
            <p>Lecture Summary Studio</p>
            <span>Generated summary output</span>
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
            <div className="pill">Summary output</div>
            <h1>
              AI-generated summary and key points
              <span>The uploaded lecture file is turned into a short study view.</span>
            </h1>
            <p className="hero-text">
              This page reads the uploaded document and shows the main summary plus the key points that matter for revision.
            </p>
          </div>

          <div className="hero-stat">
            <div className="stat-card">
              <span>1</span>
              <strong>Short overview</strong>
              <p>Read the generated summary before revision.</p>
            </div>
            <div className="stat-card">
              <span>2</span>
              <strong>Important points</strong>
              <p>Use the key points as a quick exam guide.</p>
            </div>
            <div className="stat-card">
              <span>3</span>
              <strong>Document context</strong>
              <p>The output stays tied to the uploaded lecture file.</p>
            </div>
          </div>
        </section>

        <section className="content-grid compact-grid">
          <article className="stack-card">
            <div className="section-title">
              <p>AI-generated summary</p>
              <span>Short overview plus extracted concepts</span>
            </div>
            {content ? (
              <ul className="bullet-list">
                {content.summary.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="empty-message">Upload a lecture file from the home page to generate the summary.</p>
            )}
          </article>

          <article className="stack-card">
            <div className="section-title">
              <p>Key points</p>
              <span>Important lecture highlights</span>
            </div>
            {content ? (
              <ul className="bullet-list">
                {content.keyPoints.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="empty-message">The key points will appear here after upload.</p>
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
        </section>
      </main>
    </SummaryShell>
  );
}

export default SummaryPage;
