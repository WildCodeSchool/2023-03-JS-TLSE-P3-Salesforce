/* eslint-disable camelcase */
import { sanitize } from "isomorphic-dompurify";
import { useState, useContext, useEffect } from "react";
import {
  Link,
  useParams,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import axios from "axios";
import "./Invitation.scss";

import SalesforceLogoSombre from "../../public/assets/logo/logo_SalesForce_Theme_Sombre.svg";
import SalesforceLogoClair from "../../public/assets/logo/logo_SalesForce_Theme_Clair.svg";

import AuthContext from "../../contexts/AuthContext";
import CompanyContext from "../../contexts/CompanyContext";

import Alert from "../../components/Alert/Alert";

export default function Connection() {
  const { setUser, setUserInfos, userInfos, userToken } =
    useContext(AuthContext);

  const navigate = useNavigate();
  const { company_slug } = useParams();
  const { setCompanyInfos, companyInfos } = useContext(CompanyContext);
  const [hasConnectionFailed, setHasConnectionFailed] = useState(true);
  const [hasPutFailed, setHasPutFailed] = useState(false);
  const [failedPutInfos, setFailedPutInfos] = useState({});

  const [searchParams] = useSearchParams();

  useEffect(() => {
    setCompanyInfos((prevCompanyInfos) => ({
      ...prevCompanyInfos,
      slug: sanitize(company_slug),
    }));
  }, [company_slug]);

  useEffect(() => {
    const email = sanitize(searchParams.get("email"));
    const password = sanitize(searchParams.get("activation_code"));

    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/companies/${
          companyInfos.id
        }/user/login`,
        {
          email,
          password,
        }
      )
      .then((response) => {
        if (response.data.token) {
          setUser(response.data.token);
          setUserInfos(
            response.data.user,
            response.data.role,
            response.data.companies
          );
          setHasConnectionFailed(false);
        } else {
          setHasConnectionFailed(true);
        }
      })
      .catch((error) => {
        console.error(error);
        setHasConnectionFailed(true);
      });
  }, [searchParams, companyInfos]);

  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userFunction, setUserFunction] = useState("");
  const [biography, setBiography] = useState("");
  const [profilePictureUrl, setProfilePictureUrl] = useState("");

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const dataFromForm = Object.fromEntries(formData.entries());
    const dataToPutCompany = {};
    const dataToPutProfile = { has_accepted_invitation: 1 };
    for (const field in dataFromForm) {
      if (Object.hasOwn(dataFromForm, field)) {
        const value = dataFromForm[field];
        if (value) {
          if (field.includes("profile")) {
            dataToPutProfile[field.split("-")[1]] = value;
          } else {
            dataToPutCompany[field.split("-")[1]] = value;
          }
        }
      }
    }
    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/users/${userInfos.id}`,
        dataToPutProfile,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then((response) => {
        setUserInfos(response.data);
        axios
          .put(
            `${import.meta.env.VITE_BACKEND_URL}/companies/${
              companyInfos.id
            }/users/${userInfos.id}`,
            dataToPutCompany,
            {
              headers: {
                Authorization: `Bearer ${userToken}`,
              },
            }
          )
          .then(() => {
            navigate(`/${company_slug}/`);
          })
          .catch((error) => {
            if (error.response.status === 401) {
              setHasPutFailed({
                message:
                  "Les identifiants saisis semblent incorrects. Veuillez réessayer.",
                icon: "diamond-exclamation",
              });
            } else if (error.response.status === 403) {
              setHasPutFailed({
                message:
                  "Vous ne disposez pas des droits necessaires pour vous connecter à cette entreprise.",
                icon: "lock",
              });
            } else if (error.response.status === 500) {
              setHasPutFailed({
                message: "Une erreur est survenue. Veuillez réessayer.",
                icon: "cross-circle",
              });
            }
            setFailedPutInfos(true);
          });
      })
      .catch(() => {
        setHasPutFailed({
          message: "Une erreur est survenue. Veuillez réessayer.",
          icon: "cross-circle",
        });

        setFailedPutInfos(true);
      });
  };

  let companyLogoUrl =
    "https://res.cloudinary.com/dmmifezda/image/upload/v1689018967/logos/favicon-salesforce_yffz3d.svg";
  if (companyInfos.logo_url) {
    companyLogoUrl = companyInfos.logo_url;
  }

  return hasConnectionFailed || userInfos.has_accepted_invitation ? (
    <div className="invitation-fail">
      <div className="container">
        <div className="header">
          <div className="icon">
            <i className="fi fi-rr-cross-circle" />
          </div>
          <div className="content">
            <h3>Oups !</h3>
            <div className="details">
              <p> Il semblerait que votre invitation ne soit plus valide.</p>
              <p>
                Contactez l'administateur de votre entreprise ou connectez vous.
              </p>
            </div>
          </div>
        </div>
        <div className="actions">
          <Link to={`/${company_slug}/`} className="button-md-primary-solid">
            Me connecter
          </Link>
        </div>
      </div>
    </div>
  ) : (
    <div id="sign-up">
      <div className="page">
        <div className="content">
          <div className="company-logo">
            <img src={companyLogoUrl} alt={`Logo de ${companyInfos.name}`} />
          </div>
          <header>
            <h1>Bienvenue !</h1>
            <p>
              Prêt·e à partager vos idées ? Créez votre compte très simplement.
            </p>
          </header>
          <form className="sign-up" onSubmit={handleFormSubmit}>
            <div className="elements">
              <div className="about">
                <h2>À propos de vous</h2>
                <div className="input-line">
                  <div className="input-field">
                    <label htmlFor="profile-picture_url">
                      Lien vers votre photo de profil
                    </label>
                    <div className="input">
                      <i className="fi fi-rr-link-alt" />
                      <input
                        type="url"
                        name="profile-picture_url"
                        placeholder="Le lien vers votre photo de profil"
                        id="profile-picture_url"
                        value={profilePictureUrl}
                        onChange={(event) => {
                          setProfilePictureUrl(event.target.value);
                        }}
                        autoComplete="off"
                      />
                    </div>
                  </div>
                </div>
                <div className="input-line">
                  <div className="input-field">
                    <label htmlFor="company-function">Fonction</label>
                    <div className="input">
                      <input
                        type="text"
                        name="company-function"
                        placeholder="Votre fonction dans l'entreprise"
                        id="company-function"
                        value={userFunction}
                        onChange={(event) => {
                          setUserFunction(event.target.value);
                        }}
                        autoComplete="organization-title"
                      />
                    </div>
                  </div>
                </div>
                <div className="input-line">
                  <div className="input-field">
                    <label htmlFor="company-biography">Présentation</label>
                    <div className="textarea">
                      <textarea
                        name="company-biography"
                        placeholder="Présentez vous en quelques mots"
                        id="company-biography"
                        rows="4"
                        value={biography}
                        onChange={(event) => {
                          setBiography(event.target.value);
                        }}
                        autoComplete="organization-title"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="account">
                <h2>Votre compte</h2>
                <div className="input-line">
                  <div className="input-field">
                    <label htmlFor="profile-firstname">
                      Prénom (obligatoire)
                    </label>
                    <div className="input">
                      <input
                        type="text"
                        name="profile-firstname"
                        placeholder="Votre prénom"
                        id="profile-firstname"
                        autoComplete="given-name"
                        onChange={(event) => {
                          setFirstname(event.target.value);
                        }}
                        value={firstname}
                      />
                    </div>
                  </div>
                </div>
                <div className="input-line">
                  <div className="input-field">
                    <label htmlFor="profile-lastname">Nom (obligatoire)</label>
                    <div className="input">
                      <input
                        type="text"
                        name="profile-lastname"
                        placeholder="Votre nom"
                        id="profile-lastname"
                        autoComplete="family-name"
                        onChange={(event) => {
                          setLastname(event.target.value);
                        }}
                        value={lastname}
                      />
                    </div>
                  </div>
                </div>

                <div className="input-line">
                  <div className="input-field">
                    <label htmlFor="email">Adresse email (obligatoire)</label>
                    <div className="input disabled">
                      <i className="fi fi-rr-envelope" />
                      <input
                        type="email"
                        name="email"
                        placeholder="Votre adresse email"
                        id="email"
                        value={searchParams.get("email")}
                        autoComplete="off"
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div className="input-line">
                  <div className="input-field">
                    <label htmlFor="profile-phone_number">Téléphone</label>
                    <div className="input">
                      <i className="fi fi-rr-phone-flip" />
                      <input
                        type="tel"
                        name="profile-phone_number"
                        placeholder="Votre numéro de téléphone professionnel"
                        id="profile-phone_number"
                        autoComplete="family-name"
                        onChange={(event) => {
                          setPhoneNumber(event.target.value);
                        }}
                        value={phoneNumber}
                      />
                    </div>
                  </div>
                </div>
                <div className="input-line">
                  <div className="input-field">
                    <label htmlFor="profile-password">
                      Mot de passe (obligatoire)
                    </label>
                    <div className="input">
                      <i className="fi fi-rr-lock" />
                      <input
                        type="password"
                        name="profile-password"
                        placeholder="•••••••••••"
                        id="profile-password"
                        value={password}
                        onChange={(event) => {
                          setPassword(event.target.value);
                        }}
                        autoComplete="new-password"
                      />
                    </div>
                  </div>
                  <div className="input-field">
                    <label htmlFor="password-confirmation">
                      Confirmation (obligatoire)
                    </label>
                    <div className="input">
                      <i className="fi fi-rr-lock" />
                      <input
                        type="password"
                        name="password-confirmation"
                        placeholder="•••••••••••"
                        id="password-confirmation"
                        value={passwordConfirmation}
                        onChange={(event) => {
                          setPasswordConfirmation(event.target.value);
                        }}
                        autoComplete="new-password"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button type="submit" className="button-lg-primary-solid">
              C'est parti !
              <i className="fi fi-rr-angle-right" />
            </button>
          </form>
          {hasPutFailed && (
            <Alert
              type="error"
              text={failedPutInfos.message}
              icon={failedPutInfos.icon}
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
