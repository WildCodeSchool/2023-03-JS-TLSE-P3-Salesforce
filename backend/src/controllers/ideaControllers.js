/* eslint-disable camelcase */
const models = require("../models");

const createIdea = (req, res) => {
  const { company_id, user_id } = req.params;
  const { title, description, workspace_id } = req.body;
  models.idea
    .insert(title, description, company_id, user_id, workspace_id)
    .then(([result]) => {
      if (result.affectedRows) {
        res.status(201).json(result);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const getAllIdeasByUser = (req, res) => {
  models.idea
    .findAllIdeasByUser(req.params.user_id)
    .then(([results]) => {
      if (results.length) {
        res.status(200).json(results);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getAllIdeasByCompany = (req, res) => {
  const { company_id, user_id } = req.params;
  models.idea
    .findAllIdeasByCompany(company_id, user_id)
    .then(([results]) => {
      if (results.length) {
        res.status(200).json(results);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getAllIdeasByIdeasGroup = (req, res) => {
  models.idea
    .findAllIdeasByIdeasGroup(req.params.ideas_group_id)
    .then(([results]) => {
      if (results.length) {
        res.status(200).json(results);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
const updateIdeaById = (req, res) => {
  models.idea
    .update(req.body, req.params.idea_id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.status(201).send("l'idée a bien été modifiée");
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const updateCoordinatesIdeaWorkspace = (req, res) => {
  models.idea
    .updateCoordinatesIdea(req.body, req.params.idea_id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.status(204).send("l'idée a bien été modifiée");
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
const deleteIdea = (req, res) => {
  models.idea
    .delete(req.params.idea_id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.status(204).send("l'idée a bien été supprimée");
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const deleteIdeasWorkspace = (req, res) => {
  models.idea
    .deleteAllIdeasWorkspace(req.params.workspace_id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.status(204).send("les idées ont bien été supprimées");
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
module.exports = {
  getAllIdeasByUser,
  getAllIdeasByCompany,
  getAllIdeasByIdeasGroup,
  updateIdeaById,
  updateCoordinatesIdeaWorkspace,
  createIdea,
  deleteIdea,
  deleteIdeasWorkspace,
};
