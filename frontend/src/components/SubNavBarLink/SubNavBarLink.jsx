import PropTypes from "prop-types";
import "./SubNavBarLink.scss";
import { useNavigate } from "react-router-dom";

export default function SubNavBarLink({ title, subtitle, navigateLink }) {
  const navigate = useNavigate();
  return (
    <div
      className="sub-navbar-link"
      onClick={() => {
        navigateLink(navigate);
      }}
      aria-hidden="true"
    >
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
  navigateLink: () => {},
};

SubNavBarLink.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  navigateLink: PropTypes.func,
};
