/* eslint-disable camelcase */
const models = require("../models");

const createComment = (req, res) => {
  const { user_id, idea_id } = req.params;
  models.comment
    .postComment(req.body, idea_id, user_id)
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

const getAllCommentsByIdea = (req, res) => {
  models.comment
    .findAllCommentsByIdea(req.params.idea_id)
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
const getAllCommentsByUser = (req, res) => {
  models.comment
    .findAllCommentsByUser(req.params.user_id)
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

const getAllCountComment = (req, res) => {
  models.comment
    .findAllCountComments()
    .then((result) => {
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

const deleteComment = (req, res) => {
  models.comment
    .delete(req.params.comment_id)
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
  getAllCommentsByIdea,
  getAllCommentsByUser,
  getAllCountComment,
  createComment,
  deleteComment,
};
