// eslint import/no-unresolved
const express = require("express");

const router = express.Router();

const workspaceControllers = require("./controllers/workspaceControllers");
const workspaceMiddlewares = require("./middlewares/workspaceMiddlewares");
const categoryControllers = require("./controllers/categoryControllers");
const colorControllers = require("./controllers/colorControllers");
const companyControllers = require("./controllers/companyControllers");
const {
  hashPassword,
  verifyPassword,
  verifyToken,
} = require("./services/auth");

/* ---- USERS ROUTES ---- */

const userControllers = require("./controllers/userControllers");

router.post(
  "/companies/:company_id/user/login",
  userControllers.authenticationCheck,
  verifyPassword
);

router.post(
  "/companies/:company_id/users",
  hashPassword,
  userControllers.addUser
);

// récupérer les users d'une entreprise
router.get("/companies/:company_id/users", userControllers.getUsers);

// récupérer un user d'une société
router.get("/companies/:company_id/users/:user_id", userControllers.getUser);

// ajouter un utilisateur à une entreprise
router.post(
  "/companies/:company_id/users/:user_id",
  userControllers.insertUser
);

// mettre à jour un profil utilisateur
router.put(
  "/companies/:company_id/users/:user_id",
  userControllers.updateUserProfile
);

// effacer un profil utilisateur
router.delete(
  "/companies/:company_id/users/:user_id",
  userControllers.deleteUser
);

/* ---- TEAMS ROUTES ---- */

const teamControllers = require("./controllers/teamControllers");

// afficher les équipes d'une entreprise
router.get("/companies/:company_id/teams", teamControllers.getTeams);

// afficher une équipe
router.get("/companies/:company_id/teams/:team_id", teamControllers.getTeam);

// afficher les membres d'une équipe
router.get("/teams/:team_id/users", teamControllers.getAllUsersFromTeam);

// afficher les équipes d'un utilisateur
router.get("/users/:user_id/teams", teamControllers.getAllTeamsFromUser);

// créer une équipe
router.post("/companies/:company_id/teams", teamControllers.addTeamOnCompany);

// ajouter un utilisateur dans une équipe

router.post("/teams/:team_id/users", teamControllers.addUserOnTeam);

// modifier le profil d'une équipe
router.put("/teams/:team_id", teamControllers.updateTeamProfile);

// supprimer une équipe
router.delete(
  "/companies/:company_id/teams/:team_id",
  teamControllers.deleteTeamFromCompany
);
// supprimer un membre d'une équipe
router.delete(
  "/teams/:team_id/users/:user_id",
  teamControllers.deleteUserFromTeam
);

// WORKSPACES ROUTES

router.get("/categories", categoryControllers.browse);
router.get("/categories/:id", categoryControllers.read);
router.put("/categories/:id", categoryControllers.edit);
router.post("/categories", categoryControllers.add);
router.delete("/categories/:id", categoryControllers.destroy);

router.get("/colors", colorControllers.browse);
router.get("/colors/:id", colorControllers.read);
router.put("/colors/:id", colorControllers.edit);
router.post("/colors", colorControllers.add);
router.delete("/colors/:id", colorControllers.destroy);

router.get("/companies", companyControllers.browse);
router.get("/companies/:id", companyControllers.read);
router.put("/companies/:id", companyControllers.edit);
router.post("/companies", companyControllers.add);
router.delete("/companies/:id", companyControllers.destroy);

// WORKSPACE
// Get all workspaces for a team
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
