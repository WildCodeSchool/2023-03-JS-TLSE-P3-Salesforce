const express = require("express");

const router = express.Router();

const itemControllers = require("./controllers/itemControllers");
const ideaControllers = require("./controllers/ideaControllers");
const likeControllers = require("./controllers/likeControllers");
const commentControllers = require("./controllers/commentControllers");

router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);

router.get(
  "/company/:company_id/users/:user_id/ideas",
  ideaControllers.getAllIdeasByUser
);
router.get("/company/:company_id/ideas", ideaControllers.getAllIdeasByCompany);
router.post(
  "/company/:company_id/users/:user_id/ideas",
  ideaControllers.createIdea
);
router.put(
  "/company/:company_id/users/:user_id/ideas/:idea_id",
  ideaControllers.updateIdeaById
);
router.delete(
  "/company/:company_id/users/:user_id/ideas/:idea_id",
  ideaControllers.deleteIdea
);

router.get(
  "/company/:company_id/users/:user_id/likes",
  likeControllers.getAllLikesByUser
);
router.get(
  "/company/:company_id/ideas/:idea_id/likes",
  likeControllers.getAllLikesByIdea
);
router.post(
  "/company/:company_id/ideas/:idea_id/likes",
  likeControllers.createLike
);
router.delete(
  "/company/:company_id/ideas/:idea_id/likes/:liked_id",
  likeControllers.deleteLike
);

router.get("/ideas/:idea_id/comments", commentControllers.getAllCommentsByIdea);
router.get(
  "/company/:company_id/users/:user_id/comments/:comment_id",
  commentControllers.getAllCommentsByUser
);
router.get("/comments", commentControllers.getAllCountComment);
router.post(
  "/company/:company_id/users/:user_id/ideas/:ideas_id/comments",
  commentControllers.createComment
);
router.delete("/comments/:comment_id", commentControllers.deleteComment);

module.exports = router;
