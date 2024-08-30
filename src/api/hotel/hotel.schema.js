import { body } from "express-validator";

export const hotelSchema = [
  body("name", "Name is required").notEmpty().isString(),
  body("description", "Description is required").notEmpty().isString(),
  body("address", "Address is required").notEmpty().isString(),
  body("city", "City is required").notEmpty().isString(),
  body("mapUrl", "Map URL is required").notEmpty().isString(),
  body("facilities", "Facilities is required").notEmpty(),
];

export const roomSchema = [
  body("hotelId", "Hotel id is required").notEmpty().isNumeric(),
  body("name", "Room name is required").notEmpty().isString(),
  body("description", "Description is required").notEmpty().isString(),
  body("size", "Room size is required").notEmpty().isString(),
  body("bedType", "Bed type is required").notEmpty().isString(),
  body("capacity", "Capacity is required").notEmpty().isString(),
  body("pricePerNight", "Price per night is required").notEmpty().isString(),
  body("view", "View is required").notEmpty().isString(),
];

export const bookingSchema = [
  body("hotelId", "Hotel id is required").notEmpty().isNumeric(),
  body("roomId", "Room id is required").notEmpty().isNumeric(),
  body("name", "Room name is required").notEmpty().isString(),
  body("phone", "Phone is required").notEmpty().isString(),
  body("email", "Email is required").notEmpty().isString(),
  body("checkin", "Checkin is required").notEmpty().isString(),
  body("checkout", "Checkout is required").notEmpty().isString(),
  body("guests", "Guests is required").notEmpty().isString(),
];
