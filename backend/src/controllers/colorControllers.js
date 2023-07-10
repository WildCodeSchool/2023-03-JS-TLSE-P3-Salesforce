const models = require("../models");

const browseColor = (req, res) => {
  models.color
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const readColor = (req, res) => {
  const { id } = req.params;
  models.color
    .find(id)
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

const editColor = (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  models.color
    .update(name, id)
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

const addColor = (req, res) => {
  const { name } = req.body;
  models.color
    .insert(name)
    .then(([result]) => {
      res.location(`/colors/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroyColor = (req, res) => {
  const { id } = req.params;
  models.color
    .delete(id)
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
  browseColor,
  readColor,
  editColor,
  addColor,
  destroyColor,
};
