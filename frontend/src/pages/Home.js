import React, { useRef, useState } from "react";
import "../styles/home.css";

const fileTypes = ["PDF", "PPTX", "DOCX", "DOC", "PPT"];

const featureCards = [
  {
    icon: "✦",
    title: "Instant Summaries",
    description: "Get a clear, structured breakdown of any lecture in seconds — no skimming required.",
  },
  {
    icon: "◈",
    title: "Key Concepts",
    description: "NoteAI extracts the most important ideas and definitions so nothing slips through.",
  },
  {
    icon: "⬡",
    title: "Practice Questions",
    description: "Auto-generated quiz questions help you test your understanding and prep for exams.",
  },
];

function formatFileSize(bytes) {
  if (!bytes) return "0 KB";
  const sizeInMb = bytes / 1024 / 1024;
  if (sizeInMb >= 1) return `${sizeInMb.toFixed(1)} MB`;
  return `${Math.max(bytes / 1024, 0.1).toFixed(1)} KB`;
}

function Home() {
  const fileInputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  function openFilePicker() {
    fileInputRef.current?.click();
  }

  function handleFile(file) {
    if (!file) return;
    const extension = file.name.includes(".")
      ? file.name.split(".").pop().toUpperCase()
      : "FILE";

    setSelectedFile({
      icon: extension,
      name: file.name,
      meta: `${extension} · ${formatFileSize(file.size)}`,
      updatedAt: new Date(file.lastModified).toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      }),
    });

    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function handleDrop(event) {
    event.preventDefault();
    setDragOver(false);
    handleFile(event.dataTransfer.files[0]);
  }

  return (
    <div className="noteai-shell">
      <div className="noteai-app">
        {/* ── NAV ── */}
        <nav className="top-nav">
          <div className="logo">
            <div className="logo-icon">✦</div>
            Note<span>AI</span>
          </div>
          <div className="nav-right">
            <ul>
              <li><button type="button">How it works</button></li>
              <li><button type="button">Features</button></li>
            </ul>
            <button className="nav-cta" type="button" onClick={openFilePicker}>
              Upload Lecture
            </button>
          </div>
        </nav>

        <main>
          <section className="upload-section">
            {/* ── HERO ── */}
            <div className="hero-badge">
              <span className="badge-dot" />
              AI-Powered Note Taking
            </div>

            <h1>
              Turn Lectures into
              <br />
              <span className="hl">Instant Notes</span>
            </h1>

            <p className="hero-sub">
              Upload any lecture file and NoteAI will summarise it, highlight key concepts,
              and generate practice questions — all in one click.
            </p>

            {/* ── DROP ZONE ── */}
            <div
              className={`drop-zone${dragOver ? " drag-over" : ""}`}
              onClick={openFilePicker}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
            >
              <div className="drop-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
                  <polyline points="16 12 12 8 8 12" />
                  <line x1="12" y1="8" x2="12" y2="20" />
                  <path d="M20 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v2" />
                </svg>
              </div>

              <p className="drop-title">Drop your lecture file here</p>
              <p className="drop-sub">or click anywhere to browse from your computer</p>

              <div className="file-types">
                {fileTypes.map((type) => (
                  <span className="file-type-tag" key={type}>{type}</span>
                ))}
              </div>

              <button
                className="btn-primary"
                type="button"
                onClick={(e) => { e.stopPropagation(); openFilePicker(); }}
              >
                Choose File
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.ppt,.pptx,.doc,.docx"
                onChange={(e) => handleFile(e.target.files[0])}
              />
            </div>

            {/* ── WORKSPACE PANEL ── */}
            <section className={`workspace-panel${selectedFile ? " has-file" : " workspace-empty"}`}>
              {selectedFile ? (
                <>
                  <div className="workspace-header">
                    <div className="ws-title-row">
                      <div className="ws-status-dot" />
                      <h2>Ready to Analyse</h2>
                    </div>
                    <p>Your file has been loaded and is ready to process.</p>
                  </div>

                  <div className="file-info workspace-file-info">
                    <div className="file-info-icon">{selectedFile.icon}</div>
                    <div className="file-info-body">
                      <div className="file-info-name">{selectedFile.name}</div>
                      <div className="file-info-meta">{selectedFile.meta} · Added {selectedFile.updatedAt}</div>
                    </div>
                    <button
                      className="remove-btn"
                      type="button"
                      title="Remove file"
                      onClick={() => setSelectedFile(null)}
                    >
                      ✕
                    </button>
                  </div>

                  <button className="btn-primary btn-analyse" type="button">
                    <span className="btn-icon">✦</span>
                    Generate Notes
                  </button>
                </>
              ) : (
                <div className="empty-workspace">
                  <div className="empty-icon">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                      <polyline points="14 2 14 8 20 8"/>
                      <line x1="12" y1="11" x2="12" y2="17"/>
                      <line x1="9" y1="14" x2="15" y2="14"/>
                    </svg>
                  </div>
                  <p className="empty-title">No file uploaded yet</p>
                  <p className="empty-sub">Upload a lecture above to get started.</p>
                </div>
              )}
            </section>

            {/* ── FEATURE CARDS ── */}
            <div className="features-row">
              {featureCards.map((item) => (
                <article className="feat-card" key={item.title}>
                  <div className="feat-icon">{item.icon}</div>
                  <p className="feat-title">{item.title}</p>
                  <p className="feat-desc">{item.description}</p>
                </article>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Home;