import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CardGame from "./pages/CardGame";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cards/:segment" element={<CardGame />} />
      </Routes>
    </Router>
  );
}

export default App;
