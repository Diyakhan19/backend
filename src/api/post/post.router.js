import express from "express";
import { validate } from "../../utils/schema.validation.js";
import { postSchema } from "./post.schema.js";
import * as controller from "./post.controller.js";
import upload from "../../middleware/upload.middleware.js";

const router = express.Router();

// Create new post
router.post(
  "/new",
  upload.postImgs.array("images", 5),
  validate(postSchema),
  controller.createPost
);

// Delete a post
router.delete("/delete", controller.deletePost);

// Get all posts
router.post("/all", controller.getAllPosts);

// Get one post
router.get("/single", controller.getSinglePost);

// Add a post to favorits
router.post("/favorite", controller.addPostToFavorite);

export default router;
