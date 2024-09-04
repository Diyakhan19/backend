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

export const bookingSchema = [
  body("transportId", "Transport id is required").notEmpty().isNumeric(),
  body("name", "Room name is required").notEmpty().isString(),
  body("phone", "Phone is required").notEmpty().isString(),
  body("email", "Email is required").notEmpty().isString(),
  body("passangers", "Passengers is required").notEmpty().isNumeric(),
  body("pricePlan", "Price plane must be hour, day, or month").isIn([
    "hour",
    "day",
    "month",
  ]),
];

export const transportStatus = [
  body("transportId", "Valid Transport Id is required").notEmpty().isNumeric(),
  body("status", "Valid status is required").notEmpty().isString(),
];
