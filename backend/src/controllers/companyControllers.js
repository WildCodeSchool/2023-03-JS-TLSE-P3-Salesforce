/* eslint-disable camelcase */
const models = require("../models");

const browseCompany = (req, res) => {
  models.company
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getCompany = (req, res) => {
  const { company_slug } = req.params;
  models.company
    .getCompanyBySlug(company_slug)
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

const editCompany = (req, res) => {
  const company = req.body;
  const { id } = req.params;
  models.company
    .update(company, id)
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

const addCompany = (req, res) => {
  const company = req.body;
  models.company
    .insert(company)
    .then(([result]) => {
      res.location(`/companies/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroyCompany = (req, res) => {
  const { id } = req.params;
  models.company
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
  browseCompany,
  getCompany,
  editCompany,
  addCompany,
  destroyCompany,
};
