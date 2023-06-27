const express = require("express");

const router = express.Router();

const itemControllers = require("./controllers/itemControllers");
const userControllers = require("./controllers/UserControllers");
const teamControllers = require("./controllers/TeamControllers");

router.get("/", (req, res) => {
  res.send("Bienvenue à toi sur le serveur d'Ideasforces");
});
// routes utilisateur

router.get("/:company_id/users", userControllers.getUsers);
router.get("/:company_id/:user_id", userControllers.getUser);
router.post("/:company_id/users", userControllers.createUser);
router.put("/:user_id", userControllers.updateProfileUser);
router.delete("/:user_id", userControllers.eraseUser);

// routes Team
router.get("/:company_id/teams", teamControllers.getTeams);
router.get("/:company_id/teams/:team_id", teamControllers.getTeam);
router.get("/:company_id/:team_id/members", teamControllers.getUsersTeam);
router.get("/:company_id/:user_id/teams", teamControllers.getTeamByUserId);
router.post("/:company_id/teams", teamControllers.createTeam);
router.post("/:company_id/:team_id/members:", teamControllers.addUserTeam);
router.put("/:company_id/teams/:team_id", teamControllers.updateProfileTeam);
router.delete("/:computer_id/teams/:team_id", teamControllers.eraseTeam);
router.delete(
  "/:computer_id/:team_id/members/:user_id",
  teamControllers.eraseUserTeam
);

router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);

module.exports = router;
