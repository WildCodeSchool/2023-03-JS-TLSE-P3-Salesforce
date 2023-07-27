/* eslint-disable camelcase */
const models = require("../models");

const createLike = (req, res) => {
  const { user_id, idea_id } = req.params;
  models.like
    .postLike(idea_id, user_id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(201);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getAllLikesByUser = (req, res) => {
  models.like
    .findAllLikesByUser(req.params.user_id)
    .then(([result]) => {
      if (result.length) {
        res.status(200).json(result);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getAllLikesByIdea = (req, res) => {
  models.like
    .findAllLikesByIdea(req.params.idea_id)
    .then(([result]) => {
      if (result.length) {
        res.status(200).json(result);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const deleteLike = (req, res) => {
  const { idea_id, user_id } = req.params;
  models.like
    .delete(idea_id, user_id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
module.exports = {
  getAllLikesByUser,
  getAllLikesByIdea,
  createLike,
  deleteLike,
};
