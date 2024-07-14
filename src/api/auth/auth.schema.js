import { body } from "express-validator";

export const sigupSchema = [
  body("email", "Email is required").notEmpty().isString().isEmail(),
  body("name", "Name is required").notEmpty().isString(),
  body("password", "Strong password is required").isStrongPassword({
    minLength: 6,
  }),
  body("role", "User must be one of these: User, admin, seller").isIn([
    "user",
    "admin",
    "seller",
  ]),
];

export const loginSchema = [
  body("email", "Email is required").notEmpty().isString().isEmail(),
  body("password", "Strong password is required").isStrongPassword({
    minLength: 6,
  }),
];
