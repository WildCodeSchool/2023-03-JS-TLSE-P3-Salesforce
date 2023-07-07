/* eslint-disable camelcase */
const models = require("../models");

const createIdeasGroup = (req, res) => {
  models.ideasgroup
    .insert(req.body, req.params.workspace_id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.status(201).send("le groupe d'idée a bien été créé");
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getAllIdeasGroupByWorkspace = (req, res) => {
  models.ideasgroup
    .findAllIdeasGroupByWorkspace(req.params.workspace_id)
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

const updateIdeasGroup = (req, res) => {
  models.ideasgroup
    .update(req.body, req.params.ideas_group_id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.status(204).send("le groupe d'idée a bien été modifiée");
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const deleteIdeasGroup = (req, res) => {
  models.ideasgroup
    .delete(req.params.ideas_group_id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.status(204).send("le groupe d'idée a bien été supprimée");
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
module.exports = {
  createIdeasGroup,
  getAllIdeasGroupByWorkspace,
  updateIdeasGroup,
  deleteIdeasGroup,
};
