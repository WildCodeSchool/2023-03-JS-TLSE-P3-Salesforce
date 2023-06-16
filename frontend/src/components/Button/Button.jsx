import PropTypes from "prop-types";

export default function Button({
  size,
  color,
  children,
  onClick,
  disabled,
  className,
  type,
}) {
  return (
    <button
      type="button"
      className={`button-${size}-${color}-${type} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  type: PropTypes.string,
};

Button.defaultProps = {
  size: "md",
  color: "primary",
  children: null,
  onClick: null,
  disabled: false,
  className: "",
  type: "solid",
};
