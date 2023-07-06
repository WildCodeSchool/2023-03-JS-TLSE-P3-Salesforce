const express = require("express");

const router = express.Router();

const {
  hashPassword,
  verifyPassword,
  verifyToken,
} = require("./services/auth");

/* ---- USERS ROUTES ---- */

const user = require("./controllers/userControllers");

router.post(
  "/companies/:company_id/user/login",
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
  verifyToken,
  workspaceMiddlewares.workspaceVerifySalesForceAdminRole,
  workspaceControllers.getTeamWorkspaces
);

// Get all workspaces for a user
router.get(
  "/companies/:company_id/users/:user_id/workspaces",
  verifyToken,
  workspaceControllers.getUserWorkspaces
);

// Get all users for a workspace
router.get(
  "/workspaces/:workspace_id/users",
  verifyToken,
  workspaceControllers.getWorkspaceUsers
);

// Get all ideas for a workspace (:user_id is used to get the user's liked ideas)
router.get(
  "/workspaces/:workspace_id/ideas/:user_id",
  verifyToken,
  workspaceControllers.getWorkspaceIdeas
);

// Create a new workspace and add the creator in the workspace_has_user table
router.post(
  "/companies/:company_id/workspaces",
  verifyToken,
  workspaceControllers.createWorkspace
);

// Add a user to a workspace
router.post(
  "/workspaces/:workspace_id/users/:user_id",
  verifyToken,
  workspaceControllers.addUserToWorkspace
);

// Update a workspace
router.put(
  "/workspaces/:workspace_id",
  verifyToken,
  workspaceControllers.updateWorkspace
);

// Delete a workspace
router.delete(
  "/workspaces/:workspace_id",
  verifyToken,
  workspaceControllers.deleteWorkspace
);

// Delete a user from a workspace
router.delete(
  "/workspaces/:workspace_id/users/:user_id",
  verifyToken,
  workspaceControllers.removeWorkspaceUser
);

/* ---- IDEAS ROUTES ---- */

const ideaControllers = require("./controllers/ideaControllers");

// Get all ideas for a user
router.get(
  "/users/:user_id/ideas",
  verifyToken,
  ideaControllers.getAllIdeasByUser
);

// Get all ideas for a company
router.get(
  "/company/:company_id/ideas",
  verifyToken,
  ideaControllers.getAllIdeasByCompany
);
router.get(
  "/ideasgroup/:ideas_group_id/ideas",
  verifyToken,
  ideaControllers.getAllIdeasByIdeasGroup
);

// Create an idea
router.post(
  "/company/:company_id/users/:user_id/ideas",
  verifyToken,
  ideaControllers.createIdea
);

// Update an idea
router.put(
  "/company/:company_id/users/:user_id/ideas/:idea_id",
  verifyToken,
  ideaControllers.updateIdeaById
);

// Delete an idea
router.delete(
  "/company/:company_id/users/:user_id/ideas/:idea_id",
  verifyToken,
  ideaControllers.deleteIdea
);

/* ---- LIKES ROUTES ---- */

const likeControllers = require("./controllers/likeControllers");

// Get all likes by a user(count the number of likes)
router.get(
  "/users/:user_id/likes",
  verifyToken,
  likeControllers.getAllLikesByUser
);

// Get all likes by an idea(count the number of likes)
router.get(
  "/ideas/:idea_id/likes",
  verifyToken,
  likeControllers.getAllLikesByIdea
);

// Create a like to an idea
router.post(
  "/ideas/:idea_id/likes/users/:user_id",
  verifyToken,
  likeControllers.createLike
);

// Delete a like to an idea
router.delete("/likes/:liked_id", verifyToken, likeControllers.deleteLike);

/* ---- COMMENTS ROUTES ---- */

const commentControllers = require("./controllers/commentControllers");

// Get all comments from an idea
router.get(
  "/ideas/:idea_id/comments",
  verifyToken,
  commentControllers.getAllCommentsByIdea
);

// Get all comments by a user
router.get(
  "/users/:user_id/comments",
  verifyToken,
  commentControllers.getAllCommentsByUser
);

// Get all comments (global count)
router.get("/comments", verifyToken, commentControllers.getAllCountComment);

// Create a comment in an idea
router.post(
  "/ideas/:idea_id/comments/users/:user_id",
  verifyToken,
  commentControllers.createComment
);

// Delete a comment
router.delete(
  "/comments/:comment_id",
  verifyToken,
  commentControllers.deleteComment
);

// IDEAS_GROUP
const ideasgroupControllers = require("./controllers/ideasgroupControllers");

// Create un new group of ideas in a workspace
router.post(
  "/workspaces/:workspace_id/ideasgroup",
  ideasgroupControllers.createIdeasGroup
);
// Get all groups of ideas in a workspace
router.get(
  "/workspaces/:workspace_id/ideasgroup",
  ideasgroupControllers.getAllIdeasGroupByWorkspace
);
// Update a group of ideas
router.put(
  "/ideasgroup/:ideas_group_id",
  ideasgroupControllers.updateIdeasGroup
);
// Delete a group of ideas
router.delete(
  "/ideasgroup/:ideas_group_id",
  ideasgroupControllers.deleteIdeasGroup
);
module.exports = router;
