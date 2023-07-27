const models = require("../models");

/* eslint-disable camelcase */
// afficher l'ensemble des équipes

const getTeams = (req, res) => {
  const { company_id } = req.params;
  models.team
    .getAllTeams(company_id)
    .then(([result]) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.error(err.message);
      res.sendStatus(500);
    });
};

// afficher une équipe

const getTeam = (req, res) => {
  const { team_id, company_id } = req.params;
  models.team
    .getOneTeam(team_id, company_id)
    .then(([result]) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.error(err.message);
      res.sendStatus(500);
    });
};

// afficher l'ensemble des membres d'une équipe

const getAllUsersFromTeam = (req, res) => {
  const { team_id } = req.params;
  models.team
    .getUsersByTeamId(team_id)
    .then(([rows]) => {
      if (rows) {
        res.status(200).send(rows);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

// afficher les équipes d'un utilisateur
const getAllTeamsFromUser = (req, res) => {
  const { user_id, company_id } = req.params;
  models.team
    .getTeamsByUserId(user_id, company_id)
    .then(([result]) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.error(err.message);
      res.sendStatus(500);
    });
};

// créer une équipe
const addTeamOnCompany = (req, res) => {
  const { body, params } = req;
  const { user_id, company_id } = params;

  models.team
    .addTeam(body, user_id, company_id)
    .then(([result]) => {
      if (result.affectedRows) {
        res
          .location(
            `/companies/${company_id}/users/"${user_id}teams/${result.insertId}`
          )
          .sendStatus(201);
        models.team.addUserByTeam(body.userId, result.insertId);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

// ajouter un membre à une equipe
const addUserOnTeam = (req, res) => {
  const { team_id } = req.params;
  const { userId } = req.body;

  models.team
    .addUserByTeam(userId, team_id)
    .then(([result]) => {
      if (result) {
        res
          .location(`/teams/${team_id}/users/${result.insertId}`)
          .sendStatus(201);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

// modifier une equipe
const updateTeamProfile = (req, res) => {
  const { body, params } = req;
  const { team_id } = params;

  models.team
    .modifyTeamProfile(team_id, body)
    .then(([rows]) => {
      if (rows.affectedRows) {
        res.status(204).send(rows);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

// supprimer une équipe

const deleteTeamFromCompany = (req, res) => {
  const { team_id } = req.params;
  models.team
    .deleteTeam(team_id)
    .then(([result]) => {
      if (result.affectedRows) {
        res.sendStatus(204);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.error(err.message);
      res.sendStatus(500);
    });
};

// supprimer un membre d'une équipe

const deleteUserFromTeam = (req, res) => {
  const { user_id, team_id } = req.params;
  models.team
    .deleteUser(user_id, team_id)
    .then(([rows]) => {
      if (rows.affectedRows) {
        res.sendStatus(204);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getTeamIdeas = (req, res) => {
  const { team_id, user_id } = req.params;
  models.team
    .findTeamIdeas(team_id, user_id)
    .then(([rows]) => {
      res.status(200).send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  getTeams,
  getTeam,
  getAllUsersFromTeam,
  getAllTeamsFromUser,
  addTeamOnCompany,
  addUserOnTeam,
  updateTeamProfile,
  deleteTeamFromCompany,
  deleteUserFromTeam,
  getTeamIdeas,
};
