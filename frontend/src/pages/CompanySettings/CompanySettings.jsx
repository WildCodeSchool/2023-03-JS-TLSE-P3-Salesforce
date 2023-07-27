/* eslint-disable camelcase */
import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { sanitize } from "isomorphic-dompurify";
import axios from "axios";

import AuthContext from "../../contexts/AuthContext";
import CompanyContext from "../../contexts/CompanyContext";

import "../../components/IdeaCard/IdeaCard.scss";
import "./CompanySettings.scss";
import PageHeader from "../../components/PageHeader/PageHeader";
import HorizontalTabs from "../../components/HorizontalTabs/HorizontalTabs";
import Alert from "../../components/Alert/Alert";
import NavBar from "../../components/NavBar/NavBar";
import ColorPicker from "../../components/ColorPicker/ColorPicker";
import { defineColorTheme } from "../../../utils";
import CompanySettingsMembers from "../../components/CompanySettingsMembers/CompanySettingsMembers";
import CompanySettingCategories from "../../components/CompanySettingCategories/CompanySettingCategories";

export default function CompanySettings() {
  const { userToken, userInfos } = useContext(AuthContext);
  const { setCompanyInfos, companyInfos } = useContext(CompanyContext);
  const { company_slug } = useParams();
  const [activePage, setActivePage] = useState("members");
  const [logoUpdateAlert, setLogoUpdateAlert] = useState("");
  const [colors, setColors] = useState([]);
  const [colorUpdateAlert, setColorUpdateAlert] = useState("");
  const [companyNewLogoUrl, setCompanyNewLogoUrl] = useState(
    companyInfos.logo_url ||
      "https://res.cloudinary.com/dmmifezda/image/upload/v1689018967/logos/favicon-salesforce_yffz3d.svg"
  );
  const [selectedColor, setSelectedColor] = useState("");

  useEffect(() => {
    setCompanyInfos((prevCompanyInfos) => ({
      ...prevCompanyInfos,
      slug: sanitize(company_slug),
    }));
  }, [company_slug]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/colors`)
      .then((response) => {
        setColors(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const navigate = useNavigate();

  const handleLogoFormSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const dataFromForm = Object.fromEntries(formData.entries());

    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/companies/${companyInfos.id}`,
        dataFromForm,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then(() => {
        setCompanyInfos({ ...companyInfos, logo_url: dataFromForm.logo_url });
        setLogoUpdateAlert({
          type: "success",
          message: `Le logo de l'entreprise a bien été mis à jour ! `,
          icon: "check-circle",
        });
        setTimeout(() => {
          setLogoUpdateAlert("");
        }, 3000);
      })
      .catch((error) => {
        console.error(error);
        setLogoUpdateAlert({
          type: "error",
          message:
            "Impossible de modifier le logo de l'entreprise. Veuillez réessayer.",
          icon: "cross-circle",
        });
        setTimeout(() => {
          setLogoUpdateAlert("");
        }, 3000);
      });
  };
  const handleColorFormSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const dataFromForm = Object.fromEntries(formData.entries());
    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/companies/${companyInfos.id}`,
        dataFromForm,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then(() => {
        defineColorTheme(selectedColor);
        setColorUpdateAlert({
          type: "success",
          message: `La couleur de l'entreprise a bien été mis à jour ! `,
          icon: "check-circle",
        });
        setTimeout(() => {
          setColorUpdateAlert("");
        }, 3000);
      })
      .catch((error) => {
        console.error(error);
        setColorUpdateAlert({
          type: "error",
          message:
            "Impossible de modifier la couleur de l'entreprise. Veuillez réessayer.",
          icon: "cross-circle",
        });
        setTimeout(() => {
          setLogoUpdateAlert("");
        }, 3000);
      });
  };

  return userToken &&
    Object.keys(userInfos).length &&
    (userInfos.is_company_admin || userInfos.is_salesforce_admin) ? (
    <main>
      <NavBar activeLink="settings" />
      <PageHeader
        title="Paramètres d’entreprise"
        subtitle="Définissez les paramètres pour une collaboration harmonieuse au sein de votre entreprise."
      />
      <HorizontalTabs type="underline">
        <li
          className={activePage === "members" ? "active" : ""}
          type="button"
          onClick={() => {
            setActivePage("members");
          }}
          aria-hidden="true"
        >
          <i className="fi fi-rr-user-gear" />
          Membres
        </li>
        <li
          className={activePage === "categories" ? "active" : ""}
          type="button"
          onClick={() => {
            setActivePage("categories");
          }}
          aria-hidden="true"
        >
          <i className="fi fi-rr-tags" />
          Catégories
        </li>
        <li
          className={activePage === "personalisation" ? "active" : ""}
          type="button"
          onClick={() => {
            setActivePage("personalisation");
          }}
          aria-hidden="true"
        >
          <i className="fi fi-rr-swatchbook" />
          Personnalisation
        </li>
      </HorizontalTabs>

      {activePage === "members" && <CompanySettingsMembers />}

      {activePage === "categories" && <CompanySettingCategories />}

      {activePage === "personalisation" && (
        <section id="personalisation">
          <div className="table">
            <div className="table-header">
              <div className="content">
                <h2>Personnalisation</h2>
                <p>Adaptez l'apparence à l'image de votre entreprise.</p>
              </div>
            </div>
            <div className="table-content">
              <div className="elements-group">
                <h3>Logo de votre entreprise</h3>
                <div className="logo-container">
                  <div className="logo">
                    <img
                      src={companyNewLogoUrl}
                      alt="Logo de votre entreprise"
                    />
                  </div>
                  <form id="logo-update" onSubmit={handleLogoFormSubmit}>
                    <div className="input-line">
                      <div className="input-field">
                        <label htmlFor="logo_url">Lien vers votre logo</label>
                        <p className="input-help">
                          Il sera visible dans la navigation.
                        </p>
                        <div className="input">
                          <i className="fi fi-rr-link-alt" />
                          <input
                            type="url"
                            name="logo_url"
                            placeholder="Le lien vers votre photo de profil"
                            id="logo_url"
                            value={companyNewLogoUrl}
                            onChange={(event) => {
                              if (event.target.value) {
                                setCompanyNewLogoUrl(event.target.value);
                              } else {
                                setCompanyNewLogoUrl(
                                  "https://res.cloudinary.com/dmmifezda/image/upload/v1689018967/logos/favicon-salesforce_yffz3d.svg"
                                );
                              }
                            }}
                            autoComplete="off"
                          />
                        </div>
                      </div>
                    </div>
                    <button type="submit" className="button-md-primary-solid">
                      Modifier
                    </button>
                    {logoUpdateAlert && (
                      <Alert
                        type={logoUpdateAlert.type}
                        text={logoUpdateAlert.message}
                        icon={logoUpdateAlert.icon}
                      />
                    )}
                  </form>
                </div>
              </div>
              <div className="elements-group">
                <h3>Couleur du thème</h3>
                <form id="color-picker-form" onSubmit={handleColorFormSubmit}>
                  <div className="color-picker-container">
                    {colors.map((color) => (
                      <ColorPicker
                        key={color.id}
                        colorName={color.name}
                        colorId={color.id}
                        setSelectedColor={setSelectedColor}
                      />
                    ))}
                  </div>
                  <button type="submit" className="button-md-primary-solid">
                    Modifier
                  </button>
                  {colorUpdateAlert && (
                    <Alert
                      type={colorUpdateAlert.type}
                      text={colorUpdateAlert.message}
                      icon={colorUpdateAlert.icon}
                    />
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  ) : (
    navigate(`/${company_slug}`)
  );
}
