import React from "react";
import SummaryShell from "../components/SummaryShell.jsx";
import { useLectureSummary } from "../context/LectureSummaryContext.jsx";

function QuestionsPage() {
  const { document, content, clearDocument } = useLectureSummary();

  return (
    <SummaryShell note="This page shows the practice questions generated from the uploaded lecture file.">
      <header className="summary-header">
        <div className="brand">
          <div className="brand-mark">AI</div>
          <div>
            <p>Lecture Summary Studio</p>
            <span>Questions output</span>
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
            <div className="pill">Practice questions</div>
            <h1>
              Questions page
              <span>Generated questions are ready for self-checking.</span>
            </h1>
            <p className="hero-text">
              Use this page to test your understanding of the uploaded lecture by working through the generated questions.
            </p>
          </div>

          <div className="hero-stat">
            <div className="stat-card">
              <span>1</span>
              <strong>Self-check</strong>
              <p>Answer the questions without looking at the summary first.</p>
            </div>
            <div className="stat-card">
              <span>2</span>
              <strong>Exam prep</strong>
              <p>Use the prompts to practice short answers and recall.</p>
            </div>
            <div className="stat-card">
              <span>3</span>
              <strong>Shared document</strong>
              <p>The same uploaded file powers all pages in the app.</p>
            </div>
          </div>
        </section>

        <section className="content-grid compact-grid">
          <article className="stack-card">
            <div className="section-title">
              <p>Generated questions</p>
              <span>Practice prompts based on the lecture</span>
            </div>
            {content ? (
              <div className="question-list">
                {content.questions.map((question, index) => (
                  <div className="question-card" key={question}>
                    <span>Q{index + 1}</span>
                    <p>{question}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="empty-message">Upload a lecture file from the home page to generate questions.</p>
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
              <span>Practice workflow guidance</span>
            </div>
            <p>
              Try answering one question at a time, then return to the summary or revision notes page to review the lecture again.
            </p>
          </article>
        </section>
      </main>
    </SummaryShell>
  );
}

export default QuestionsPage;
