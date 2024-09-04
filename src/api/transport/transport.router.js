import express from "express";
import auth from "../../middleware/auth.middleware.js";
import * as controller from "./transport.controller.js";
import upload from "../../middleware/upload.middleware.js";
import { validate } from "../../utils/schema.validation.js";
import {
  bookingSchema,
  bookmarkSchema,
  transportSchema,
  transportStatus,
} from "./transport.schema.js";

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

// Book a transport
router.post("/booking", auth, validate(bookingSchema), controller.bookTranport);

// Update a transport status
router.patch(
  "/status",
  auth,
  validate(transportStatus),
  controller.updateStatus
);

export default router;
