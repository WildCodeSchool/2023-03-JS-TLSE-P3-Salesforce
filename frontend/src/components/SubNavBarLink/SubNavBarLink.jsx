import PropTypes from "prop-types";
import "./SubNavBarLink.scss";

export default function SubNavBarLink({ title, subtitle }) {
  return (
    <div className="sub-navbar-link">
      <div className="content">
        <p className="title">{title}</p>
        <p className="subtitle">{subtitle}</p>
      </div>
      <div className="icon">
        <i className="fi fi-rr-share-square" />
      </div>
    </div>
  );
}

SubNavBarLink.defaultProps = {
  title: "Tableau XXX",
  subtitle: "Créateur·trice",
};

SubNavBarLink.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
};
