import "./Alert.scss";
import { useState } from "react";
import propTypes from "prop-types";

export default function Alert({
  children,
  type = "info",
  title,
  text,
  icon = "info",
  hasCloseButton,
}) {
  const [isAlertVisible, setIsAlertVisible] = useState(true);
  return (
    isAlertVisible && (
      <div className={`alert alert-${type}`}>
        <div className="icon">
          <i className={`fi fi-rr-${icon}`} />
        </div>
        <div className="alert-content">
          <p className="title">{title}</p>
          <p className="text">{text}</p>
          <div className="children">{children}</div>
        </div>
        {hasCloseButton && (
          <button
            className="close"
            type="button"
            onClick={() => setIsAlertVisible(false)}
          >
            <i className="fi fi-rr-cross-small" />
          </button>
        )}
      </div>
    )
  );
}

Alert.propTypes = {
  children: propTypes.node,
  type: propTypes.string,
  title: propTypes.string,
  text: propTypes.string,
  icon: propTypes.string,
  hasCloseButton: propTypes.bool,
};

Alert.defaultProps = {
  children: null,
  type: "info",
  title: "",
  text: "",
  icon: "info",
  hasCloseButton: false,
};
