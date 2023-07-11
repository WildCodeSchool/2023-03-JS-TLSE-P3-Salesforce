/* eslint-disable camelcase */
import { sanitize } from "isomorphic-dompurify";
import { useState, useContext, useEffect } from "react";
import {
  Link,
  useParams,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import "./PasswordReset.scss";

import axios from "axios";

import AuthContext from "../../contexts/AuthContext";
import CompanyContext from "../../contexts/CompanyContext";

import Alert from "../../components/Alert/Alert";

export default function Connection() {
  const { setUser, setUserInfos, userInfos, userToken } =
    useContext(AuthContext);

  const navigate = useNavigate();
  const { company_slug } = useParams();
  const { setCompanyInfos, companyInfos } = useContext(CompanyContext);
  const [hasConnectionFailed, setHasConnectionFailed] = useState(false);
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
  }, [searchParams]);

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
            <img
              src="data:image/png;base64,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"
              alt="Logo de l'entreprise"
            />
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
                        type="text"
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
                        type="password-confirmation"
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
      </div>
      <div className="image" />
    </div>
  );
}
