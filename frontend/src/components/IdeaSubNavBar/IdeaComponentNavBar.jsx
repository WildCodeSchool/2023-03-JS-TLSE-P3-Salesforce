import "./IdeaComponentNavBar.scss";
import PropTypes from "prop-types";

export default function IdeaSubNavBar({ title, subtitle }) {
  return (
    <div className="global-board-component-nav-bar">
      <i className="fi fi-rr-bulb" />
      <div className="text-board-component-nav-bar">
        <p className="title-board-component-nav-bar">{title}</p>
        <p className="subtitle-board-component-nav-bar">{subtitle}</p>
      </div>
      <div>
        <i className="fi fi-rr-menu-dots-vertical" />
      </div>
    </div>
  );
}
IdeaSubNavBar.defaultProps = {
  title: "Idée",
  subtitle: "User",
};

IdeaSubNavBar.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
};
