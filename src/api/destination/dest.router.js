import express from "express";
import * as controller from "./dest.controller.js";
import auth from "../../middleware/auth.middleware.js";

const router = express.Router();

// Get a destination by Id
router.get("/single", controller.getSingleDestination);

// Add a destination to favorits
router.post("/favorite", auth, controller.addDestToFavorite);

// Like unlike destination
router.post("/like", auth, controller.likeUnlikeDestination);

// Destination visited
router.post("/visited", auth, controller.addVisitedDestination);

// Destination visited
router.post("/review", auth, controller.addReview);

export default router;
