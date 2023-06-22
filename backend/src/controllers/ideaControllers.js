const models = require("../models");

const getAllIdeas = (req, res) => {
  models.idea
    .findAll()
    .then(([results]) => {
      res.send(results);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  models.idea
    .find(req.params.id)
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

const edit = (req, res) => {
  const idea = req.body;

  // TODO validations (length, format...)

  idea.id = parseInt(req.params.id, 10);

  models.idea
    .update(idea)
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

const add = (req, res) => {
  const idea = req.body;

  // TODO validations (length, format...)

  models.idea
    .insert(idea)
    .then(([result]) => {
      res.location(`/ideas/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const deleteIdea = (req, res) => {
  models.idea
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
  getAllIdeas,
  read,
  edit,
  add,
  deleteIdea,
};
