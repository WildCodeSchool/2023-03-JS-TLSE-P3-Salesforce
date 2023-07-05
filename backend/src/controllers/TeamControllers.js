const models = require("../models");

/* eslint-disable camelcase */
// afficher l'ensemble des équipes

const getTeams = (req, res) => {
  const { company_id } = req.params;
  models.team
    .getAllTeams(company_id)
    .then(([result]) => {
      if (result.length) {
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
      if (result.length > 0) {
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

const getUsersTeam = (req, res) => {
  const { team_id } = req.query;
  models.team
    .getUsersByTeamId(team_id)
    .then(([result]) => {
      if (result.length) {
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

// récuperer les équipes d'un utilisateur
const getTeamsUser = (req, res) => {
  const { user_id } = req.query;
  models.team
    .getTeamsByUserId(user_id)
    .then(([result]) => {
      if (result.length) {
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
const createTeam = (req, res) => {
  const { company_id } = req.params;
  const {
    name,
    is_private,
    picture_url,
    description,
    objective,
    status,
    user_id,
  } = req.body;

  models.team
    .postTeam(
      name,
      is_private,
      picture_url,
      description,
      objective,
      status,
      user_id,
      company_id
    )
    .then(([result]) => {
      if (result.affectedRows) {
        res
          .location(`/companies/${company_id}/teams/${result.insertId}`)
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

// ajouter un membre à une equipe
const addUserTeam = (req, res) => {
  const { user_id, team_id } = req.body;

  models.team
    .addUserByTeam(user_id, team_id)
    .then(([result]) => {
      if (result.insertId) {
        res
          .location(
            `/companies/${company_id}/teams/${team_id}/users/${result.insertId}`
          )
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
const updateProfileTeam = (req, res) => {
  const { team_id } = req.params;
  const { name, is_private, picture_url, description, objective, status } =
    req.body;

  models.team
    .updateTeam(
      name,
      is_private,
      picture_url,
      description,
      objective,
      status,
      team_id
    )
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err.message);
      res.sendStatus(500);
    });
};

// supprimer une équipe

const eraseTeam = (req, res) => {
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

const eraseUserTeam = (req, res) => {
  const { user_id, team_id } = req.params;
  models.team
    .deleteUserFromTeam(user_id, team_id)
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

module.exports = {
  getTeams,
  getTeam,
  getUsersTeam,
  getTeamsUser,
  createTeam,
  addUserTeam,
  updateProfileTeam,
  eraseTeam,
  eraseUserTeam,
};
