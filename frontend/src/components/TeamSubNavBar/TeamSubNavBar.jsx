// eslint-disable-next-line import/no-unresolved
import "./TeamSubNavBar.scss";
import PropTypes from "prop-types";

export default function TeamSubNavBar({ title, subtitle }) {
  return (
    <div className="global-team-component-nav-bar">
      <div className="logo-and-text-component-nav-bar">
        <i className="fi fi-rr-users" />
        <div className="text-team-component-nav-bar">
          <p className="title-team-component-nav-bar">{title}</p>
          <p className="subtitle-team-component-nav-bar">{subtitle}</p>
        </div>
      </div>
      <div>
        <i className="fi fi-rr-menu-dots-vertical" />
      </div>
    </div>
  );
}
TeamSubNavBar.defaultProps = {
  title: "Nom d'équipe",
  subtitle: "objectif",
};

TeamSubNavBar.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
};
