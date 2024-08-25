import express from "express";
import { getUser, login, signup } from "./auth.controller.js";
const router = express.Router();
import { validate } from "../../utils/schema.validation.js";
import { signupSchema, loginSchema } from "./auth.schema.js";
import upload from "../../middleware/upload.middleware.js";

// Signup route
router.post(
  "/signup",
  upload.profileImgs.single("image"),
  validate(signupSchema),
  signup
);

// Login route
router.post("/login", validate(loginSchema), login);

// Get user profie by Id
router.get("/user", getUser);

export default router;
