import React, { useRef, useState } from "react";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .summary-shell {
    min-height: 100vh;
    font-family: 'DM Sans', sans-serif;
    color: #1e1b14;
    background-color: #f5f0e8;
    background-image:
      radial-gradient(ellipse 70% 45% at 95% 0%, rgba(74, 107, 74, 0.05) 0%, transparent 60%),
      radial-gradient(ellipse 55% 35% at 5% 100%, rgba(120, 90, 40, 0.04) 0%, transparent 55%);
  }

  .summary-header {
    position: sticky; top: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 3rem; height: 66px;
    background: rgba(245, 240, 232, 0.92);
    backdrop-filter: blur(14px);
    border-bottom: 1px solid rgba(74, 107, 74, 0.14);
    box-shadow: 0 1px 0 rgba(180,160,120,0.1), 0 2px 16px rgba(30,27,20,0.04);
  }

  .brand { display: flex; align-items: center; gap: 13px; }

  .brand-mark {
    width: 37px; height: 37px;
    background: #2d5a2d; border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Cormorant Garamond', serif;
    font-weight: 700; font-size: 14px; color: #e8f0e8;
    letter-spacing: 0.04em; flex-shrink: 0;
    box-shadow: 0 2px 12px rgba(45,90,45,0.22);
  }

  .brand > div:last-child p {
    font-family: 'Cormorant Garamond', serif;
    font-size: 17px; font-weight: 600; color: #1e1b14; line-height: 1.2; letter-spacing: 0.01em;
  }
  .brand > div:last-child span {
    font-size: 11px; color: rgba(30,27,20,0.42); font-weight: 300; letter-spacing: 0.01em;
  }

  .header-actions { display: flex; gap: 10px; }

  .ghost-btn {
    padding: 8px 18px; border-radius: 6px;
    border: 1px solid rgba(45,90,45,0.28); background: transparent;
    color: #2d5a2d; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500;
    cursor: pointer; transition: all 0.18s; letter-spacing: 0.01em;
  }
  .ghost-btn:hover { background: rgba(45,90,45,0.07); border-color: rgba(45,90,45,0.45); }

  .primary-btn {
    padding: 8px 20px; border-radius: 6px; border: none;
    background: #2d5a2d; color: #e8f0e8;
    font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 600;
    cursor: pointer; transition: all 0.18s; letter-spacing: 0.01em;
    box-shadow: 0 2px 10px rgba(45,90,45,0.22);
  }
  .primary-btn:hover { background: #1e3d1e; box-shadow: 0 4px 18px rgba(45,90,45,0.3); transform: translateY(-1px); }
  .primary-btn:disabled { opacity: 0.35; cursor: not-allowed; transform: none; box-shadow: none; }

  .text-btn {
    background: none; border: none; color: #7a6b4e;
    font-family: 'DM Sans', sans-serif; font-size: 13px;
    cursor: pointer; transition: color 0.18s; padding: 4px 8px;
  }
  .text-btn:hover { color: #2d5a2d; }

  .summary-page {
    max-width: 1200px; margin: 0 auto;
    padding: 2.25rem 2rem 4rem;
    display: flex; flex-direction: column; gap: 1rem;
  }

  .hero-card {
    display: grid; grid-template-columns: 1fr 320px;
    gap: 2rem; align-items: center;
    padding: 2.4rem 2.6rem; border-radius: 16px;
    background: #fff;
    border: 1px solid rgba(74,107,74,0.12);
    box-shadow: 0 2px 24px rgba(30,27,20,0.06), 0 0 0 0.5px rgba(180,160,120,0.15);
    position: relative; overflow: hidden;
  }
  .hero-card::before {
    content: ''; position: absolute; top: 0; right: 0;
    width: 380px; height: 380px;
    background: radial-gradient(ellipse at top right, rgba(74,107,74,0.06) 0%, transparent 65%);
    pointer-events: none;
  }
  .hero-card::after {
    content: ''; position: absolute; bottom: -30px; left: 120px;
    width: 220px; height: 180px;
    background: radial-gradient(ellipse, rgba(120,90,40,0.04) 0%, transparent 70%);
    pointer-events: none;
  }

  .hero-copy { position: relative; z-index: 1; }

  .pill {
    display: inline-block; padding: 5px 13px; border-radius: 100px;
    background: rgba(45,90,45,0.08); border: 1px solid rgba(45,90,45,0.18);
    color: #2d5a2d; font-size: 10.5px; font-weight: 600;
    letter-spacing: 0.07em; text-transform: uppercase; margin-bottom: 1.2rem;
  }

  .hero-copy h1 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2.75rem; font-weight: 700; line-height: 1.15;
    color: #1e1b14; margin-bottom: 1rem; letter-spacing: -0.01em;
  }
  .hero-copy h1 span {
    display: block; font-style: italic; color: #2d5a2d; font-weight: 600;
  }

  .hero-text {
    font-size: 14px; color: rgba(30,27,20,0.55); line-height: 1.75;
    max-width: 500px; margin-bottom: 1.5rem; font-weight: 300;
  }

  .hero-badges { display: flex; flex-wrap: wrap; gap: 7px; }
  .hero-badges span {
    padding: 4px 11px; border-radius: 4px;
    background: rgba(181,169,138,0.12); border: 1px solid rgba(181,169,138,0.28);
    font-size: 11px; font-weight: 500; color: #7a6b4e; letter-spacing: 0.04em;
  }

  .hero-stat { display: flex; flex-direction: column; gap: 11px; position: relative; z-index: 1; }

  .stat-card {
    padding: 1.1rem 1.2rem; border-radius: 10px;
    background: #f9f6f0; border: 1px solid rgba(181,169,138,0.22);
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .stat-card:hover { border-color: rgba(45,90,45,0.2); box-shadow: 0 2px 12px rgba(45,90,45,0.07); }

  .stat-card span {
    display: inline-flex; width: 26px; height: 26px;
    align-items: center; justify-content: center; border-radius: 50%;
    background: rgba(45,90,45,0.1); color: #2d5a2d;
    font-size: 12px; font-weight: 600; margin-bottom: 8px;
  }
  .stat-card strong { display: block; font-size: 13.5px; font-weight: 600; color: #1e1b14; margin-bottom: 4px; }
  .stat-card p { font-size: 12px; color: rgba(30,27,20,0.42); line-height: 1.5; font-weight: 300; }

  .dashboard-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }

  .upload-card {
    padding: 2rem 1.8rem; border-radius: 12px; background: #fff;
    border: 1.5px dashed rgba(45,90,45,0.22);
    display: flex; flex-direction: column; align-items: center;
    justify-content: center; text-align: center; cursor: pointer; gap: 12px; min-height: 280px;
    transition: all 0.2s; box-shadow: 0 1px 8px rgba(30,27,20,0.04);
  }
  .upload-card:hover, .upload-card.is-dragging {
    border-color: rgba(45,90,45,0.5);
    background: rgba(45,90,45,0.02);
    box-shadow: 0 4px 20px rgba(45,90,45,0.08);
  }

  .upload-icon {
    width: 52px; height: 52px; border-radius: 12px;
    background: rgba(45,90,45,0.08); border: 1px solid rgba(45,90,45,0.18);
    display: flex; align-items: center; justify-content: center;
    font-size: 26px; color: #2d5a2d; margin-bottom: 4px;
  }

  .upload-card h2 {
    font-family: 'Cormorant Garamond', serif; font-size: 1.25rem; font-weight: 600; color: #1e1b14;
  }
  .upload-card p {
    font-size: 13px; color: rgba(30,27,20,0.45); line-height: 1.65; max-width: 250px; font-weight: 300;
  }

  .file-format-row { display: flex; gap: 6px; flex-wrap: wrap; justify-content: center; }
  .file-format-row span {
    padding: 3px 10px; border-radius: 4px;
    background: rgba(181,169,138,0.1); border: 1px solid rgba(181,169,138,0.25);
    font-size: 11px; color: #7a6b4e; letter-spacing: 0.04em; font-weight: 400;
  }

  .upload-card input[type="file"] { display: none; }

  .result-card {
    padding: 1.45rem; border-radius: 12px; background: #fff;
    border: 1px solid rgba(181,169,138,0.2);
    display: flex; flex-direction: column; gap: 1.2rem;
    box-shadow: 0 1px 8px rgba(30,27,20,0.04);
  }

  .result-head { display: flex; justify-content: space-between; align-items: flex-start; }
  .result-head p {
    font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.09em;
    color: rgba(30,27,20,0.35); font-weight: 500; margin-bottom: 6px;
  }
  .result-head h2 {
    font-family: 'Cormorant Garamond', serif; font-size: 1.2rem; font-weight: 600;
    color: #1e1b14; line-height: 1.3; word-break: break-word;
  }

  .file-summary {
    display: flex; align-items: center; gap: 13px;
    padding: 0.9rem 1.1rem; border-radius: 8px;
    background: #f9f6f0; border: 1px solid rgba(181,169,138,0.22);
  }
  .file-chip {
    padding: 5px 11px; border-radius: 5px;
    background: #2d5a2d; color: #e8f0e8;
    font-size: 10.5px; font-weight: 700; letter-spacing: 0.07em; flex-shrink: 0;
  }
  .file-summary strong { display: block; font-size: 14px; font-weight: 600; color: #1e1b14; }
  .file-summary span { font-size: 12px; color: rgba(30,27,20,0.4); font-weight: 300; }

  .result-actions { display: flex; gap: 10px; }

  .success-banner {
    padding: 10px 14px; border-radius: 7px;
    background: rgba(45,90,45,0.07); border: 1px solid rgba(45,90,45,0.2);
    color: #2d5a2d; font-size: 13px; font-weight: 400;
  }

  .empty-state {
    flex: 1; display: flex; flex-direction: column; align-items: center;
    justify-content: center; text-align: center; padding: 2rem 0; gap: 8px; opacity: 0.5;
  }
  .empty-state strong { font-size: 14px; color: #1e1b14; font-weight: 500; }
  .empty-state p { font-size: 13px; color: rgba(30,27,20,0.5); font-weight: 300; }

  .content-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .compact-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .content-card {
    padding: 1.45rem; border-radius: 12px; background: #fff;
    border: 1px solid rgba(181,169,138,0.2);
    box-shadow: 0 1px 8px rgba(30,27,20,0.04); transition: box-shadow 0.2s;
  }
  .content-card:hover { box-shadow: 0 4px 20px rgba(30,27,20,0.08); }

  .section-title { margin-bottom: 1.25rem; }
  .section-title p {
    font-family: 'Cormorant Garamond', serif; font-size: 1.1rem; font-weight: 600;
    color: #1e1b14; margin-bottom: 3px; letter-spacing: 0.01em;
  }
  .section-title span { font-size: 11.5px; color: rgba(30,27,20,0.38); font-weight: 300; letter-spacing: 0.01em; }

  .bullet-list { list-style: none; display: flex; flex-direction: column; gap: 10px; }
  .bullet-list li {
    position: relative; padding-left: 18px;
    font-size: 13.5px; color: rgba(30,27,20,0.68); line-height: 1.65; font-weight: 300;
  }
  .bullet-list li::before {
    content: ''; position: absolute; left: 0; top: 9px;
    width: 7px; height: 1px; background: #2d5a2d; opacity: 0.55;
  }
  .bullet-list.compact li { font-size: 13px; }

  .note-columns { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
  .note-columns h3 {
    font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.09em;
    color: rgba(45,90,45,0.65); font-weight: 600; margin-bottom: 0.85rem;
  }

  .question-list { display: flex; flex-direction: column; gap: 10px; }

  .question-card {
    display: flex; align-items: flex-start; gap: 12px;
    padding: 11px 14px; border-radius: 8px;
    background: #f9f6f0; border: 1px solid rgba(181,169,138,0.2);
    transition: border-color 0.2s, background 0.2s;
  }
  .question-card:hover { border-color: rgba(45,90,45,0.2); background: rgba(45,90,45,0.025); }
  .question-card span {
    flex-shrink: 0; font-size: 10px; font-weight: 700; letter-spacing: 0.07em;
    color: #2d5a2d; padding: 3px 7px; border-radius: 4px;
    background: rgba(45,90,45,0.09); border: 1px solid rgba(45,90,45,0.18); margin-top: 1px;
  }
  .question-card p { font-size: 13.5px; color: rgba(30,27,20,0.68); line-height: 1.6; font-weight: 300; }

  .history-section { display: flex; flex-direction: column; gap: 0.75rem; }

  .history-head { display: flex; justify-content: space-between; align-items: center; }

  .search-box { display: flex; align-items: center; gap: 9px; }
  .search-box span { font-size: 12px; color: rgba(30,27,20,0.35); font-weight: 400; }
  .search-box input {
    padding: 8px 14px; border-radius: 7px;
    border: 1px solid rgba(181,169,138,0.28); background: #fff;
    color: #1e1b14; font-family: 'DM Sans', sans-serif; font-size: 13px;
    width: 220px; outline: none; transition: border-color 0.2s, box-shadow 0.2s;
  }
  .search-box input::placeholder { color: rgba(30,27,20,0.28); }
  .search-box input:focus {
    border-color: rgba(45,90,45,0.35);
    box-shadow: 0 0 0 3px rgba(45,90,45,0.07);
  }

  .history-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 0.85rem; }

  .history-card {
    padding: 1.2rem 1.3rem; border-radius: 12px; background: #fff;
    border: 1px solid rgba(181,169,138,0.2); cursor: pointer;
    transition: all 0.2s; box-shadow: 0 1px 6px rgba(30,27,20,0.04);
  }
  .history-card:hover {
    border-color: rgba(45,90,45,0.22);
    box-shadow: 0 4px 18px rgba(30,27,20,0.08);
    transform: translateY(-1px);
  }

  .history-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px; }
  .history-top strong {
    font-family: 'Cormorant Garamond', serif; font-size: 14.5px; font-weight: 600;
    color: #1e1b14; line-height: 1.35;
  }
  .history-top span {
    font-size: 11px; color: rgba(30,27,20,0.32); white-space: nowrap;
    margin-left: 10px; flex-shrink: 0; font-weight: 300;
  }
  .history-card > p { font-size: 12.5px; color: rgba(30,27,20,0.42); margin-bottom: 12px; font-weight: 300; }

  .tag-row { display: flex; flex-wrap: wrap; gap: 6px; }
  .tag-row span {
    padding: 3px 9px; border-radius: 4px;
    background: rgba(45,90,45,0.07); border: 1px solid rgba(45,90,45,0.14);
    font-size: 11px; color: #2d5a2d; font-weight: 400; letter-spacing: 0.01em;
  }

  .stack-card {
    padding: 1.25rem 1.35rem;
    border-radius: 12px;
    background: #fff;
    border: 1px solid rgba(181,169,138,0.2);
    box-shadow: 0 1px 8px rgba(30,27,20,0.04);
  }

  .stack-card + .stack-card {
    margin-top: 0.75rem;
  }

  .stack-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.9rem;
  }

  .stack-grid .bullet-list {
    margin-top: 0.85rem;
  }

  .empty-message {
    padding: 0.8rem 0 0.1rem;
    color: rgba(30,27,20,0.45);
    font-size: 13px;
    line-height: 1.7;
  }

  @media (max-width: 1024px) {
    .hero-card,
    .dashboard-grid,
    .content-grid,
    .history-grid,
    .stack-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 1200px) {
    .compact-grid {
      grid-template-columns: 1fr 1fr;
    }
  }
`;

const supportedTypes = ["PDF", "PPT", "PPTX", "DOC", "DOCX"];

function formatFileSize(bytes) {
  if (!bytes) return "0 KB";
  const sizeInMb = bytes / 1024 / 1024;
  if (sizeInMb >= 1) return `${sizeInMb.toFixed(1)} MB`;
  return `${Math.max(bytes / 1024, 0.1).toFixed(1)} KB`;
}

function makeNotes(fileName) {
  const title = fileName?.replace(/\.[^/.]+$/, "") || "Selected lecture";
  return {
    summary: [
      `${title} is summarised into a readable overview for fast review.`,
      "The notes focus on concepts, not long paragraphs, so revision stays efficient.",
      "Students can use the output before class tests, assignments, and final exams.",
    ],
    keyPoints: [
      "Main definitions are rewritten in simple language.",
      "Important steps and processes are separated into bullet points.",
      "Examples from the lecture are retained as quick reference items.",
    ],
    concepts: [
      "Concept clusters are grouped by topic for easier memorisation.",
      "Technical terms are extracted and presented as study cues.",
      "Related ideas are linked so the structure of the lecture is visible.",
    ],
    revisionNotes: [
      "Read the summary once for context.",
      "Revise the key points before the exam.",
      "Use the question list to self-check understanding.",
    ],
    questions: [
      `Explain the main idea of ${title}.`,
      `List three important points from ${title}.`,
      `Create a short answer based on the most repeated concept in ${title}.`,
    ],
  };
}

function AISummary() {
  const fileInputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [downloadReady, setDownloadReady] = useState(false);

  const content = selectedFile ? makeNotes(selectedFile.name) : null;

  function openFilePicker() { fileInputRef.current?.click(); }

  function handleFile(file) {
    if (!file) return;
    const extension = file.name.includes(".")
      ? file.name.split(".").pop().toUpperCase()
      : "FILE";
    setSelectedFile({
      name: file.name,
      extension,
      sizeLabel: formatFileSize(file.size),
      updatedAt: new Date(file.lastModified).toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      }),
    });
    setDownloadReady(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function handleDrop(event) {
    event.preventDefault();
    setDragOver(false);
    handleFile(event.dataTransfer.files[0]);
  }

  function handleGenerate() {
    if (!selectedFile) return;
    setDownloadReady(true);
  }

  function clearFile() {
    setSelectedFile(null);
    setDownloadReady(false);
  }

  return (
    <>
      <style>{STYLES}</style>
      <div className="summary-shell">
        <header className="summary-header">
          <div className="brand">
            <div className="brand-mark">AI</div>
            <div>
              <p>Lecture Summary Studio</p>
              <span>Smart notes, revision bullets, and question generation</span>
            </div>
          </div>
          <div className="header-actions">
            <button type="button" className="ghost-btn" onClick={openFilePicker}>
              Upload document
            </button>
            <button type="button" className="primary-btn" onClick={handleGenerate} disabled={!selectedFile}>
              Generate notes
            </button>
          </div>
        </header>

        <main className="summary-page">
          <section className="hero-card">
            <div className="hero-copy">
              <div className="pill">AI Lecture Summary and Smart Notes Generation</div>
              <h1>
                Turn long lecture materials into
                <span>short summaries, revision notes, and practice questions.</span>
              </h1>
              <p className="hero-text">
                Upload a PDF, PPT, DOC, or DOCX file and use the output to review faster:
                summary, key concepts, bullet notes, saved history, download, and question generation.
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
                <strong>Upload lecture file</strong>
                <p>Choose the document you want to analyse.</p>
              </div>
              <div className="stat-card">
                <span>2</span>
                <strong>Generate smart notes</strong>
                <p>Get summaries, key points, concepts, and revision bullets.</p>
              </div>
              <div className="stat-card">
                <span>3</span>
                <strong>Save and revise</strong>
                <p>Download the result and return to previous summaries anytime.</p>
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
                Drop your file here or click to browse. The upload area is set up for
                lecture summaries and question generation.
              </p>
              <div className="file-format-row">
                {supportedTypes.map((type) => (
                  <span key={type}>{type}</span>
                ))}
              </div>
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
                accept=".pdf,.ppt,.pptx,.doc,.docx"
                onChange={(e) => handleFile(e.target.files[0])}
              />
            </article>

            <article className="result-card">
              <div className="result-head">
                <div>
                  <p>Current file</p>
                  <h2>{selectedFile ? selectedFile.name : "No document selected"}</h2>
                </div>
                {selectedFile && (
                  <button type="button" className="text-btn" onClick={clearFile}>
                    Clear
                  </button>
                )}
              </div>

              {selectedFile ? (
                <>
                  <div className="file-summary">
                    <div className="file-chip">{selectedFile.extension}</div>
                    <div>
                      <strong>{selectedFile.sizeLabel}</strong>
                      <span>Added {selectedFile.updatedAt}</span>
                    </div>
                  </div>
                  <div className="result-actions">
                    <button type="button" className="ghost-btn" onClick={() => setDownloadReady(true)}>
                      Save summary
                    </button>
                    <button type="button" className="primary-btn" onClick={handleGenerate}>
                      Download summary
                    </button>
                  </div>
                  {downloadReady && (
                    <div className="success-banner">
                      Summary generated and ready to download.
                    </div>
                  )}
                </>
              ) : (
                <div className="empty-state">
                  <strong>Nothing to show yet</strong>
                  <p>Upload a lecture document to preview the generated output.</p>
                </div>
              )}
            </article>
          </section>

          <div className="section-divider" />

          <section className="content-grid compact-grid">
            <article className="stack-card">
              <div className="section-title">
                <p>AI-generated summary and key points</p>
                <span>Short overview plus extracted concepts</span>
              </div>
              {content ? (
                <div className="stack-grid">
                  <div>
                    <ul className="bullet-list">
                      {content.summary.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <ul className="bullet-list">
                      {content.keyPoints.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <p className="empty-message">Upload a lecture file to generate the summary and key points.</p>
              )}
            </article>

            <article className="stack-card">
              <div className="section-title">
                <p>Revision notes and questions</p>
                <span>Bullet notes for revision and practice questions</span>
              </div>
              {content ? (
                <div className="stack-grid">
                  <div>
                    <h3>Revision notes</h3>
                    <ul className="bullet-list compact">
                      {content.revisionNotes.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3>Generated questions</h3>
                    <div className="question-list">
                      {content.questions.map((question, index) => (
                        <div className="question-card" key={question}>
                          <span>Q{index + 1}</span>
                          <p>{question}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <p className="empty-message">Generate the lecture notes first to preview revision notes and questions.</p>
              )}
            </article>

            <article className="stack-card history-section">
              <div className="section-title history-head">
                <div>
                  <p>Manage previous summaries</p>
                  <span>Saved summaries will appear here after backend integration</span>
                </div>
              </div>
              <div className="empty-message">No saved summaries to show yet.</div>
            </article>
          </section>
        </main>
      </div>
    </>
  );
}

export default AISummary;
