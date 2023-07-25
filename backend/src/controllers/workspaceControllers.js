/* eslint-disable camelcase */
const models = require("../models");

const getTeamWorkspaces = (req, res) => {
  const { team_id, user_id } = req.params;
  models.workspace
    .findWorkspacesByTeamId(team_id, user_id, req.isSalesForceAdmin)
    .then(([rows]) => {
      res.status(200).send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
const getTeamByWorkspace = (req, res) => {
  const { workspace_id } = req.params;
  models.workspace
    .findTeamByWorkspace(workspace_id)
    .then(([rows]) => {
      res.status(200).send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getUserWorkspaces = (req, res) => {
  const { user_id, company_id } = req.params;
  models.workspace
    .findUserWorkspacesByUserAndCompanyId(user_id, company_id)
    .then(([rows]) => {
      res.status(200).send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getWorkspaceUsers = (req, res) => {
  models.workspace
    .findWorkspacesUsersById(req.params.workspace_id)
    .then(([rows]) => {
      res.status(200).send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getWorkspaceIdeas = (req, res) => {
  const { workspace_id, user_id } = req.params;
  models.workspace
    .findWorkspaceIdeas(workspace_id, user_id)
    .then(([rows]) => {
      res.status(200).send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const createWorkspace = (req, res) => {
  const { user_id, company_id } = req.params;

  models.workspace
    .insertWorkspace(req.body, user_id, company_id)
    .then(([result]) => {
      models.workspace
        .insertUserInWorkspace(result.insertId, user_id)
        .catch((err) => {
          console.error(err);
          res.sendStatus(500);
        });
      res.status(201).send(result);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const addUserToWorkspace = (req, res) => {
  const { user_id, workspace_id } = req.params;
  if (req.isInWorkspace || req.isAdmin || req.userInTeam) {
    models.workspace
      .insertUserInWorkspace(workspace_id, user_id)
      .then(([rows]) => {
        res.status(201).send(rows);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
};

const updateWorkspace = (req, res) => {
  models.workspace
    .updateWorkspaceById(req.params.workspace_id, req.body)
    .then(([rows]) => {
      res.status(204).send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const deleteWorkspace = (req, res) => {
  models.workspace
    .deleteWorkspaceById(req.params.workspace_id)
    .then(([rows]) => {
      res.status(204).send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const removeWorkspaceUser = (req, res) => {
  const { user_id, workspace_id } = req.params;
  models.workspace
    .removeWorkspaceUser(workspace_id, user_id)
    .then(([rows]) => {
      res.status(204).send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  getTeamWorkspaces,
  getTeamByWorkspace,
  getUserWorkspaces,
  getWorkspaceUsers,
  getWorkspaceIdeas,
  createWorkspace,
  addUserToWorkspace,
  updateWorkspace,
  deleteWorkspace,
  removeWorkspaceUser,
};
