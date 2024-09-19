import express from "express";
import { validate } from "../../utils/schema.validation.js";
import { campingSchema } from "./camping.schema.js";
import * as controller from "./camping.controller.js";
import upload from "../../middleware/upload.middleware.js";
import auth from "../../middleware/auth.middleware.js";

const router = express.Router();

// Create a new camping service
router.post(
  "/new",
  auth,
  upload.campingImgs.array("images", 5),
  validate(campingSchema),
  controller.creatCampingService
);

// Delete a camping service
router.delete("/delete", auth, controller.deleteCamping);

// Get all posts
router.get("/all", controller.getAllCampingServices);

// Get one post
router.get("/single", controller.getSingleService);

export default router;
