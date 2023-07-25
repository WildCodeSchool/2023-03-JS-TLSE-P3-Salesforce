import "./NavBar.scss";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import NewWorkspaceModal from "../NewWorkspaceModal/NewWorkspaceModal";
import SubNavBarLink from "../SubNavBarLink/SubNavBarLink";
import SalesforceLogo from "../../public/assets/logo/logo_SalesForce_Theme_Clair.svg";
import AuthContext from "../../contexts/AuthContext";
import CompanyContext from "../../contexts/CompanyContext";
import Avatar from "../Avatar/Avatar";

export default function NavBar({ activeLink }) {
  const navigate = useNavigate();
  const { setUser, userInfos, userToken } = useContext(AuthContext);
  let initials = "";
  if (userInfos.firstname && userInfos.lastname) {
    initials = userInfos.firstname[0] + userInfos.lastname[0];
  }
  const { companyInfos } = useContext(CompanyContext);

  let companyLogoUrl =
    "https://res.cloudinary.com/dmmifezda/image/upload/v1689018967/logos/favicon-salesforce_yffz3d.svg";
  if (companyInfos.logo_url) {
    companyLogoUrl = companyInfos.logo_url;
  }

  const [isSubNavBarWorkspaceOpen, setIsSubNavBarWorkspaceOpen] =
    useState(false);
  const [isSubNavBarTeamOpen, setIsSubNavBarTeamOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showSubMenuTeam, setShowSubMenuTeam] = useState(false);
  const [showSubMenuWorkspace, setShowSubMenuWorkspace] = useState(false);
  const [isNewWorkspaceModalOpen, setIsNewWorkspaceModalOpen] = useState(false);
  const [dataWorkspace, setDataWorkspace] = useState([]);
  const [setIsLoading] = useState(true);

  /* au click, ouvre ou ferme la subnavbar Tableau et ferme la subnavbar Idea si elle est ouverte */

  function openNavBarWorkspace() {
    setIsSubNavBarWorkspaceOpen(!isSubNavBarWorkspaceOpen);
    if (isSubNavBarTeamOpen === true) {
      setIsSubNavBarTeamOpen(!isSubNavBarTeamOpen);
    }
  }

  function openNewWorkspaceModal() {
    setIsNewWorkspaceModalOpen(true);
  }

  /* au click, ferme les navbar pouvant être ouvertes ailleurs */
  function closeSubNavBar() {
    if (isSubNavBarWorkspaceOpen === true) {
      setIsSubNavBarWorkspaceOpen(!isSubNavBarWorkspaceOpen);
    } else if (isSubNavBarTeamOpen === true) {
      setIsSubNavBarTeamOpen(!isSubNavBarTeamOpen);
    }
  }

  useEffect(() => {
    if (companyInfos.id && userInfos.id) {
      axios
        .get(
          `${import.meta.env.VITE_BACKEND_URL}/companies/${
            companyInfos.id
          }/users/${userInfos.id}/workspaces/`,
          {
            headers: { Authorization: `Bearer ${userToken}` },
          }
        )
        .then((response) => {
          setDataWorkspace(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching workspaces:", error);
        });
    }
  }, [companyInfos.id, userInfos.id, userToken]);

  return (
    <div className="global-nav-bar">
      <nav>
        <div
          className="logo-company-nav-bar"
          onClick={() => {
            navigate(`/${companyInfos.slug}/`);
          }}
          aria-hidden="true"
        >
          <img src={companyLogoUrl} alt={`Logo de ${companyInfos.name}`} />
        </div>

        <div className="burger-nav-bar">
          <i
            className="fi fi-rr-bars-staggered"
            onClick={() => setShowMenu(true)}
            aria-hidden="true"
          />
        </div>

        <div className="main-nav-bar">
          <div className="first-part-buttons-nav-bar">
            <div
              className="logo-company-nav-bar"
              onClick={() => {
                navigate(`/${companyInfos.slug}/`);
              }}
              aria-hidden="true"
            >
              <img src={companyLogoUrl} alt={`Logo de ${companyInfos.name}`} />
            </div>
            <div className="icon-nav-bar">
              <button
                type="button"
                className={activeLink === "home" ? "active" : ""}
                onClick={() => {
                  closeSubNavBar();
                  navigate(`/${companyInfos.slug}/`);
                }}
              >
                <i className="fi fi-rr-home" />
                <div className="tooltip">
                  <span>Accueil</span>
                </div>
              </button>
              <button
                type="button"
                className={activeLink === "teams" ? "active" : ""}
                onClick={() => {
                  navigate(`/${companyInfos.slug}/users/teams/`);
                }}
                aria-hidden="true"
              >
                <i className="fi fi-rr-users" />
                <div className="tooltip">
                  <span>Mes équipes</span>
                </div>
              </button>
              <button
                type="button"
                className={activeLink === "workspace" ? "active" : ""}
                onClick={() => {
                  openNavBarWorkspace();
                }}
              >
                <i className="fi fi-rr-apps" />
                <div className="tooltip">
                  <span>Mes espaces de travail</span>
                </div>
              </button>
              <button
                type="button"
                className={activeLink === "ideas" ? "active" : ""}
                onClick={() => {
                  navigate(`/${companyInfos.slug}/users/ideas/`);
                }}
                aria-hidden="true"
              >
                <i className="fi fi-rr-bulb" />
                <div className="tooltip">
                  <span>Mes idées</span>
                </div>
              </button>
              {userInfos.is_salesforce_admin || userInfos.is_company_admin ? (
                <button
                  type="button"
                  className={activeLink === "settings" ? "active" : ""}
                  onClick={() => {
                    closeSubNavBar();
                    navigate(`/${companyInfos.slug}/settings`);
                  }}
                >
                  <i className="fi fi-rr-settings-sliders" />
                  <div className="tooltip">
                    <span>Paramètres entreprise</span>
                  </div>
                </button>
              ) : null}
            </div>
          </div>
          <div className="second-part-buttons-nav-bar">
            <div className="icon-nav-bar">
              <button type="button">
                <i className="fi fi-rr-interrogation" />
                <div className="tooltip">
                  <span>Mentions légales</span>
                </div>
              </button>
            </div>
            <div className="icon-nav-bar">
              <button
                type="button"
                onClick={() => {
                  setUser("");
                }}
              >
                <i className="fi fi-rr-sign-out-alt" />
                <div className="tooltip">
                  <span>Se déconnecter</span>
                </div>
              </button>
            </div>
            <div className="avatar">
              {userInfos.picture_url ? (
                <Avatar type="navbar" pictureUrl={userInfos.picture_url} />
              ) : (
                <Avatar type="navbar" initials={initials} />
              )}
              <div className="tooltip">
                <span>Mon profil</span>
              </div>
            </div>

            <a
              className="salesforce-logo-nav-bar"
              href="https://www.salesforce.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={SalesforceLogo} alt="Salesforce logo" />
            </a>
          </div>
          {/* ternaire pour faire apparaitre le sous menu des tableaux en fonction du state */}
        </div>
      </nav>

      {isSubNavBarWorkspaceOpen && (
        <div className="first-sub-nav-bar">
          <p className="title-sub-nav-bar">Mes espaces de travail</p>
          <button
            className="nav-bar-button"
            type="button"
            onClick={openNewWorkspaceModal} // Appeler la fonction pour ouvrir la modal
          >
            <i className="fi fi-rr-plus" />
            Nouvel espace
          </button>
          {isNewWorkspaceModalOpen && (
            <NewWorkspaceModal
              setIsNewWorkspaceModalOpen={setIsNewWorkspaceModalOpen}
            />
          )}
          <div className="links-sub-nav-bar">
            {/* Utilisez map pour afficher chaque espace de travail */}
            {dataWorkspace.map((workspace) => (
              <SubNavBarLink
                key={workspace.id}
                title={workspace.name}
                subtitle={
                  workspace.team_name !== null
                    ? `${workspace.team_name}`
                    : `${
                        workspace.creator_firstname
                      } ${workspace.creator_lastname.toUpperCase()}`
                }
                navigateLink={`/${companyInfos.slug}/workspaces/${workspace.id}`}
              />
            ))}
          </div>
        </div>
      )}

      {showMenu && (
        <div id="nav-links">
          <div className="main-part-nav-bar-menu-burger">
            <div className="top">
              <div className="logo">
                <img
                  src={companyLogoUrl}
                  alt={`Logo de ${companyInfos.name}`}
                />
              </div>
              <div className="content">
                <div className="link">
                  <div className="text">
                    <i className="fi fi-rr-home" />
                    <p>Accueil</p>
                  </div>
                </div>
                <div
                  className={`link-with-sub-links ${
                    showSubMenuTeam ? "active" : ""
                  }`}
                >
                  <div
                    className="link"
                    onClick={() => setShowSubMenuTeam(!showSubMenuTeam)}
                    onKeyDown={() => {}}
                    role="button"
                    tabIndex="0"
                  >
                    <div className="text">
                      <i className="fi fi-rr-users" />
                      <p>Équipes</p>
                    </div>
                    <div className="arrow">
                      <i
                        className={`fi fi-rr-angle-small-${
                          showSubMenuTeam ? "up" : "down"
                        }`}
                      />
                    </div>
                  </div>
                  {showSubMenuTeam && (
                    <div className="sub-links">
                      <div className="sub-part-menu-burger">
                        <SubNavBarLink
                          title="Direction"
                          subtitle="6 personnes"
                        />
                        <SubNavBarLink
                          title="Ressources Humaines"
                          subtitle="14 personnes"
                        />
                      </div>
                    </div>
                  )}
                </div>
                <div
                  className={`link-with-sub-links ${
                    showSubMenuWorkspace ? "active" : ""
                  }`}
                >
                  <div
                    className="link"
                    onClick={() =>
                      setShowSubMenuWorkspace(!showSubMenuWorkspace)
                    }
                    onKeyDown={() => {}}
                    role="button"
                    tabIndex="0"
                  >
                    <div className="text">
                      <i className="fi fi-rr-apps" />
                      <p>Tableaux</p>
                    </div>
                    <div className="arrow">
                      <i
                        className={`fi fi-rr-angle-small-${
                          showSubMenuWorkspace ? "up" : "down"
                        }`}
                      />
                    </div>
                  </div>
                  {showSubMenuWorkspace && (
                    <div className="sub-links">
                      <div className="sub-part-menu-burger">
                        <SubNavBarLink
                          title="Refonte des extranets"
                          subtitle="Pierre DUPONT"
                        />
                        <SubNavBarLink
                          title="Bien être au travail"
                          subtitle="Direction"
                        />
                      </div>
                    </div>
                  )}
                </div>
                <div className="link">
                  <div className="text">
                    <i className="fi fi-rr-bulb" />
                    <p>Idées</p>
                  </div>
                </div>
                {userInfos.is_salesforce_admin || userInfos.is_company_admin ? (
                  <div
                    className="link"
                    onClick={() => {
                      closeSubNavBar();
                      navigate(`/${companyInfos.slug}/settings`);
                    }}
                    aria-hidden="true"
                  >
                    <div className="text">
                      <i className="fi fi-rr-settings-sliders" />
                      <p>Paramètres entreprise</p>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="bottom">
              <div className="link">
                <div className="text">
                  <i className="fi fi-rr-interrogation" />
                  <p>Mentions légales</p>
                </div>
              </div>
              <div className="profile">
                <div className="avatar">
                  {userInfos.picture_url ? (
                    <Avatar type="navbar" pictureUrl={userInfos.picture_url} />
                  ) : (
                    <Avatar type="navbar" initials={initials} />
                  )}
                </div>
                <div className="content">
                  <p className="name">
                    {userInfos.firstname} {userInfos.lastname.toUpperCase()}
                  </p>
                  <p className="email">{userInfos.email}</p>
                  <button
                    className="log-out"
                    onClick={() => {
                      setUser("");
                    }}
                    type="button"
                  >
                    <i className="fi fi-rr-sign-out-alt" />
                    Se déconnecter
                  </button>
                </div>
              </div>
              <a
                className="salesforce-logo"
                href="https://www.salesforce.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={SalesforceLogo} alt="Salesforce logo" />
              </a>
            </div>
          </div>
          <div className="close-menu-burger">
            <div
              className="icon-nav-bar"
              onClick={() => setShowMenu(false)}
              onKeyDown={() => {}}
              role="button"
              tabIndex="0"
            >
              <button type="button">
                <i className="fi fi-rr-cross" />
              </button>
            </div>
          </div>
        </div>
      )}

      {isSubNavBarWorkspaceOpen || isSubNavBarTeamOpen || showMenu ? (
        <div className="filter" onClick={closeSubNavBar} aria-hidden="true" />
      ) : null}
    </div>
  );
}

NavBar.propTypes = {
  activeLink: PropTypes.string,
};

NavBar.defaultProps = {
  activeLink: "home",
};
