/* eslint-disable camelcase */
const models = require("../models");

const createIdea = (req, res) => {
  const { company_id, user_id } = req.params;

  models.idea
    .insert(req.body, company_id, user_id)
    .then(([results]) => {
      if (results.length) {
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
  const { companyId, userId } = req.params;
  models.idea
    .findAllIdeasByCompany(companyId, userId)
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
    .update(
      req.body,
      req.params.company_id,
      req.params.user_id,
      req.params.idea_id
    )
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

module.exports = {
  getAllIdeasByUser,
  getAllIdeasByCompany,
  getAllIdeasByIdeasGroup,
  updateIdeaById,
  createIdea,
  deleteIdea,
};
