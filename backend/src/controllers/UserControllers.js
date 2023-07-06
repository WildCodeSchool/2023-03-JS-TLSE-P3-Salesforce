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

const insertUser = (req, res) => {
  const { user_id, company_id } = req.params;
  models.user
    .addUser(user_id, company_id)
    .then(([rows]) => {
      if (rows) {
        res.sendStatus(201);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

// mettre à jour un profil utilisateur
const updateUserProfile = (req, res) => {
  models.user
    .modifyUserProfile(req.params.user_id, req.body)
    .then(([rows]) => {
      res.status(204).send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

// effacer un utilisateur
const deleteUser = (req, res) => {
  const { user_id, company_id } = req.params;
  models.user
    .deleteUserProfile(user_id, company_id)
    .then(([rows]) => {
      res.status(204).send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  getUsers,
  getUser,
  insertUser,
  updateUserProfile,
  deleteUser,
};
