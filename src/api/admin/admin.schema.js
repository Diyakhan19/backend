import { body } from "express-validator";

export const destinationSchema = [
  body("title", "Title is required").notEmpty().isString(),
  body("location", "Location is required").notEmpty().isString(),
  body("district", "District is required").notEmpty().isString(),
  body("description", "Description is required").notEmpty().isString(),
];

export const userStatusSchema = [
  body("userId", "Valid user id is required").notEmpty().isNumeric(),
  body("status", "Status must be one of these: Rejected, Approved").isIn([
    "approved",
    "rejected",
  ]),
];
