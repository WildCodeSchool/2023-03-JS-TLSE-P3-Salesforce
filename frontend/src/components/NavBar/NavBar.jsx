import "./NavBar.scss";
import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
import BoardComponentNavBar from "../BoardSubNavBar/BoardComponentNavBar";
import IdeaSubNavBar from "../IdeaSubNavBar/IdeaComponentNavBar";
// eslint-disable-next-line import/no-unresolved
import TeamSubNavBar from "../TeamSubNavBar/TeamSubNavbar";
// import BoardComponentMenuBurger from "../BoardComponentMenuBurger/BoardComponentMenuBurger";
// import IdeaMenuBurger from "../IdeaMenuBurger/IdeaMenuBurger";

export default function NavBar() {
  const [isSubNavBarWorkspaceOpen, setIsSubNavBarWorkspaceOpen] =
    useState(false);
  const [isSubNavBarIdeaOpen, setIsSubNavBarIdeaOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showSubMenuTeam, setShowSubMenuTeam] = useState(false);
  const [showSubMenuWorkspace, setShowSubMenuWorkspace] = useState(false);
  const [showSubMenuIdea, setShowSubMenuIdea] = useState(false);

  /* au click, ouvre ou ferme la subnavbar Tableau et ferme la subnavbar Idea si elle est ouverte */

  function openNavBarArray() {
    setIsSubNavBarWorkspaceOpen(!isSubNavBarWorkspaceOpen);
    if (isSubNavBarIdeaOpen === true) {
      setIsSubNavBarIdeaOpen(!isSubNavBarIdeaOpen);
    }
  }

  /* au click, ouvre ou ferme la subnavbar Idea et ferme la subnavbar tableau si elle est ouverte */
  function openNavBarIdea() {
    setIsSubNavBarIdeaOpen(!isSubNavBarIdeaOpen);
    if (isSubNavBarWorkspaceOpen === true) {
      setIsSubNavBarWorkspaceOpen(!isSubNavBarWorkspaceOpen);
    }
  }

  /* au click, ferme les navbar pouvant être ouvertes ailleurs */
  function closeSubNavBar() {
    if (isSubNavBarWorkspaceOpen === true) {
      setIsSubNavBarWorkspaceOpen(!isSubNavBarWorkspaceOpen);
    } else if (isSubNavBarIdeaOpen === true) {
      setIsSubNavBarIdeaOpen(!isSubNavBarIdeaOpen);
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
              <button type="button" onClick={() => closeSubNavBar()}>
                <i className="fi fi-rr-users" />
              </button>
              <button
                type="button"
                // au click, on fait apparaitre le sous-menu
                onClick={() => openNavBarIdea()}
              >
                <i className="fi fi-rr-bulb" />
              </button>
              <button
                type="button"
                // au click, on fait apparaitre le sous-menu
                onClick={() => openNavBarArray()}
              >
                <i className="fi fi-rr-apps" />
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
          <div>
            <p className="title-sub-nav-bar">Tableaux</p>
            <div className="nav-bar-button">
              <i className="fi fi-rr-plus" />
              <div className="text-board-component-nav-bar">
                <p className="title-board-component-nav-bar">Nouveau tableau</p>
              </div>
            </div>
          </div>
          <div>
            <BoardComponentNavBar />
            <BoardComponentNavBar />
            <BoardComponentNavBar />
          </div>
        </div>
      )}
      {/* ternaire pour faire apparaitre le sous menu des idées en fonction du state */}
      {isSubNavBarIdeaOpen && (
        <div className="first-sub-nav-bar">
          <div>
            <p className="title-sub-nav-bar">Idées</p>
            <div className="nav-bar-button">
              <i className="fi fi-rr-plus" />
              <div className="text-board-component-nav-bar">
                <p className="title-board-component-nav-bar">Nouvelle idée</p>
              </div>
            </div>
          </div>
          <div>
            <IdeaSubNavBar />
            <IdeaSubNavBar />
            <IdeaSubNavBar />
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
                        <TeamSubNavBar />
                        <TeamSubNavBar />
                        <TeamSubNavBar />
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
                        <TeamSubNavBar />
                        <TeamSubNavBar />
                        <TeamSubNavBar />
                      </div>
                    </div>
                  )}
                </div>
                <div
                  className={`link-with-sub-links ${
                    showSubMenuIdea ? "active" : ""
                  }`}
                >
                  <div
                    className="link"
                    onClick={() => setShowSubMenuIdea(!showSubMenuIdea)}
                    onKeyDown={() => {}}
                    role="button"
                    tabIndex="0"
                  >
                    <div className="text">
                      <i className="fi fi-rr-bulb" />
                      <p>Idées</p>
                    </div>
                    <div className="arrow">
                      <i
                        className={`fi fi-rr-angle-small-${
                          showSubMenuIdea ? "up" : "down"
                        }`}
                      />
                    </div>
                  </div>
                  {showSubMenuIdea && (
                    <div className="sub-links">
                      <div className="sub-part-menu-burger">
                        <TeamSubNavBar />
                        <TeamSubNavBar />
                        <TeamSubNavBar />
                      </div>
                    </div>
                  )}
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
      {isSubNavBarWorkspaceOpen || isSubNavBarIdeaOpen || showMenu ? (
        <div className="filter" onClick={closeSubNavBar} aria-hidden="true" />
      ) : null}
    </div>
  );
}
