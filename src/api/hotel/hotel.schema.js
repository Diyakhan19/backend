import { body } from "express-validator";

export const hotelSchema = [
  body("name", "Name is required").notEmpty().isString(),
  body("description", "Description is required").notEmpty().isString(),
  body("address", "Address is required").notEmpty().isString(),
  body("city", "City is required").notEmpty().isString(),
  body("mapUrl", "Map URL is required").notEmpty().isString(),
  body("facilities", "Facilities is required").notEmpty(),
];
