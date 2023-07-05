const models = require("../models");

const getTeamWorkspaces = (req, res) => {
  models.workspace
    .findWorkspaceByTeamId(req.params.team_id)
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getUserWorkspaces = (req, res) => {
  models.workspace
    .findUserWorkspacesByUserAndCompanyId(
      req.params.user_id,
      req.params.company_id
    )
    .then(([rows]) => {
      res.send(rows);
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
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getWorkspaceIdeas = (req, res) => {
  models.workspace
    .findWorkspaceIdeas(req.params.workspace_id, req.params.user_id)
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const createWorkspace = (req, res) => {
  models.workspace
    .insertWorkspace(req.body, req.params.company_id)
    .then(([rows]) => {
      models.workspace.insertUserInWorkspace(rows.insertId, req.body.userId);
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const addUserToWorkspace = (req, res) => {
  models.workspace
    .insertUserInWorkspace(req.params.workspace_id, req.params.user_id)
    .then(([rows]) => {
      res.send(rows).status(204);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const updateWorkspace = (req, res) => {
  models.workspace
    .updateWorkspaceById(req.params.workspace_id, req.body)
    .then(([rows]) => {
      res.send(rows).status(204);
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
      res.send(rows).status(204);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const removeWorkspaceUser = (req, res) => {
  models.workspace
    .removeWorkspaceUser(req.params.workspace_id, req.params.user_id)
    .then(([rows]) => {
      res.send(rows).status(204);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  getTeamWorkspaces,
  getUserWorkspaces,
  getWorkspaceUsers,
  getWorkspaceIdeas,
  createWorkspace,
  addUserToWorkspace,
  updateWorkspace,
  deleteWorkspace,
  removeWorkspaceUser,
};
