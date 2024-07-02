import express from "express";
import { signup } from "./auth.controller.js";
const router = express.Router();

// ROUTS

router.post("/signup", signup);

export default router;
