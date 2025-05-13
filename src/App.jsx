import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Guide from "./pages/Guide";
import CardGame from "./pages/CardGame";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="/spin" element={<Home />} />
        <Route path="/cards/:segment" element={<CardGame />} />
      </Routes>
    </Router>
  );
}

export default App;
