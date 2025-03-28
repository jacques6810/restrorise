import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Wheel from "./pages/Wheel";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/1" element={<Wheel />} />
      </Routes>
    </Router>
  );
}

export default App;
