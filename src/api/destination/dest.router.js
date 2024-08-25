import express from "express";
import * as controller from "./dest.controller.js";

const router = express.Router();

// Add a destination to favorits
router.post("/favorite", controller.addDestToFavorite);

export default router;
