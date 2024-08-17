import express from "express";
import * as controller from "./admin.controller.js";
import { validate } from "../../utils/schema.validation.js";
import upload from "../../middleware/upload.middleware.js";
import { destinationSchema } from "./admin.schema.js";

const router = express.Router();

router.post(
  "/destination",
  upload.destinationImgs.array("images", 5),
  validate(destinationSchema),
  controller.addDestination
);
router.get("/destinations", controller.getAllDestinations);
router.delete("/destination", controller.deleteDestination);

export default router;
