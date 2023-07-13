/* eslint-disable camelcase */
import { sanitize } from "isomorphic-dompurify";
import { useState, useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./PasswordReset.scss";

import axios from "axios";

import AuthContext from "../../contexts/AuthContext";
import CompanyContext from "../../contexts/CompanyContext";

import Alert from "../../components/Alert/Alert";

import SalesforceLogoSombre from "../../public/assets/logo/logo_SalesForce_Theme_Sombre.svg";
import SalesforceLogoClair from "../../public/assets/logo/logo_SalesForce_Theme_Clair.svg";

export default function Connection() {
  const { userToken } = useContext(AuthContext);

  const { company_slug } = useParams();
  const { setCompanyInfos, companyInfos } = useContext(CompanyContext);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    setCompanyInfos((prevCompanyInfos) => ({
      ...prevCompanyInfos,
      slug: sanitize(company_slug),
    }));
  }, [company_slug]);

  const [email, setEmail] = useState("");

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const style = getComputedStyle(document.body);
    const primary600 = style.getPropertyValue("--primary-600");
    const grey50 = style.getPropertyValue("--grey-50");

    const form = event.target;
    const formData = new FormData(form);
    const dataFromForm = Object.fromEntries(formData.entries());
    dataFromForm.primary600 = primary600;
    dataFromForm.grey50 = grey50;
    dataFromForm.company_slug = companyInfos.slug;

    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/password-reset`,
        dataFromForm,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then(() => {
        setAlertMessage({
          type: "success",
          message: "L'email a bien été envoyé",
          icon: "envelope-open-text",
        });
        setEmail("");
        setTimeout(() => {
          setAlertMessage("");
        }, 3000);
      })
      .catch((error) => {
        setAlertMessage({
          type: "error",
          message: "Impossible d'envoyer l'email à cette adresse",
          icon: "envelope-ban",
        });
        setTimeout(() => {
          setAlertMessage("");
        }, 3000);
        console.error(error.message);
      });
  };

  let companyLogoUrl =
    "https://res.cloudinary.com/dmmifezda/image/upload/v1689018967/logos/favicon-salesforce_yffz3d.svg";
  if (companyInfos.logo_url) {
    companyLogoUrl = companyInfos.logo_url;
  }
  return (
    <div id="password-reset">
      <div className="page">
        <div className="content">
          <div className="company-logo">
            <img src={companyLogoUrl} alt={`Logo de ${companyInfos.name}`} />
          </div>

          <header>
            <h1>Mot de passe oublié ?</h1>
            <p>
              Un email vous sera envoyé pour réinitialiser votre mot de passe.
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
                    onChange={(event) => {
                      setEmail(event.target.value);
                      setAlertMessage("");
                    }}
                  />
                </div>
              </div>
            </div>
            <button type="submit" className="button-lg-primary-solid">
              Envoyer
            </button>
            <Link
              to={`/${companyInfos.slug}/`}
              className="button-md-primary-link forgotten-password"
            >
              Déjà un compte ? Me connecter
            </Link>
          </form>
          {alertMessage && (
            <Alert
              type={alertMessage.type}
              text={alertMessage.message}
              icon={alertMessage.icon}
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
