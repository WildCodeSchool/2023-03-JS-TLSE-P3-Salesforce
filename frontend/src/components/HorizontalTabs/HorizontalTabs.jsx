import "./HorizontalTabs.scss";
import PropTypes from "prop-types";

export default function HorizontalTabs({ type, children }) {
  return <ul className={`horizontal-tabs ${type}`}>{children}</ul>;
}

HorizontalTabs.defaultProps = {
  type: "tabs",
  children: null,
};

HorizontalTabs.propTypes = {
  type: PropTypes.string,
  children: PropTypes.node,
};
