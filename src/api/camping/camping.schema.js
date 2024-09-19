import { body } from "express-validator";

export const campingSchema = [
  body("name", "Service name is required").notEmpty().isString(),
  body("description", "Description is required").notEmpty().isString(),
  body("price", "Price is required").notEmpty().isString(),
  body("city", "City is required").notEmpty().isString(),
  body("phone", "Price is required").notEmpty().isNumeric(),
  body("destinationId", "Destination id is required").notEmpty().isString(),
  body("facilities", "Facilities is required").notEmpty(),
  body("duration", "Duration is required").notEmpty(),
  body("type", "Type is required").notEmpty(),
];
