import "./BoardComponentNavBar.scss";
import PropTypes from "prop-types";

export default function BoardSubNavBar({ title, subtitle }) {
  return (
    <div className="global-board-component-nav-bar">
      <div className="logo-and-text-component-nav-bar">
        <i className="fi fi-rr-apps" />
        <div className="text-board-component-nav-bar">
          <p className="title-board-component-nav-bar">{title}</p>
          <p className="subtitle-board-component-nav-bar">{subtitle}</p>
        </div>
      </div>
      <div>
        <i className="fi fi-rr-menu-dots-vertical" />
      </div>
    </div>
  );
}
BoardSubNavBar.defaultProps = {
  title: "Tableau",
  subtitle: "User",
};

BoardSubNavBar.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
};
