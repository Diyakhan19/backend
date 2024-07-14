import express from "express";
import { login, signup } from "./auth.controller.js";
const router = express.Router();
import { validate } from "../../utils/shema.validation.js";
import { sigupSchema, loginSchema } from "./auth.schema.js";

// Signup route
router.post("/signup", validate(sigupSchema), signup);

// Login route
router.post("/login", validate(loginSchema), login);

export default router;
