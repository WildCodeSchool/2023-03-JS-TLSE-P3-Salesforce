import "./PageHeader.scss";
import PropTypes from "prop-types";

export default function PageHeader({ title, subtitle, children }) {
  return (
    <div className="page-header">
      <div className="content">
        {title ? <h1>{title}</h1> : null}
        {subtitle ? <h2>{subtitle}</h2> : null}
      </div>
      {children ? <div className="actions">{children}</div> : null}
    </div>
  );
}

PageHeader.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  children: PropTypes.node,
};

PageHeader.defaultProps = {
  title: null,
  subtitle: null,
  children: null,
};
