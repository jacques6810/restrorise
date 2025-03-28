import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Wheel from "./pages/Wheel";
import Api from "./pages/Api";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/1" element={<Wheel />} />
        <Route path="/2" element={<Api />} />
      </Routes>
    </Router>
  );
}

export default App;
