import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";

import { AuthProvider } from "./contexts/AuthContext";
import { CompanyProvider } from "./contexts/CompanyContext";

import "./styles/reset.css";
import "./styles/index.scss";

import { defineColorTheme } from "../utils";

const colorTheme = "indigo";

defineColorTheme(colorTheme);

function App() {
  return (
    <AuthProvider>
      <CompanyProvider>
        <div className="App">
          <Router>
            <Routes>
              <Route path="/:company_id/" element={<Home />} />
            </Routes>
          </Router>
        </div>
      </CompanyProvider>
    </AuthProvider>
  );
}

export default App;
