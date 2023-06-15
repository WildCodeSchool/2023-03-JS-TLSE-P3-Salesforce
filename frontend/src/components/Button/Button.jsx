// import "./Button.scss";

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
