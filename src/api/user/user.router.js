import express from "express";
import { getUsers, updateUser } from "./user.controller.js";
import auth from "../../middleware/auth.middleware.js";

const router = express.Router();

// Private route
router.patch("/info", auth, updateUser);

// Public
router.get("/all", getUsers);

export default router;
