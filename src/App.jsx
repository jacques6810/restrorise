import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./pages/authContext";
import ProtectedRoute from "./component/ProtectedRoute";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Guide from "./pages/Guide";
import CardGame from "./pages/CardGame";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/guide" element={<Guide />} />
            <Route path="/spin" element={<Home />} />
            <Route path="/cards/:segment" element={<CardGame />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
