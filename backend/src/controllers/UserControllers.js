/* eslint-disable camelcase */
const models = require("../models");

// récupérer l'ensemble des utilisateurs
const getUsers = (req, res) => {
  models.user
    .getAllUsers()
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

// récupérer un utilisateur
const getUser = (req, res) => {
  models.user
    .getOneUser()
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

// ajouter un utilisateur à une entreprise

const createUser = (req, res) => {
  const { firstname, lastname, email, company_id } = req.body;

  models.user
    .postUser(firstname, lastname, email, company_id)
    .then(([result]) => {
      if (result.insertId) {
        res.location(`/:company_id/users/${result.insertId}`).sendStatus(201);
      } else {
        res.sendStatus(404).send("Not Found");
      }
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500).send("error");
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
      id,
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
      if (result.affectedRows === 0) {
        res.status(404).send("Not found");
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).send("Error updating user");
    });
};

// effacer un utilisateur
const eraseUser = (req, res) => {
  const { id } = req.params;
  models.user.deleteUser(id).then(([result]) => {
    if (result.affectedRows > 0) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404).send("Not Found");
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
