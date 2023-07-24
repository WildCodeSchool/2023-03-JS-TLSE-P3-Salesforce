/* eslint-disable camelcase */
import "./WorkspaceCard.scss";
import propTypes from "prop-types";

import { Link, useParams } from "react-router-dom";

export default function WorkspaceCard({ workspace }) {
  const { company_slug } = useParams();

  return (
    <Link
      to={`/${company_slug}/workspaces/${workspace.id}`}
      className="workspace-card"
    >
      <div className="card-header">
        <div className="title">
          <div className="icon">
            <i className="fi fi-rr-apps" />
          </div>
          {workspace.name}
        </div>
        {workspace.is_private ? (
          <div className="private">
            <i className="fi fi-rr-eye-crossed" /> <span>Privé</span>
          </div>
        ) : null}
      </div>
      {workspace.description ? (
        <div className="card-body">
          <p>{workspace.description}</p>
        </div>
      ) : null}
      <div className="card-footer">
        {workspace.total_ideas}
        <i className="fi fi-rr-bulb" />
      </div>
    </Link>
  );
}

WorkspaceCard.propTypes = {
  workspace: propTypes.shape({
    id: propTypes.number.isRequired,
    name: propTypes.string.isRequired,
    description: propTypes.string,
    total_ideas: propTypes.number,
    is_private: propTypes.bool,
  }),
};

WorkspaceCard.defaultProps = {
  workspace: {},
};
