/* eslint-disable camelcase */
import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { sanitize } from "isomorphic-dompurify";

import axios from "axios";
import "./UserProfile.scss";
import AuthContext from "../../contexts/AuthContext";
import CompanyContext from "../../contexts/CompanyContext";
import NavBar from "../../components/NavBar/NavBar";
import Alert from "../../components/Alert/Alert";

export default function UserProfile() {
  const navigate = useNavigate();
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
  const [isPutMessageVisible, setIsPutMessageVisible] = useState(false);
  const [putInfos, setPutInfos] = useState({});
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
    setBiography(userInfos.biography);
    setUserFunction(userInfos.function);
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
    const dataToPutProfile = {};
    for (const field in dataFromForm) {
      if (Object.hasOwn(dataFromForm, field)) {
        const value = dataFromForm[field];
        if (value) {
          if (field.includes("profile")) {
            dataToPutProfile[field.split("-")[1]] = value;
          } else if (
            !userInfos.is_salesforce_admin &&
            field.includes("company")
          ) {
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
        setUserInfos({ ...userInfos, ...response.data });
        setPutInfos({
          type: "success",
          message: "Profil bien mis à jour",
          icon: "assept-document",
        });
        setIsPutMessageVisible(true);

        if (!userInfos.is_salesforce_admin) {
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
                type: "success",
                message: "Profil bien mis à jour",
                icon: "assept-document",
              });
              setIsPutMessageVisible(true);
            })
            .catch((error) => {
              setPutInfos({
                type: "error",
                message: "Une erreur est survenue. Veuillez réessayer.",
                icon: "cross-circle",
              });
              setIsPutMessageVisible(true);
              console.error("Error updating user profile:", error);
            });
        }
      })
      .catch((error) => {
        setPutInfos({
          type: "error",
          message: "Une erreur est survenue. Veuillez réessayer.",
          icon: "cross-circle",
        });

        setIsPutMessageVisible(true);
        console.error("Error updating user profile:", error);
      });
  };
  return userToken &&
    Object.keys(userInfos).length &&
    (userCompaniesArray.includes(companyInfos.id.toString()) ||
      userInfos.is_salesforce_admin) ? (
    <main>
      <NavBar />
      <form className="profile" onSubmit={handleFormSubmit}>
        <div className="elements">
          <div className="about">
            <h2>À propos de vous</h2>
            <div className="input-line">
              <div className="profile-picture-container">
                <div className="picture">
                  <img src={profilePictureUrl} alt="Profil" />
                </div>
              </div>
              <div className="input-field">
                <label htmlFor="profile-picture_url">
                  Lien vers votre photo de profil
                </label>
                <p className="input-help">Il sera visible de tout le monde.</p>
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
            {!userInfos.is_salesforce_admin ? (
              <>
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
              </>
            ) : null}
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
                <label htmlFor="profile-email">
                  Adresse email (obligatoire)
                </label>
                <div className="input">
                  <i className="fi fi-rr-envelope" />
                  <input
                    type="email"
                    name="profile-email"
                    placeholder="Votre adresse email"
                    id="profile-email"
                    value={email}
                    autoComplete="off"
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
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
                <label htmlFor="profile-password">Mot de passe</label>
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
                <label htmlFor="password-confirmation">Confirmation</label>
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
        {isPutMessageVisible && (
          <Alert
            type={putInfos.type}
            text={putInfos.message}
            icon={putInfos.icon}
          />
        )}
      </form>
    </main>
  ) : (
    navigate(`/${company_slug}`)
  );
}
