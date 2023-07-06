const express = require("express");

const router = express.Router();

const workspaceControllers = require("./controllers/workspaceControllers");
const itemControllers = require("./controllers/itemControllers");
const userControllers = require("./controllers/UserControllers");
const teamControllers = require("./controllers/TeamControllers");

router.get("/", (req, res) => {
  res.send("Bienvenue à toi sur le serveur d'Ideasforces");
});
// routes utilisateur

// récupérer les users d'une entreprise
router.get(`/companies/:company_id/users`, userControllers.getUsers);

// récupérer un user d'une société
router.get(`/companies/:company_id/users/:user_id`, userControllers.getUser);

// ajouter un utilisateur à une entreprise
router.post(
  `/companies/:company_id/users/:user_id`,
  userControllers.createUser
);

// mettre à jour un profil utilisateur
router.put(
  `/companies/:company_id/users/:user_id`,
  userControllers.updateProfileUser
);

// effacer un profil utilisateur
router.delete(
  `/companies/:company_id/users/:user_id`,
  userControllers.eraseUser
);

// routes Team

// afficher les équipes d'une entreprise
router.get(`/companies/:company_id/teams`, teamControllers.getTeams);

// afficher une équipe
router.get(`/companies/:company_id/teams/:team_id`, teamControllers.getTeam);

// afficher les membres d'une équipe
router.get(`/teams/:team_id/users`, teamControllers.getUsersTeam);

// afficher les équipes d'un utilisateur
router.get(`/users/:user_id/teams`, teamControllers.getTeamsUser);

// créer une équipe
router.post(`/companies/:company_id/teams`, teamControllers.createTeam);

// ajouter un utilisateur dans une équipe, route non fonctionnel ***********

router.post(`/teams/:team_id/users`, teamControllers.addUserTeam);

// modifier le profil d'une équipe
router.put(`/teams/:team_id`, teamControllers.updateProfileTeam);

// supprimer une équipe
router.delete(
  `/companies/:company_id/teams/:team_id`,
  teamControllers.eraseTeam
);
// supprimer un membre d'une équipe
router.delete(`/teams/:team_id/users/:user_id`, teamControllers.eraseUserTeam);

router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);

// WORKSPACE
// Get all workspaces for a team
router.get(
  "/teams/:team_id/workspaces",
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

// IDEAS
// Get all ideas for a user
router.get("/users/:user_id/ideas", ideaControllers.getAllIdeasByUser);
// Get all ideas for a company
router.get("/company/:company_id/ideas", ideaControllers.getAllIdeasByCompany);

// Create an idea
router.post(
  "/company/:company_id/users/:user_id/ideas",
  ideaControllers.createIdea
);
// Update an idea
router.put(
  "/company/:company_id/users/:user_id/ideas/:idea_id",
  ideaControllers.updateIdeaById
);
// Delete an idea
router.delete(
  "/company/:company_id/users/:user_id/ideas/:idea_id",
  ideaControllers.deleteIdea
);
// LIKES
// Get all likes by a user(count the number of likes)
router.get("/users/:user_id/likes", likeControllers.getAllLikesByUser);
// Get all likes by an idea(count the number of likes)
router.get("/ideas/:idea_id/likes", likeControllers.getAllLikesByIdea);
// Create a like to an idea
router.post("/ideas/:idea_id/likes/users/:user_id", likeControllers.createLike);
// Delete a like to an idea
router.delete("/likes/:liked_id", likeControllers.deleteLike);

// COMMENTS
// Get all comments from an idea
router.get("/ideas/:idea_id/comments", commentControllers.getAllCommentsByIdea);
// Get all comments by a user
router.get("/users/:user_id/comments", commentControllers.getAllCommentsByUser);
// Get all comments (global count)
router.get("/comments", commentControllers.getAllCountComment);
// Create a comment in an idea
router.post(
  "/ideas/:idea_id/comments/users/:user_id",
  commentControllers.createComment
);
// Delete a comment
router.delete("/comments/:comment_id", commentControllers.deleteComment);

module.exports = router;
