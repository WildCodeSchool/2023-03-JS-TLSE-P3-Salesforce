import "./HorizontalTabs.scss";

export default function HorizontalTabs({ type, children }) {
  return <ul className={`horizontal-tabs ${type}`}>{children}</ul>;
}
