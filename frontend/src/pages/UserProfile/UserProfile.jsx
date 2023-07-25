/* eslint-disable camelcase */
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { sanitize } from "isomorphic-dompurify";

import axios from "axios";
import "./UserProfile.scss";
import AuthContext from "../../contexts/AuthContext";
import CompanyContext from "../../contexts/CompanyContext";
import NavBar from "../../components/NavBar/NavBar";
import Connection from "../../components/Connection/Connection";
import Alert from "../../components/Alert/Alert";

export default function UserProfile() {
  const { setUserInfos, userInfos, userToken } = useContext(AuthContext);
  const { setCompanyInfos, companyInfos } = useContext(CompanyContext);
  const { company_slug } = useParams();
  useEffect(() => {
    setCompanyInfos((prevCompanyInfos) => ({
      ...prevCompanyInfos,
      slug: sanitize(company_slug),
    }));
  }, [company_slug]);

  let userCompaniesArray = [];
  if (Object.keys(userInfos).length) {
    if (userInfos.companies) {
      userCompaniesArray = userInfos.companies.split(",");
    }
  }
  const [hasPutFailed, setPutInfos] = useState(false);
  const [putInfos, setHasPutFailed] = useState({});
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");
  const [userFunction, setUserFunction] = useState("");
  const [biography, setBiography] = useState("");
  const [profilePictureUrl, setProfilePictureUrl] = useState("");
  useEffect(() => {
    setEmail(userInfos.email);
    setFirstname(userInfos.firstname);
    setLastname(userInfos.lastname.toUpperCase());
    setPhoneNumber(userInfos.phone_number);
    setProfilePictureUrl(userInfos.picture_url);
  }, [userInfos]);

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
            setPutInfos({
              message: "Profil bien mis à jour",
              icon: "diamond-exclamation",
            });
          })
          .catch((error) => {
            if (error.response.status === 401) {
              setPutInfos({
                message:
                  "Les identifiants saisis semblent incorrects. Veuillez réessayer.",
                icon: "diamond-exclamation",
              });
            } else if (error.response.status === 403) {
              setPutInfos({
                message:
                  "Vous ne disposez pas des droits necessaires pour vous connecter à cette entreprise.",
                icon: "lock",
              });
            } else if (error.response.status === 500) {
              setPutInfos({
                message: "Une erreur est survenue. Veuillez réessayer.",
                icon: "cross-circle",
              });
            }
            setHasPutFailed(true);
          });
      })
      .catch(() => {
        setPutInfos({
          message: "Une erreur est survenue. Veuillez réessayer.",
          icon: "cross-circle",
        });

        setHasPutFailed(true);
      });
  };

  return userToken &&
    Object.keys(userInfos).length &&
    (userCompaniesArray.includes(companyInfos.id.toString()) ||
      userInfos.is_salesforce_admin) ? (
    <main>
      <NavBar activeLink="home" />
      <form className="profile" onSubmit={handleFormSubmit}>
        <div className="elements">
          <div className="about">
            <h2>À propos de vous</h2>
            <div className="input-line">
              <div className="logo-container input-field">
                <div className="logo">
                  <img src={profilePictureUrl} alt="Profil" />
                </div>
              </div>
              <div className="input-field">
                <label htmlFor="logo_url">Lien vers votre logo</label>
                <p className="input-help">
                  Il sera visible dans la navigation.
                </p>
                <div className="input">
                  <i className="fi fi-rr-link-alt" />
                  <input
                    type="url"
                    name="profile_picture_url"
                    placeholder="Le lien vers votre photo de profil"
                    id="profile_picture_url"
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
                <label htmlFor="profile-firstname">Prénom (obligatoire)</label>
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
                    value={email}
                    autoComplete="off"
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
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
          Modifier
          <i className="fi fi-rr-angle-right" />
        </button>
      </form>
      {hasPutFailed && (
        <Alert type="error" text={putInfos.message} icon={putInfos.icon} />
      )}
    </main>
  ) : (
    <Connection />
  );
}
