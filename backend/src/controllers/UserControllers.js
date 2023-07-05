/* eslint-disable camelcase */
const models = require("../models");

// récupérer l'ensemble des utilisateurs
const getUsers = (req, res) => {
  models.user
    .getAllUsers(req.params.company_id)
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

// récupérer un utilisateur
const getUser = (req, res) => {
  models.user
    .getOneUser(req.params.company_id, req.params.user_id)
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

// ajouter un utilisateur à une entreprise

const createUser = (req, res) => {
  const { firstname, lastname, email,picture_url } = req.body;
  models.user
    .postUser(firstname, lastname, email,picture_url)
    .then(([result]) => {
      if (result.insertId) {
        res
          .location(`/companies/${company_id}/users/${result.insertId}`)
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

// mettre à jour un profil utilisateur
const updateProfileUser = (req, res) => {
  const { id } = req.params;
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

  models.user
    .updateUser(
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
      id
    )
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

// effacer un utilisateur
const eraseUser = (req, res) => {
  const { id } = req.params;
  models.user.deleteUser(id).then(([result]) => {
    if (result.affectedRows) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateProfileUser,
  eraseUser,
};
