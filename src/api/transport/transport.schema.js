import { body } from "express-validator";

export const transportSchema = [
  body("title", "Title is required").notEmpty().isString(),
  body("description", "Description is required").notEmpty().isString(),
  body("make", "Make is required").notEmpty().isString(),
  body("model", "Model is required").notEmpty().isString(),
  body("type", "Type is required").notEmpty().isString(),
  body("pricing", "Pricing is required").notEmpty(),
  body("phone", "Phone is required").notEmpty().isString(),
  body("capacity", "Capacity is required").notEmpty().isString(),
];

export const bookmarkSchema = [
  body("transportId", "Valid Transport Id is required").notEmpty().isNumeric(),
];
