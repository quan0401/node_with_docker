const express = require("express");

const postControllers = require("../controllers/postControllers");

const router = express.Router();

router
  .route("/")
  .get(postControllers.getAllPosts)
  .post(postControllers.createPost)
  .delete(postControllers.deleteAllPosts);

router
  .route("/:id")
  .get(postControllers.getPostById)
  .patch(postControllers.updatePost)
  .delete(postControllers.deletePost);

module.exports = router;
