import express from "express";
import * as controller from "./admin.controller.js";
import { validate } from "../../utils/schema.validation.js";
import upload from "../../middleware/upload.middleware.js";
import { destinationSchema, userStatusSchema } from "./admin.schema.js";
import auth from "../../middleware/auth.middleware.js";

const router = express.Router();

// Add new destination
router.post(
  "/destination",
  auth,
  upload.destinationImgs.array("images", 5),
  validate(destinationSchema),
  controller.addDestination
);

// Get destinatinations
router.get("/destinations", controller.getAllDestinations);

// Delete a destination
router.delete("/destination", controller.deleteDestination);

// Get users
router.get("/users", controller.getUsers);

// Update user status
router.patch(
  "/user/status",
  validate(userStatusSchema),
  controller.updateUserStatus
);

export default router;
