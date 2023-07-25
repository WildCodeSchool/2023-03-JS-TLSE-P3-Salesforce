/* eslint-disable camelcase */
const models = require("../models");

const browseCompanyCategories = (req, res) => {
  models.category
    .findByCompanyId(req.params.company_id)
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const readCategory = (req, res) => {
  const { id } = req.params;
  models.category
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

const editCategory = (req, res) => {
  const { name, color_id, company_id } = req.body;
  const { id } = req.params;
  models.category
    .update(name, color_id, company_id, id)
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

const addCategory = (req, res) => {
  const { name, color_id, company_id } = req.body;
  models.category
    .insert(name, color_id, company_id)
    .then(([result]) => {
      res.location(`/categories/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroyCategory = (req, res) => {
  const { id } = req.params;
  models.category
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
  browseCompanyCategories,
  readCategory,
  editCategory,
  addCategory,
  destroyCategory,
};
