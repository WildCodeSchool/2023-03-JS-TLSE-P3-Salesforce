const express = require("express");

const router = express.Router();

const {
  hashPassword,
  verifyPassword,
  verifyToken,
  // verifyCompanyAdminRole,
  // verifySalesForceAdminRole,
  verifyCompanyAdminOrSalesForceAdminRole,
  // checkId,
} = require("./services/auth");

/* ---- USERS ROUTES ---- */

const user = require("./controllers/userControllers");

router.post(
  "/user/login",
  verifyToken,
  verifyCompanyAdminOrSalesForceAdminRole,
  user.authenticationCheck,
  verifyPassword
);

router.get("/users", verifyToken, user.browse);
router.get("/users/:user_id", verifyToken, user.read);

router.post("/companies/:company_id/users", hashPassword, user.addUser);

/* ---- WORKSPACES ROUTES ---- */

const workspaceControllers = require("./controllers/workspaceControllers");
const workspaceMiddlewares = require("./middlewares/workspaceMiddlewares");

// Get all workspaces of a team (and check if user is part of that team)
router.get(
  "/teams/:team_id/workspaces/:user_id",
  workspaceMiddlewares.workspaceVerifySalesForceAdminRole,
  workspaceControllers.getTeamWorkspaces
);

// Get all workspaces for a user
router.get(
  "/companies/:company_id/users/:user_id/workspaces",
  workspaceControllers.getUserWorkspaces
);

// Get all users for a workspace
router.get(
  "/workspaces/:workspace_id/users",
  workspaceControllers.getWorkspaceUsers
);

// Get all ideas for a workspace (:user_id is used to get the user's liked ideas)
router.get(
  "/workspaces/:workspace_id/ideas/:user_id",
  workspaceControllers.getWorkspaceIdeas
);

// Create a new workspace and add the creator in the workspace_has_user table
router.post(
  "/companies/:company_id/workspaces",
  workspaceControllers.createWorkspace
);

// Add a user to a workspace
router.post(
  "/workspaces/:workspace_id/users/:user_id",
  workspaceControllers.addUserToWorkspace
);

// Update a workspace
router.put("/workspaces/:workspace_id", workspaceControllers.updateWorkspace);

// Delete a workspace
router.delete(
  "/workspaces/:workspace_id",
  workspaceControllers.deleteWorkspace
);

// Delete a user from a workspace
router.delete(
  "/workspaces/:workspace_id/users/:user_id",
  workspaceControllers.removeWorkspaceUser
);

module.exports = router;
