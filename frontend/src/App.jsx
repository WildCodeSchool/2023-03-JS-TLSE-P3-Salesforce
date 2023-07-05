import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Connection from "./pages/Connection/Connection";

import { AuthProvider } from "./contexts/AuthContext";

import "./styles/reset.css";
import "./styles/index.scss";

import { defineColorTheme } from "../utils";

const colorTheme = "indigo";

defineColorTheme(colorTheme);

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/:company_id/" element={<Connection />} />
            <Route path="/:company_id/home" element={<Home />} />
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
