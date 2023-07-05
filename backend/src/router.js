const express = require("express");

const router = express.Router();

const itemControllers = require("./controllers/itemControllers");
const userControllers = require("./controllers/UserControllers");
const teamControllers = require("./controllers/TeamControllers");

router.get("/", (req, res) => {
  res.send("Bienvenue à toi sur le serveur d'Ideasforces");
});
// routes utilisateur

router.get(`/companies/:company_id/users`, userControllers.getUsers);
router.get(`/companies/:company_id/users/:user_id`, userControllers.getUser);
router.post(`/companies/:company_id/users`, userControllers.createUser);
router.put(
  `/companies/:company_id/users/:user_id`,
  userControllers.updateProfileUser
);
router.delete(
  `/companies/:company_id/users/:user_id`,
  userControllers.eraseUser
);

// routes Team
router.get(`/companies/:company_id/teams`, teamControllers.getTeams);
router.get(`/companies/:company_id/teams/:team_id`, teamControllers.getTeam);
router.get(
  `/companies/:company_id/teams/:team_id/users`,
  teamControllers.getUsersTeam
);
router.get(
  `/companies/:company_id/users/:user_id/teams`,
  teamControllers.getTeamsUser
);
router.post(`/companies/:company_id/teams`, teamControllers.createTeam);
router.post(
  `/companies/:company_id/teams/:team_id/users`,
  teamControllers.addUserTeam
);
router.put(`/teams/:team_id`, teamControllers.updateProfileTeam);
router.delete(`/teams/:team_id`, teamControllers.eraseTeam);
router.delete(`teams/:team_id/users/:user_id`, teamControllers.eraseUserTeam);

router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);

module.exports = router;
