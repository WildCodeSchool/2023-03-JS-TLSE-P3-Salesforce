import React from "react";
import "./Badge.scss";
import PropTypes from "prop-types";

export default function Badge({ color, children }) {
  return <div className={`badge badge-${color}`}>{children}</div>;
}

Badge.defaultProps = {
  color: "blue",
  children: null,
};

Badge.propTypes = {
  color: PropTypes.string,
  children: PropTypes.node,
};
