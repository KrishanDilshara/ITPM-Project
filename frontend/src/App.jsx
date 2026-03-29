import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LectureSummaryProvider } from "./context/LectureSummaryContext.jsx";
import AISummary from "./pages/AISummary.jsx";
import SummaryPage from "./pages/SummaryPage.jsx";
import RevisionNotesPage from "./pages/RevisionNotesPage.jsx";
import QuestionsPage from "./pages/QuestionsPage.jsx";

function App() {
  return (
    <LectureSummaryProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AISummary />} />
          <Route path="/summary" element={<SummaryPage />} />
          <Route path="/revision-notes" element={<RevisionNotesPage />} />
          <Route path="/questions" element={<QuestionsPage />} />
        </Routes>
      </Router>
    </LectureSummaryProvider>
  );
}

export default App;
