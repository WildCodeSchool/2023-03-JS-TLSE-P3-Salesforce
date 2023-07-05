const models = require("../models");

const createLike = (req, res) => {
  const like = req.body;
  models.like
    .postLike(like)
    .then(([result]) => {
      if (result.length) {
        res.location(`/likes/${result.insertId}`).sendStatus(201); // on reste sur res.location avec le path dédié ?
      } else {
        res.sendStatus(404);
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
  models.like
    .delete(req.params.id)
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
