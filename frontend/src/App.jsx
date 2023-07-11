import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import CompanySettings from "./pages/CompanySettings/CompanySettings";
import Invitation from "./pages/Invitation/Invitation";
import Workspace from "./pages/Workspace/Workspace";

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
              <Route
                path="/:company_id/teams/:team_id/workspaces/:workspace_id"
                element={<Workspace />}
              />

              <Route
                path="/:company_id/settings"
                element={<CompanySettings />}
              />
              <Route path="/:company_id/invitation" element={<Invitation />} />
            </Routes>
          </Router>
        </div>
      </CompanyProvider>
    </AuthProvider>
  );
}

export default App;
