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
const workspaceVerifyRole = (req, res, next) => {
  const { isCompanyAdmin, isAdmin } = req.payload.role;

  if (isCompanyAdmin) {
    req.isCompanyAdmin = true;
  }
  if (isAdmin) {
    req.isSalesForceAdmin = true;
  }
  next();
};

const workspaceVerifyUserInWorkspace = (req, res, next) => {
  const { team_id, user_id } = req.params;
  models.workspace.checkIfUserIsInWorkspace(team_id, user_id).then(([rows]) => {
    const isUserInWorkspace = rows.length > 0;
    if (isUserInWorkspace) {
      req.isInWorkspace = true;
      next();
    } else {
      req.isInWorkspace = false;
      next();
    }
  });
};

module.exports = {
  workspaceVerifyUserInWorkspace,
  workspaceVerifySalesForceAdminRole,
  workspaceVerifyRole,
};
