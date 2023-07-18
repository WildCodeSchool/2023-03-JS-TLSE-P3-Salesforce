/* eslint-disable camelcase */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import CompanySettings from "./pages/CompanySettings/CompanySettings";
import Invitation from "./pages/Invitation/Invitation";
import PasswordReset from "./pages/PasswordReset/PasswordReset";
import NewPassword from "./pages/NewPassword/NewPassword";
import Workspace from "./pages/Workspace/Workspace";
import Team from "./pages/Team/Team";

import { AuthProvider } from "./contexts/AuthContext";
import { CompanyProvider } from "./contexts/CompanyContext";

import "./styles/reset.css";
import "./styles/index.scss";

function App() {
  return (
    <AuthProvider>
      <CompanyProvider>
        <div className="App">
          <Router>
            <Routes>
              <Route path="/:company_slug/" element={<Home />} />
              <Route
                path="/:company_slug/workspaces/:workspace_id"
                element={<Workspace />}
              />

              <Route
                path="/:company_slug/settings"
                element={<CompanySettings />}
              />
              <Route
                path="/:company_slug/invitation"
                element={<Invitation />}
              />
              <Route
                path="/:company_slug/password-reset"
                element={<PasswordReset />}
              />
              <Route
                path="/:company_slug/new-password"
                element={<NewPassword />}
              />
              <Route path="/:company_slug/teams/:team_id" element={<Team />} />
            </Routes>
          </Router>
        </div>
      </CompanyProvider>
    </AuthProvider>
  );
}

export default App;
