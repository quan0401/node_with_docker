const express = require("express");

const postControllers = require("../controllers/postControllers");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router
  .route("/")
  .get(protect, postControllers.getAllPosts)
  .post(protect, postControllers.createPost)
  .delete(protect, postControllers.deleteAllPosts);

router
  .route("/:id")
  .get(protect, postControllers.getPostById)
  .patch(protect, postControllers.updatePost)
  .delete(protect, postControllers.deletePost);

module.exports = router;
