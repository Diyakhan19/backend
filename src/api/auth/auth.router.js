import express from "express";
import { login, signup } from "./auth.controller.js";
const router = express.Router();
import { validate } from "../../utils/schema.validation.js";
import { signupSchema, loginSchema } from "./auth.schema.js";


// Signup route
router.post(
  "/signup",

  validate(signupSchema),
  signup
);

// Login route
router.post("/login", validate(loginSchema), login);

export default router;
