import PropTypes from "prop-types";
import "./SubNavBarLink.scss";
import { Link } from "react-router-dom";

export default function SubNavBarLink({ title, subtitle, navigateLink }) {
  return (
    <Link to={navigateLink} className="sub-navbar-link">
      <div className="content">
        <p className="title">{title}</p>
        <p className="subtitle">{subtitle}</p>
      </div>
      <div className="icon">
        <i className="fi fi-rr-share-square" />
      </div>
    </Link>
  );
}

SubNavBarLink.defaultProps = {
  title: "Tableau XXX",
  subtitle: "Créateur·trice",
  navigateLink: "/",
};

SubNavBarLink.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  navigateLink: PropTypes.string,
};
