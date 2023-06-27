const models = require("../models");

/* eslint-disable camelcase */
// afficher l'ensemble des équipes

const getTeams = (req, res) => {
  models.team
    .getAllTeams()
    .then(([result]) => {
      if (result.length > 0) {
        res.status(200).json(result);
      } else {
        res.sendStatus(404).send("Not Found");
      }
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).send("Error retrieving data from the database");
    });
};

// afficher une équipe

const getTeam = (req, res) => {
  models.team
    .getOneTeams()
    .then(([result]) => {
      if (result.length > 0) {
        res.status(200).json(result);
      } else {
        res.sendStatus(404).send("Not Found");
      }
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).send("Error retrieving data from the database");
    });
};

// afficher l'ensemble des membres d'une équipe

const getUsersTeam = (req, res) => {
  models.team
    .getUsersByTeam()
    .then(([result]) => {
      if (result.length > 0) {
        res.status(200).json(result);
      } else {
        res.sendStatus(404).send("Not Found");
      }
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).send("Error retrieving data from the database");
    });
}; // récuperer les équipes d'un utilisateur
const getTeamByUserId = (req, res) => {
  const { user_id } = req.query;
  models.user
    .getTeamsById(user_id)
    .then(([result]) => {
      if (result.length > 0) {
        res.status(200).json(result);
      } else {
        res.status(404).send("Not found");
      }
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).send("Error retrieving data from the database");
    });
};

// créer uen équipe
const createTeam = (req, res) => {
  const {
    name,
    creation_date,
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
      creation_date,
      is_private,
      picture_url,
      description,
      objective,
      status,
      user_id
    )
    .then(([result]) => {
      if (result.insertId) {
        res.location(`/:company_id/teams/${result.insertId}`).sendStatus(201);
      } else {
        res.sendStatus(404).send("Not Found");
      }
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500).send("error");
    });
};

// ajouter un membre à une equipe
const addUserTeam = (req, res) => {
  const {
    firstname,
    lastname,
    email,
    password,
    phone_number,
    picture_url,
    is_salesforce_admin,
    creation_date,
    color_id,
    has_accepted_invitation,
  } = req.body;

  models.team
    .postUserByTeam(
      firstname,
      lastname,
      email,
      password,
      phone_number,
      picture_url,
      is_salesforce_admin,
      creation_date,
      color_id,
      has_accepted_invitation
    )
    .then(([result]) => {
      if (result.insertId) {
        res
          .location(`/:company_id/:team_id/members/${result.insertId}`)
          .sendStatus(201);
      } else {
        res.sendStatus(404).send("Not Found");
      }
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500).send("error");
    });
};

// modifier une equipe
const updateProfileTeam = (req, res) => {
  const { id } = req.params;
  const {
    name,
    creation_date,
    is_private,
    picture_url,
    description,
    objective,
    status,
  } = req.body;

  models.team
    .updateTeam(
      id,
      name,
      creation_date,
      is_private,
      picture_url,
      description,
      objective,
      status,
      id
    )
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send("Not found");
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).send("Error updating team");
    });
};

// supprimer une équipe

const eraseTeam = (req, res) => {
  const { id } = req.params;
  models.team.deleteTeam(id).then(([result]) => {
    if (result.affectedRows > 0) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404).send("Not Found");
    }
  });
};

// supprimer un membre d'une équipe

const eraseUserTeam = (req, res) => {
  const { user_id } = req.params;
  models.team.deleteUserFromTeam(user_id).then(([result]) => {
    if (result.affectedRows > 0) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404).send("Not Found");
    }
  });
};

module.exports = {
  getTeams,
  getTeam,
  getUsersTeam,
  getTeamByUserId,
  createTeam,
  addUserTeam,
  updateProfileTeam,
  eraseTeam,
  eraseUserTeam,
};
