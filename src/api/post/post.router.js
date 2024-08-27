import express from "express";
import { validate } from "../../utils/schema.validation.js";
import { postSchema } from "./post.schema.js";
import * as controller from "./post.controller.js";
import upload from "../../middleware/upload.middleware.js";
import auth from "../../middleware/auth.middleware.js";

const router = express.Router();

// Create new post
router.post(
  "/new",
  auth,
  upload.postImgs.array("images", 5),
  validate(postSchema),
  controller.createPost
);

// Delete a post
router.delete("/delete", auth, controller.deletePost);

// Get all posts
router.post("/all", controller.getAllPosts);

// Get one post
router.get("/single", controller.getSinglePost);

// Add a post to favorits
router.post("/favorite", auth, controller.addPostToFavorite);

export default router;
