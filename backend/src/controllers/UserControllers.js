/* eslint-disable camelcase */
const models = require("../models");

// récupérer l'ensemble des utilisateurs
const getUsers = (req, res) => {
  const { company_id } = req.params;
  models.user
    .getAllUsers(company_id)
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
  const { user_id, company_id } = req.params;
  models.user
    .getOneUser(company_id, user_id)
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
  const { user_id } = req.params;
  models.user
    .modifyUserProfile(user_id, req.body)
    .then(([rows]) => {
      if (rows) {
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

// effacer un utilisateur
const deleteUser = (req, res) => {
  const { user_id, company_id } = req.params;
  models.user
    .deleteUserProfile(user_id, company_id)
    .then(([rows]) => {
      if (rows) {
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

module.exports = {
  getUsers,
  getUser,
  insertUser,
  updateUserProfile,
  deleteUser,
};
