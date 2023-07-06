/* eslint-disable camelcase */
const models = require("../models");

const authenticationCheck = (req, res, next) => {
  const { email } = req.body;
  const { company_id } = req.params;

  models.user
    .getUserByMail(email, company_id)
    .then(([users]) => {
      if (users[0] != null) {
        [req.user] = users;
        next();
      } else {
        res.sendStatus(401);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const addUser = (req, res) => {
  models.user
    .insert(req.body)
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      if (err.code === "ER_DUP_ENTRY") {
        res.sendStatus(409);
      } else {
        console.error(err);
        res.sendStatus(500);
      }
    });
};

const read = (req, res) => {
  models.user
    .find(req.params.user_id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const browse = (req, res) => {
  models.user
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  authenticationCheck,
  read,
  browse,
  addUser,
};