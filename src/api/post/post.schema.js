import { body } from "express-validator";

export const postSchema = [
  body("title", "Title is required").notEmpty().isString(),
  body("description", "Description is required").notEmpty().isString(),
  body("address", "Address is required").notEmpty().isString(),
  body("city", "City is required").notEmpty().isString(),
  body("price", "Price is required").notEmpty().isNumeric(),
  body("category", "Category is required").notEmpty().isString(),
  body("features", "Category is required").notEmpty(),
];
