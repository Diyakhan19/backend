import express from "express";
import auth from "../../middleware/auth.middleware.js";
import * as controller from "./transport.controller.js";
import upload from "../../middleware/upload.middleware.js";
import { validate } from "../../utils/schema.validation.js";
import { bookmarkSchema, transportSchema } from "./transport.schema.js";

const router = express.Router();

// Add a new transport
router.post(
  "/new",
  auth,
  upload.transportImgs.array("images", 5),
  validate(transportSchema),
  controller.createTransport
);

// Get all transports
router.post("/all", controller.getTransports);

// Get a single transport
router.get("/single", controller.getSingleTransport);

// Bookmark a transport
router.post(
  "/bookmark",
  auth,
  validate(bookmarkSchema),
  controller.bookmarkTransport
);

export default router;
