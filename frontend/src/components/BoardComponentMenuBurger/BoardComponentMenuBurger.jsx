// eslint-disable-next-line import/no-unresolved
import "./BoardComponentMenuBurger.scss";
import PropTypes from "prop-types";

export default function BoardComponentMenuBurger({ title, subtitle }) {
  return (
    <div className="global-team-component-nav-bar">
      <div className="logo-and-text-component-nav-bar">
        <i className="fi fi-rr-apps" />
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
BoardComponentMenuBurger.defaultProps = {
  title: "Nom du tableau",
  subtitle: "auteur",
};

BoardComponentMenuBurger.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
};
