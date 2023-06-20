import "./NavBar.scss";
import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
import BoardComponentNavBar from "../BoardSubNavBar/BoardComponentNavBar";
import IdeaSubNavBar from "../IdeaSubNavBar/IdeaComponentNavBar";

export default function NavBar() {
  const [isSubNavBarArrayOpen, setIsSubNavBarArrayOpen] = useState(false);
  const [isSubNavBarIdeaOpen, setIsSubNavBarIdeaOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  function openNavBarArray() {
    setIsSubNavBarArrayOpen(!isSubNavBarArrayOpen);
    if (isSubNavBarIdeaOpen === true) {
      setIsSubNavBarIdeaOpen(!isSubNavBarIdeaOpen);
    }
  }
  function openNavBarIdea() {
    setIsSubNavBarIdeaOpen(!isSubNavBarIdeaOpen);
    if (isSubNavBarArrayOpen === true) {
      setIsSubNavBarArrayOpen(!isSubNavBarArrayOpen);
    }
  }

  return (
    <div className="global-nav-bar">
      <div className="logo-company-nav-bar">
        <img
          src="/src/public/assets/logo/Logo-default.png"
          alt="logo default company"
        />
      </div>
      <div className="burger-nav-bar">
        <div
          className={showMenu ? "animationOpen" : "no-animation"}
          onClick={() => {
            setShowMenu(!showMenu);
          }}
          onKeyDown={() => {}}
          role="button"
          tabIndex="0"
        >
          <span />
          <span />
          <span />
        </div>
        <div
          id="nav-links"
          className={showMenu ? "burger-open" : "burger-close"}
        >
          <div className="main-part-nav-bar-menu-burger">
            <div className="logo-icon-and-mentionslegales-menu-burger">
              <div className="logo-and-icon-menu-burger">
                <div className="logo-company-menu-burger">
                  <img
                    src="/src/public/assets/logo/Logo-default.png"
                    alt="logo default company"
                  />
                </div>
                <div className="part-menu-burger">
                  <div className="icon-and-text-part-menu-burger">
                    <div className="icon-nav-bar">
                      <button type="button" className="active">
                        <i className="fi fi-rr-home" />
                      </button>
                    </div>
                    <p> Accueil</p>
                  </div>
                  <p />
                </div>
                <div className="part-menu-burger">
                  <div className="icon-and-text-part-menu-burger">
                    <div className="icon-nav-bar">
                      <button type="button">
                        <i className="fi fi-rr-users" />
                      </button>
                    </div>
                    <p>Équipes</p>
                  </div>
                  <div className="icon-nav-bar">
                    <button type="button">
                      <i className="fi fi-rr-angle-small-down" />
                    </button>
                  </div>
                </div>
                <div className="part-menu-burger">
                  <div className="icon-and-text-part-menu-burger">
                    <div className="icon-nav-bar">
                      <button type="button">
                        <i className="fi fi-rr-apps" />
                      </button>
                    </div>
                    <p>Tableaux</p>
                  </div>
                  <div className="icon-nav-bar">
                    <button type="button">
                      <i className="fi fi-rr-angle-small-down" />
                    </button>
                  </div>
                </div>
                <div className="part-menu-burger">
                  <div className="icon-and-text-part-menu-burger">
                    <div className="icon-nav-bar">
                      <button type="button">
                        <i className="fi fi-rr-bulb" />
                      </button>
                    </div>
                    <p>Idées</p>
                  </div>
                  <div className="icon-nav-bar">
                    <button type="button">
                      <i className="fi fi-rr-angle-small-down" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="logo-and-icon-menu-burger">
                <div className="part-menu-burger">
                  <div className="icon-and-text-part-menu-burger">
                    <div className="icon-nav-bar">
                      <button type="button">
                        <i className="fi fi-rr-interrogation" />
                      </button>
                    </div>
                    <p> Mentions légales</p>
                  </div>
                  <p />
                </div>
              </div>
            </div>
            <div className="profil-and-logosalesforce-menu-burger">
              <div className="profil-menu-burger">
                <div className="photo-profil-menu-burger">
                  <img
                    src="/src/public/assets/logo/Logo-default.png"
                    alt="logo default company"
                  />
                </div>
                <div className="text-profil-menu-burger">
                  <p>Jean-Jacques Goldman</p>
                  <p>jean-jacques.goldman@retraite.com</p>
                </div>
              </div>
              <div className="logo-salesforce-menu-burger">
                <img
                  src="/src/public/assets/logo/logo_SalesForce_Theme_Clair.svg"
                  alt="logo SalesForce"
                />
              </div>
            </div>
          </div>
          <div className="close-menu-burger">
            <div className="icon-nav-bar">
              <button type="button">
                <i className="fi fi-rr-cross" />
              </button>
            </div>
          </div>
        </div>
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
            <button type="button" className="active">
              <i className="fi fi-rr-home" />
            </button>
            <button type="button">
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
            <button type="button">
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
        {isSubNavBarArrayOpen && (
          <div className="first-sub-nav-bar">
            <div>
              <p className="title-sub-nav-bar">Tableaux</p>
              <div className="nav-bar-button">
                <i className="fi fi-rr-plus" />
                <div className="text-board-component-nav-bar">
                  <p className="title-board-component-nav-bar">
                    Nouveau tableau
                  </p>
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
      </div>
    </div>
  );
}
