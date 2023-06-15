import "./NavBar.scss";
import BoardSubNavBar from "../BoardSubNavBar/BoardSubNavBar";

export default function NavBar() {
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
            <i className="fi fi-rr-home" />
            <i className="fi fi-rr-users" />
            <i className="fi fi-rr-bulb" />
            <i className="fi fi-rr-apps" />
            <i className="fi fi-rr-settings-sliders" />
          </div>
        </div>

        <div className="secondPartButtonsNavBar">
          <div className="iconNavBar">
            <i className="fi fi-rr-interrogation" />
          </div>
          <div className="LogoSalesForceNavBar">
            <img
              src="/src/public/assets/logo/logo_SalesForce_Theme_Clair.svg"
              alt="logo SalesForce"
            />
          </div>
        </div>
      </div>
      <div className="firstSubNavBar">
        <BoardSubNavBar />
      </div>
    </div>
  );
}
