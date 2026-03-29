import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { createDocumentRecord, validateLectureFile } from "../lib/lectureSummary.js";

const STORAGE_KEY = "itpm-lecture-summary-document";

const LectureSummaryContext = createContext(null);

function readStoredDocument() {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeStoredDocument(document) {
  if (typeof window === "undefined") return;
  try {
    if (document) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(document));
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    // Ignore storage failures and keep the in-memory state working.
  }
}

export function LectureSummaryProvider({ children }) {
  const [documentRecord, setDocumentRecord] = useState(() => readStoredDocument());

  useEffect(() => {
    writeStoredDocument(documentRecord);
  }, [documentRecord]);

  const actions = useMemo(() => ({
    uploadFile(file) {
      const validationMessage = validateLectureFile(file);
      if (validationMessage) {
        return { ok: false, error: validationMessage };
      }
      setDocumentRecord(createDocumentRecord(file));
      return { ok: true, error: "" };
    },
    clearDocument() {
      setDocumentRecord(null);
    },
  }), []);

  const value = useMemo(() => ({
    document: documentRecord,
    content: documentRecord?.content ?? null,
    ...actions,
  }), [actions, documentRecord]);

  return (
    <LectureSummaryContext.Provider value={value}>
      {children}
    </LectureSummaryContext.Provider>
  );
}

export function useLectureSummary() {
  const context = useContext(LectureSummaryContext);
  if (!context) {
    throw new Error("useLectureSummary must be used within a LectureSummaryProvider");
  }
  return context;
}
