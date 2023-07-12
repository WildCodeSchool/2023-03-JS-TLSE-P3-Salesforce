/* eslint-disable camelcase */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import CompanySettings from "./pages/CompanySettings/CompanySettings";
import Invitation from "./pages/Invitation/Invitation";
import PasswordReset from "./pages/PasswordReset/PasswordReset";
import NewPassword from "./pages/NewPassword/NewPassword";
import "./styles/reset.css";
import "./styles/index.scss";

import { AuthProvider } from "./contexts/AuthContext";
import { CompanyProvider } from "./contexts/CompanyContext";

function App() {
  return (
    <AuthProvider>
      <CompanyProvider>
        <div className="App">
          <Router>
            <Routes>
              <Route path="/:company_slug/" element={<Home />} />
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
            </Routes>
          </Router>
        </div>
      </CompanyProvider>
    </AuthProvider>
  );
}

export default App;
