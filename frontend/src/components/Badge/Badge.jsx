import React from "react";
import "./Badge.scss";
import PropTypes from "prop-types";

export default function Badge({ color, children }) {
  return <div className={`badge badge-${color}`}>{children}</div>;
}

Badge.propTypes = {
  color: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};
