const express = require("express");

const router = express.Router();

const {
  hashPassword,
  verifyPassword,
  verifyToken,
  randomPasswordGenerator,
  verifyCompanyAdminOrSalesForceAdminRole,
  testIfCompanyAdminOrSalesForceAdminRole,
} = require("./services/auth");

/* ---- USERS ROUTES ---- */

const userControllers = require("./controllers/userControllers");

router.post(
  "/companies/:company_id/user/login",
  userControllers.authenticationCheck,
  verifyPassword
);

// récupérer les users d'une entreprise
router.get(
  "/companies/:company_id/users",
  verifyToken,
  verifyCompanyAdminOrSalesForceAdminRole,
  userControllers.getUsers
);

// récupérer un user d'une société
router.get("/companies/:company_id/users/:user_id", userControllers.getUser);

// ajouter un utilisateur à une entreprise
router.post(
  "/companies/:company_id/users/:user_id",
  userControllers.insertUser
);

// mettre à jour un profil utilisateur
router.put(
  "/users/:user_id",
  verifyToken,
  hashPassword,
  userControllers.updateUserProfile
);

// effacer un profil utilisateur
router.delete(
  "/companies/:company_id/users/:user_id",
  verifyToken,
  verifyCompanyAdminOrSalesForceAdminRole,
  userControllers.deleteUser
);

const invitationMiddlewares = require("./middlewares/invitationMiddlewares");

// Invite a new user to a company
router.post(
  "/companies/:company_id/users",
  verifyToken,
  verifyCompanyAdminOrSalesForceAdminRole,
  invitationMiddlewares.invitationVerifyUserExists,
  invitationMiddlewares.invitationVerifyUserInCompany,
  randomPasswordGenerator,
  hashPassword,
  invitationMiddlewares.sendInvitationMail,
  invitationMiddlewares.invitationNewUser,
  userControllers.insertUser
);

const passwordResetMiddlewares = require("./middlewares/passwordResetMiddlewares");

// Send password reset mail
router.post(
  "/password-reset",
  passwordResetMiddlewares.passwordResetVerifyUserExists,
  randomPasswordGenerator,
  hashPassword,
  passwordResetMiddlewares.passwordResetUpdateUserProfile,
  passwordResetMiddlewares.sendResetPasswordMail
);

// Update user profile in company

router.put(
  "/companies/:company_id/users/:user_id",
  verifyToken,
  userControllers.updateUserProfileInCompany
);

/* ---- TEAMS ROUTES ---- */

const teamControllers = require("./controllers/teamControllers");

// afficher les équipes d'une entreprise
router.get(
  "/companies/:company_id/teams",
  verifyToken,
  teamControllers.getTeams
);

// afficher une équipe
router.get(
  "/companies/:company_id/teams/:team_id",
  verifyToken,
  teamControllers.getTeam
);

// afficher les membres d'une équipe
router.get("/teams/:team_id/users", teamControllers.getAllUsersFromTeam);

// afficher les équipes d'un utilisateur
router.get(
  "/companies/:company_id/users/:user_id/teams",
  teamControllers.getAllTeamsFromUser
);

// créer une équipe
router.post(
  "/companies/:company_id/users/:user_id/teams",
  teamControllers.addTeamOnCompany
);

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

// Get all ideas for a team (:user_id is used to get the user's liked ideas)
router.get(
  "/teams/:team_id/ideas/:user_id",
  verifyToken,
  teamControllers.getTeamIdeas
);

/* ---- WORKSPACES ROUTES ---- */

const workspaceControllers = require("./controllers/workspaceControllers");
const workspaceMiddlewares = require("./middlewares/workspaceMiddlewares");

// Get all workspaces of a team (and check if user is part of that team)
router.get(
  "/teams/:team_id/workspaces/:user_id",
  verifyToken,
  workspaceMiddlewares.workspaceVerifyUserInWorkspace,
  workspaceMiddlewares.workspaceVerifyRole,
  workspaceControllers.getTeamWorkspaces
);

// Get the team of a workspace
router.get(
  "/workspaces/:workspace_id",
  verifyToken,
  workspaceControllers.getTeamByWorkspace
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
  "/companies/:company_id/users/:user_id/workspaces",
  verifyToken,
  workspaceControllers.createWorkspace
);

// Add a user to a workspace
router.post(
  "/workspaces/:workspace_id/users/:user_id",
  verifyToken,
  testIfCompanyAdminOrSalesForceAdminRole,
  invitationMiddlewares.invitationVerifyUserInTeam,
  workspaceMiddlewares.workspaceVerifyUserInWorkspace,
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
  "/companies/:company_id/users/:user_id/ideas",
  verifyToken,
  ideaControllers.getAllIdeasByUser
);

// Get all ideas for a company
router.get(
  "/companies/:company_id/ideas/:user_id",
  verifyToken,
  ideaControllers.getAllIdeasByCompany
);
// Get all ideas for group idea
router.get(
  "/ideasgroup/:ideas_group_id/ideas",
  verifyToken,
  ideaControllers.getAllIdeasByIdeasGroup
);

// Create an idea
router.post(
  "/companies/:company_id/users/:user_id/ideas",
  verifyToken,
  ideaControllers.createIdea
);

// Update an idea
router.put(
  "/companies/:company_id/users/:user_id/ideas/:idea_id",
  verifyToken,
  ideaControllers.updateIdeaById
);
// Update coordoorates of an idea for a workspace
router.put(
  "/ideas/:idea_id",
  verifyToken,
  ideaControllers.updateCoordinatesIdeaWorkspace
);

router.put(
  "/companies/ideas/:idea_id",
  verifyToken,
  ideaControllers.updateIdeaById
);

// Delete an idea
router.delete("/ideas/:idea_id", verifyToken, ideaControllers.deleteIdea);

// Delete ideas's workspace
router.delete(
  "/workspaces/:workspace_id/ideas",
  verifyToken,
  ideaControllers.deleteIdeasWorkspace
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
router.delete(
  "/ideas/:idea_id/likes/users/:user_id",
  verifyToken,
  likeControllers.deleteLike
);

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

/* ---- CATEGORIES ROUTES ---- */
const categoryControllers = require("./controllers/categoryControllers");

router.get(
  "/companies/:company_id/categories",
  categoryControllers.getCategories
);
router.get(
  "/companies/:company_id/categories/:id",
  categoryControllers.readCategory
);
router.put(
  "/companies/:company_idcategories/:id",
  categoryControllers.editCategory
);
router.post(
  "/companies/:company_id/categories",
  categoryControllers.addCategory
);
router.delete(
  "/companies/:company_id/categories/:id",
  categoryControllers.destroyCategory
);

/* ---- CATEGORY HAS IDEA ---- */
const catHasIdeaControllers = require("./controllers/catHasIdeaControllers");

router.get("/cathasidea", catHasIdeaControllers.browsecatHasIdea);
router.post("/cathasidea", catHasIdeaControllers.addcatHasIdea);
router.delete(
  "/cathasidea/:idea_id",
  catHasIdeaControllers.deletecatHasIdeaByIdeaId
);

/* ---- COLORS ROUTES ---- */
const colorControllers = require("./controllers/colorControllers");

router.get("/colors", colorControllers.browseColor);
router.get("/colors/:id", colorControllers.readColor);
router.put("/colors/:id", colorControllers.editColor);
router.post("/colors", colorControllers.addColor);
router.delete("/colors/:id", colorControllers.destroyColor);

/* ---- COMPANIES ROUTES ---- */
const companyControllers = require("./controllers/companyControllers");

router.get("/companies", companyControllers.browseCompany);
router.get("/companies/:company_slug", companyControllers.getCompany);
router.put(
  "/companies/:id",
  verifyToken,
  verifyCompanyAdminOrSalesForceAdminRole,
  companyControllers.editCompany
);
router.post("/companies", companyControllers.addCompany);
router.delete("/companies/:id", companyControllers.destroyCompany);

module.exports = router;
