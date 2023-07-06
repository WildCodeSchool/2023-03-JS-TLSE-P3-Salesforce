/* eslint-disable camelcase */
const models = require("../models");

const workspaceVerifySalesForceAdminRole = (req, res, next) => {
  const isAdmin = req.is_admin;
  switch (isAdmin) {
    case true:
      req.isSalesForceAdmin = true;
      next();
      break;
    default:
      req.isSalesForceAdmin = false;
      next();
      break;
  }
};

const workspaceVerifyUserInWorkspace = (req, res, next) => {
  const { team_id, user_id } = req.params;
  models.workspace.checkIfUserIsInWorkspace(team_id, user_id).then(([rows]) => {
    const rowsLength = rows.length > 0;
    switch (rowsLength) {
      case rowsLength > 0:
        req.isInWorkspace = true;
        next();
        break;

      default:
        req.isInWorkspace = false;
        next();
        break;
    }
  });
};

module.exports = {
  workspaceVerifyUserInWorkspace,
  workspaceVerifySalesForceAdminRole,
};
