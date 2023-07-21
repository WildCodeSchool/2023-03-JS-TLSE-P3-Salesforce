/* eslint-disable camelcase */
const models = require("../models");

const browsecatHasIdea = (req, res) => {
  models.category_has_idea
    .findAll()
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
const addcatHasIdea = (req, res) => {
  const { category_id, idea_id } = req.body;
  models.category_has_idea
    .insert(category_id, idea_id)
    .then(([result]) => {
      res.location(`/cathasidea/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  addcatHasIdea,
  browsecatHasIdea,
};
