import React from "react";
import PropTypes from "prop-types";

import "./TeamCard.scss";

import Badge from "../Badge/Badge";

export default function TeamCard({ team }) {
  return (
    <div className="team-card">
      <div className="team-picture">
        {team.picture_url ? (
          <img src={team.picture_url} alt="team_picture" />
        ) : (
          <i className="fi fi-rr-users" />
        )}
      </div>
      <div className="team-card-content">
        <h3 className="name-team">{team.name}</h3>
        <p className="team-description">{team.description}</p>
      </div>
      <Badge color={team.status === "Active" ? "green" : "red"}>
        {team.status}
      </Badge>
    </div>
  );
}

TeamCard.propTypes = {
  team: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    picture_url: PropTypes.string,
    objective: PropTypes.string,
    status: PropTypes.string,
  }),
};

TeamCard.defaultProps = {
  team: {
    name: "titre de l'équipe",
    description: "description de l'équipe",
    objective: "objectif de l'équipe",
    status: "status",
  },
};
