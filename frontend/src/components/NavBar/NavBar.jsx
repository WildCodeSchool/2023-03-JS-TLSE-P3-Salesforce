import "./NavBar.scss";
import React, { useState } from "react";
import BoardComponentNavBar from "../BoardSubNavBar/BoardComponentNavBar";
import IdeaSubNavBar from "../IdeaSubNavBar/IdeaComponentNavBar";

export default function NavBar() {
  const [isSubNavBarArrayOpen, setIsSubNavBarArrayOpen] = useState(false);
  const [isSubNavBarIdeaOpen, setIsSubNavBarIdeaOpen] = useState(false);

  return (
    <div className="global-nav-bar">
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
              onClick={() => setIsSubNavBarIdeaOpen(!isSubNavBarIdeaOpen)}
            >
              <i className="fi fi-rr-bulb" />
            </button>
            <button
              type="button"
              // au click, on fait apparaitre le sous-menu
              onClick={() => setIsSubNavBarArrayOpen(!isSubNavBarArrayOpen)}
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
      </div>
      {/* ternaire pour faire apparaitre le sous menu en fonction du state.
      L'action est déclenchée par le onClick du bouttons (L28) */}
      {isSubNavBarArrayOpen && (
        <div className="first-sub-nav-bar">
          <div>
            <p className="title-sub-nav-bar">Tableaux</p>
            <div className="button-for-moment">
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
      ;
      {isSubNavBarIdeaOpen && (
        <div className="first-sub-nav-bar">
          <div>
            <p className="title-sub-nav-bar">Idées</p>
            <div className="button-for-moment">
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
  );
}
