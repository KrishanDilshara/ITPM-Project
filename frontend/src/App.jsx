import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AISummary from "./pages/AISummary.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AISummary />} />
      </Routes>
    </Router>
  );
}

export default App;
