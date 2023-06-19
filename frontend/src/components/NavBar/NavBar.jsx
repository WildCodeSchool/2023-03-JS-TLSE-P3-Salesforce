import "./NavBar.scss";
import React, { useState } from "react";
import BoardComponentNavBar from "../BoardSubNavBar/BoardComponentNavBar";

export default function NavBar() {
  const [isSubNavBarOpen, setIsSubNavBarOpen] = useState(false);

  return (
    <div className="globalNavBar">
      <div className="mainNavBar">
        <div className="firstPartButtonsNavBar">
          <div className="logoCompanyNavBar">
            <img
              src="/src/public/assets/logo/Logo-default.png"
              alt="logo default company"
            />
          </div>
          <div className="iconNavBar">
            <button type="button">
              <i className="fi fi-rr-home" />
            </button>
            <button type="button">
              <i className="fi fi-rr-users" />
            </button>
            <button
              type="button"
              onClick={() => setIsSubNavBarOpen(!isSubNavBarOpen)}
            >
              <i className="fi fi-rr-bulb" />
            </button>
            <button
              type="button"
              onClick={() => setIsSubNavBarOpen(!isSubNavBarOpen)}
            >
              <i className="fi fi-rr-apps" />
            </button>
            <button type="button">
              <i className="fi fi-rr-settings-sliders" />
            </button>
          </div>
        </div>
        <div className="secondPartButtonsNavBar">
          <div className="iconNavBar">
            <button type="button">
              <i className="fi fi-rr-interrogation" />
            </button>
          </div>
          <div className="LogoSalesForceNavBar">
            <img
              src="/src/public/assets/logo/logo_SalesForce_Theme_Clair.svg"
              alt="logo SalesForce"
            />
          </div>
        </div>
      </div>
      {isSubNavBarOpen && (
        <div className="firstSubNavBar">
          <div>
            <p className="titleSubNavBar">Tableaux</p>
            <div className="buttonForMoment">
              <i className="fi fi-rr-plus" />
              <div className="textBoardComponentNavBar">
                <p className="titleBoardComponentNavBar">Nouveau tableau</p>
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
    </div>
  );
}
