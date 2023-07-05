const models = require("../models");

const createComment = (req, res) => {
  const { content } = req.body;
  models.comment
    .postComment(
      content,
      req.params.company_id,
      req.params.idea_id,
      req.params.user_id
    )
    .then(([result]) => {
      if (result.length) {
        res.location(`/comments/${result.insertId}`).sendStatus(201); // on reste sur res.location avec le path dédié ?
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getAllCommentsByIdea = (req, res) => {
  const { ideaId } = req.params;
  models.comment
    .findAllCommentsByIdea(ideaId)
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
  const { userId } = req.params;
  models.comment
    .findAllCommentsByIdea(userId)
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
  getAllCommentsByIdea,
  getAllCommentsByUser,
  getAllCountComment,
  createComment,
  deleteComment,
};
