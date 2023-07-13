import { sanitize } from "isomorphic-dompurify";
import { useState, useContext } from "react";
import "./Connection.scss";

import axios from "axios";
import { Link } from "react-router-dom";

import AuthContext from "../../contexts/AuthContext";
import CompanyContext from "../../contexts/CompanyContext";

import Alert from "../Alert/Alert";

import SalesforceLogoSombre from "../../public/assets/logo/logo_SalesForce_Theme_Sombre.svg";
import SalesforceLogoClair from "../../public/assets/logo/logo_SalesForce_Theme_Clair.svg";

export default function Connection() {
  const { setUser, setUserInfos } = useContext(AuthContext);

  const { companyInfos } = useContext(CompanyContext);
  let companyLogoUrl =
    "https://res.cloudinary.com/dmmifezda/image/upload/v1689018967/logos/favicon-salesforce_yffz3d.svg";
  if (companyInfos.logo_url) {
    companyLogoUrl = companyInfos.logo_url;
  }
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasConnectionFailed, setHasConnectionFailed] = useState(false);
  const [failedConnectionInfos, setFailedConnectionInfos] = useState({});

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const dataFromForm = Object.fromEntries(formData.entries());

    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/companies/${
          companyInfos.id
        }/user/login`,
        dataFromForm
      )
      .then((response) => {
        if (response.data.token) {
          setUser(response.data.token);
          setUserInfos(
            response.data.user,
            response.data.role,
            response.data.companies
          );
        } else {
          setHasConnectionFailed(true);
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setFailedConnectionInfos({
            message:
              "Les identifiants saisis semblent incorrects. Veuillez réessayer.",
            icon: "diamond-exclamation",
          });
        } else if (error.response.status === 403) {
          setFailedConnectionInfos({
            message:
              "Vous ne disposez pas des droits necessaires pour vous connecter à cette entreprise.",
            icon: "lock",
          });
        } else if (error.response.status === 500) {
          setFailedConnectionInfos({
            message: "Une erreur est survenue. Veuillez réessayer.",
            icon: "cross-circle",
          });
        } else {
          console.error(error);
        }
        setHasConnectionFailed(true);
      });
  };

  // handler for change in input mail
  const handleEmailChange = (event) => {
    setEmail(sanitize(event.target.value));
    setHasConnectionFailed(false);
  };

  // handler for change in password input
  const handlePasswordChange = (event) => {
    setPassword(sanitize(event.target.value));
    setHasConnectionFailed(false);
  };

  return (
    <div id="sign-in">
      <div className="page">
        <div className="content">
          <div className="company-logo">
            <img src={companyLogoUrl} alt={`Logo de ${companyInfos.name}`} />
          </div>

          <header>
            <h1>De retour ?</h1>
            <p>
              Connectez-vous et explorez un monde d'idées et de collaboration.
            </p>
          </header>
          <form className="sign-in" onSubmit={handleFormSubmit}>
            <div className="input-line">
              <div className="input-field">
                <label htmlFor="email">Adresse email</label>
                <div className="input">
                  <i className="fi fi-rr-envelope" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Votre adresse email"
                    id="email"
                    value={email}
                    autoComplete="email"
                    onChange={handleEmailChange}
                  />
                </div>
              </div>
            </div>
            <div className="input-line">
              <div className="input-field">
                <label htmlFor="password">Mot de passe</label>
                <div className="input">
                  <i className="fi fi-rr-lock" />
                  <input
                    type="password"
                    name="password"
                    placeholder="•••••••••••"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                    autoComplete="current-password"
                  />
                </div>
              </div>
            </div>
            <Link
              to={`/${companyInfos.slug}/password-reset`}
              className="button-md-primary-link forgotten-password"
            >
              Mot de passe oublié ?
            </Link>
            <button type="submit" className="button-lg-primary-solid">
              Se connecter
            </button>
          </form>
          {hasConnectionFailed && (
            <Alert
              type="error"
              text={failedConnectionInfos.message}
              icon={failedConnectionInfos.icon}
            />
          )}
        </div>
        <a
          className="salesforce-logo-desktop"
          href="https://www.salesforce.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={SalesforceLogoSombre}
            alt="Salesforce logo"
            className="salesforce-logo"
          />
        </a>
      </div>
      <div className="image" />
      <a
        className="salesforce-logo-mobile"
        href="https://www.salesforce.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={SalesforceLogoClair}
          alt="Salesforce logo"
          className="salesforce-logo"
        />
      </a>
    </div>
  );
}
