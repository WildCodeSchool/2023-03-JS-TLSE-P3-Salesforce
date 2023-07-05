const express = require("express");

const router = express.Router();

const itemControllers = require("./controllers/itemControllers");
const ideaControllers = require("./controllers/ideaControllers");
const likeControllers = require("./controllers/likeControllers");

router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);

router.get("/company/:id/users/:id/ideas", ideaControllers.getAllIdeasByUser);
router.get("/company/:id/ideas", ideaControllers.getAllIdeasByCompany);
router.post("/company/:id/users/:id/ideas", ideaControllers.createIdea);
router.put("/company/:id/users/:id/ideas/:id", ideaControllers.updateIdeaById);
router.delete("/company/:id/users/:id/ideas/:id", ideaControllers.deleteIdea);

router.get("/company/:id/users/:id/likes", likeControllers.getAllLikesByUser);
router.get("/company/:id/ideas/:id/likes", likeControllers.getAllLikesByIdea);
router.post("/company/:id/ideas/:id/likes", likeControllers.createLike);
router.delete("/company/:id/ideas/:id/likes/:id", likeControllers.deleteLike);

module.exports = router;
