import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import SummaryShell from "../components/SummaryShell.jsx";
import { supportedTypes } from "../lib/lectureSummary.js";
import { useLectureSummary } from "../context/LectureSummaryContext.jsx";

function AISummary() {
  const fileInputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const { document, uploadFile, clearDocument } = useLectureSummary();

  function openFilePicker() {
    fileInputRef.current?.click();
  }

  function handleFile(file) {
    if (!file) return;
    const result = uploadFile(file);
    setUploadError(result?.ok ? "" : result?.error || "Unable to upload that file.");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function handleDrop(event) {
    event.preventDefault();
    setDragOver(false);
    handleFile(event.dataTransfer.files[0]);
  }

  return (
    <SummaryShell note="This page is only the guide. Upload the lecture file here, then open the Summary, Revision Notes, or Questions pages from the sidebar.">
      <header className="summary-header">
        <div className="brand">
          <div className="brand-mark">AI</div>
          <div>
            <p>Lecture Summary Studio</p>
            <span>Upload once, then review in the relevant page</span>
          </div>
        </div>
        <div className="header-actions">
          <button type="button" className="ghost-btn" onClick={openFilePicker}>
            Upload document
          </button>
          <button
            type="button"
            className="ghost-btn"
            onClick={() => {
              clearDocument();
              setUploadError("");
            }}
            disabled={!document}
          >
            Clear file
          </button>
        </div>
      </header>

      <main className="summary-page">
        <section className="hero-card">
          <div className="ring" />
          <div className="ring2" />
          <div className="hero-copy">
            <div className="pill">Upload Section</div>
            <h1>
              Upload the lecture file here.
              <span>The actual content will appear on the relevant pages.</span>
            </h1>
            <p className="hero-text">
              This home page is a guided entry point only. Use it to upload the document,
              then move to the Summary, Revision Notes, or Questions page to see the
              generated output.
            </p>
            <div className="hero-badges">
              {supportedTypes.map((type) => (
                <span key={type}>{type}</span>
              ))}
            </div>
          </div>

          <div className="hero-stat">
            <div className="stat-card">
              <span>1</span>
              <strong>Upload the document</strong>
              <p>Choose a lecture file from your device or drag it here.</p>
            </div>
            <div className="stat-card">
              <span>2</span>
              <strong>Open a content page</strong>
              <p>Summary, revision notes, and questions all live on separate pages.</p>
            </div>
            <div className="stat-card">
              <span>3</span>
              <strong>Review the result</strong>
              <p>The uploaded file stays available while you move between pages.</p>
            </div>
          </div>
        </section>

        <section className="dashboard-grid">
          <article
            className={`upload-card ${dragOver ? "is-dragging" : ""}`}
            onClick={openFilePicker}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
          >
            <div className="upload-icon">+</div>
            <h2>Upload lecture materials</h2>
            <p>
              Drop your file here or click to browse. The selected document will be used by the
              other pages to show the generated summary, revision notes, and questions.
            </p>
            <div className="file-format-row">
              {supportedTypes.map((type) => (
                <span key={type}>{type}</span>
              ))}
            </div>
            {uploadError && <p className="upload-error">{uploadError}</p>}
            {document && !uploadError && (
              <div className="file-summary" style={{ width: "100%", marginTop: "0.2rem" }}>
                <div className="file-chip">{document.extension}</div>
                <div style={{ textAlign: "left" }}>
                  <strong>{document.name}</strong>
                  <span>{document.sizeLabel} | Added {document.updatedAt}</span>
                </div>
              </div>
            )}
            <button
              type="button"
              className="primary-btn"
              onClick={(e) => { e.stopPropagation(); openFilePicker(); }}
            >
              Choose file
            </button>
            <input
              ref={fileInputRef}
              type="file"
              onChange={(e) => handleFile(e.target.files[0])}
            />
          </article>

          <article className="guide-card">
            <div className="section-title">
              <p>Summary page</p>
              <span>Short overview and extracted key points</span>
            </div>
            <p>
              Open the summary page to see the main lecture summary and key points based on the uploaded document.
            </p>
            <div className="result-actions" style={{ marginTop: "1rem" }}>
              <Link className="primary-btn" to="/summary" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center" }}>
                Go to summary
              </Link>
            </div>
          </article>
        </section>

        <section className="content-grid compact-grid">
          <article className="page-card">
            <div className="section-title">
              <p>Revision notes page</p>
              <span>Bullet notes for exam revision</span>
            </div>
            <p>
              The revision note page shows the revision bullets created from the uploaded lecture document.
            </p>
            <div className="result-actions" style={{ marginTop: "1rem" }}>
              <Link className="primary-btn" to="/revision-notes" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center" }}>
                Open revision notes
              </Link>
            </div>
          </article>

          <article className="page-card">
            <div className="section-title">
              <p>Questions page</p>
              <span>Practice questions from the lecture</span>
            </div>
            <p>
              The questions page presents practice questions generated from the uploaded lecture file.
            </p>
            <div className="result-actions" style={{ marginTop: "1rem" }}>
              <Link className="primary-btn" to="/questions" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center" }}>
                Open questions
              </Link>
            </div>
          </article>

          <article className="page-card">
            <div className="section-title">
              <p>Current file</p>
              <span>The uploaded lecture stays available across pages</span>
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

export default AISummary;
