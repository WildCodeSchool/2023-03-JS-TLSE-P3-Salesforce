import "./Connection.scss";
import SalesforceLogoSombre from "../../public/assets/logo/logo_SalesForce_Theme_Sombre.svg";
import SalesforceLogoClair from "../../public/assets/logo/logo_SalesForce_Theme_Clair.svg";

export default function Connection() {
  return (
    <div id="sign-in">
      <div className="page">
        <div className="content">
          <div className="company-logo">
            <img
              src="https://scontent-cdg4-3.xx.fbcdn.net/v/t39.30808-6/327812371_467766558735889_3516838030788183867_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=3UVdTzh5BXwAX-NmNA2&_nc_ht=scontent-cdg4-3.xx&oh=00_AfAwL4ySGf_99ZTGxnJZTo8tuTT93TknyHjANXf3XMadgQ&oe=64A9FFF8"
              alt="Logo de l'entreprise"
            />
          </div>
          <header>
            <h1>De retour ?</h1>
            <p>
              Connectez-vous et explorez un monde d'idées et de collaboration.
            </p>
          </header>
          <form className="sign-in">
            <div className="input-line">
              <div className="input-field">
                <label htmlFor="email">Adresse email</label>
                <div className="input">
                  <i className="fi fi-rr-envelope" />
                  <input
                    type="email"
                    placeholder="Votre adresse email"
                    id="email"
                  />
                </div>
              </div>
            </div>
            <div className="input-line">
              <div className="input-field">
                <label htmlFor="password">Mot de passe</label>
                <div className="input">
                  <i className="fi fi-rr-lock" />
                  <input
                    type="password"
                    placeholder="•••••••••••"
                    id="password"
                  />
                </div>
              </div>
            </div>
            <button type="submit" className="button-lg-primary-solid">
              Se connecter
            </button>
          </form>
        </div>
        <a
          className="salesforce-logo"
          href="https://www.salesforce.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={SalesforceLogoSombre}
            alt="Salesforce logo"
            className="salesforce-logo-desktop"
          />
        </a>
      </div>
      <div className="image" />
      <a
        className="salesforce-logo-mobile"
        href="https://www.salesforce.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={SalesforceLogoClair}
          alt="Salesforce logo"
          className="salesforce-logo"
        />
      </a>
    </div>
  );
}
