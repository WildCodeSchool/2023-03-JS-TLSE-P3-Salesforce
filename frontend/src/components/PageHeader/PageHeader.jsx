import "./PageHeader.scss";

export default function PageHeader({ title, subtitle, children }) {
  return (
    <div className="page-header">
      <div className="content">
        {title ? <h1>{title}</h1> : null}
        {subtitle ? <h2>{subtitle}</h2> : null}
      </div>
      <div className="actions">{children}</div>
    </div>
  );
}
