import express from "express";
import { login, signup } from "./auth.controller.js";
const router = express.Router();
import { validate } from "../../utils/shema.validation.js";
import { sigupSchema, loginSchema } from "./auth.schema.js";
import upload from "../../middleware/upload.middleware.js";

// Signup route
router.post(
  "/signup",
  upload.profileImg.single("image"),
  validate(sigupSchema),
  signup
);

// Login route
router.post("/login", validate(loginSchema), login);

export default router;
