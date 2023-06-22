import "./NavBar.scss";
import React, { useState } from "react";
import SubNavBarLink from "../SubNavBarLink/SubNavBarLink";

export default function NavBar() {
  const [isSubNavBarWorkspaceOpen, setIsSubNavBarWorkspaceOpen] =
    useState(false);
  const [isSubNavBarTeamOpen, setIsSubNavBarTeamOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showSubMenuTeam, setShowSubMenuTeam] = useState(false);
  const [showSubMenuWorkspace, setShowSubMenuWorkspace] = useState(false);

  /* au click, ouvre ou ferme la subnavbar Tableau et ferme la subnavbar Idea si elle est ouverte */

  function openNavBarWorkspace() {
    setIsSubNavBarWorkspaceOpen(!isSubNavBarWorkspaceOpen);
    if (isSubNavBarTeamOpen === true) {
      setIsSubNavBarTeamOpen(!isSubNavBarTeamOpen);
    }
  }

  /* au click, ouvre ou ferme la subnavbar Idea et ferme la subnavbar tableau si elle est ouverte */
  function openNavBarTeam() {
    setIsSubNavBarTeamOpen(!isSubNavBarTeamOpen);
    if (isSubNavBarWorkspaceOpen === true) {
      setIsSubNavBarWorkspaceOpen(!isSubNavBarWorkspaceOpen);
    }
  }

  /* au click, ferme les navbar pouvant être ouvertes ailleurs */
  function closeSubNavBar() {
    if (isSubNavBarWorkspaceOpen === true) {
      setIsSubNavBarWorkspaceOpen(!isSubNavBarWorkspaceOpen);
    } else if (isSubNavBarTeamOpen === true) {
      setIsSubNavBarTeamOpen(!isSubNavBarTeamOpen);
    }
  }

  return (
    <div className="global-nav-bar">
      <nav>
        <div className="logo-company-nav-bar">
          <img
            src="/src/public/assets/logo/Logo-default.png"
            alt="logo default company"
          />
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
            <div className="logo-company-nav-bar">
              <img
                src="/src/public/assets/logo/Logo-default.png"
                alt="logo default company"
              />
            </div>
            <div className="icon-nav-bar">
              {/* au click, ferme les navbar pouvant être ouvertes ailleurs */}
              <button
                type="button"
                className="active"
                onClick={() => closeSubNavBar()}
              >
                <i className="fi fi-rr-home" />
              </button>
              <button type="button" onClick={() => openNavBarTeam()}>
                <i className="fi fi-rr-users" />
              </button>
              <button
                type="button"
                // au click, on fait apparaitre le sous-menu
                onClick={() => openNavBarWorkspace()}
              >
                <i className="fi fi-rr-apps" />
              </button>
              <button type="button">
                <i className="fi fi-rr-bulb" />
              </button>
              <button type="button" onClick={() => closeSubNavBar()}>
                <i className="fi fi-rr-settings-sliders" />
              </button>
            </div>
          </div>
          <div className="second-part-buttons-nav-bar">
            <div className="icon-nav-bar">
              <button type="button">
                <i className="fi fi-rr-interrogation" />
              </button>
            </div>
            <div className="logo-sales-force-nav-bar">
              <img
                src="/src/public/assets/logo/logo_SalesForce_Theme_Clair.svg"
                alt="logo SalesForce"
              />
            </div>
          </div>
          {/* ternaire pour faire apparaitre le sous menu des tableaux en fonction du state */}
        </div>
      </nav>
      {isSubNavBarWorkspaceOpen && (
        <div className="first-sub-nav-bar">
          <p className="title-sub-nav-bar">Tableaux</p>
          <button className="nav-bar-button" type="button">
            <i className="fi fi-rr-plus" />
            Nouveau tableau
          </button>
          <div className="links-sub-nav-bar">
            <SubNavBarLink title="Direction" subtitle="6 personnes" />
            <SubNavBarLink
              title="Ressources Humaines"
              subtitle="14 personnes"
            />
          </div>
        </div>
      )}
      {/* ternaire pour faire apparaitre le sous menu des équipes en fonction du state */}
      {isSubNavBarTeamOpen && (
        <div className="first-sub-nav-bar">
          <p className="title-sub-nav-bar">Équipes</p>
          <button className="nav-bar-button" type="button">
            <i className="fi fi-rr-plus" />
            Nouvelle équipe
          </button>
          <div className="links-sub-nav-bar">
            <SubNavBarLink title="Direction" subtitle="6 personnes" />
            <SubNavBarLink
              title="Ressources Humaines"
              subtitle="14 personnes"
            />
          </div>
        </div>
      )}
      {showMenu && (
        <div id="nav-links">
          <div className="main-part-nav-bar-menu-burger">
            <div className="top">
              <div className="logo">
                <img
                  src="/src/public/assets/logo/Logo-default.png"
                  alt="logo default company"
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
                  <img
                    src="https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"
                    alt="Profile"
                  />
                </div>
                <div className="content">
                  <p className="name">Jean-Jacques GOLDMAN</p>
                  <p className="email">jeanjacquesgoldman@monentreprise.com</p>
                </div>
              </div>
              <a
                className="salesforce-logo"
                href="https://www.salesforce.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/src/public/assets/logo/logo_SalesForce_Theme_Clair.svg"
                  alt=""
                />
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
