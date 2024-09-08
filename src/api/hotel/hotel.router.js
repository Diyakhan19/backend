import express from "express";
import { validate } from "../../utils/schema.validation.js";
import { bookingSchema, hotelSchema, roomSchema } from "./hotel.schema.js";
import * as controller from "./hotel.controller.js";
import upload from "../../middleware/upload.middleware.js";
import auth from "../../middleware/auth.middleware.js";

const router = express.Router();

// Create new hotel
router.post(
  "/new",
  auth,
  upload.hotelImgs.array("images", 8),
  validate(hotelSchema),
  controller.createHotel
);

// Add room to hotel
router.post(
  "/room",
  auth,
  upload.roomImgs.array("images", 5),
  validate(roomSchema),
  controller.addRoom
);

// Book a room in hotel
router.post("/booking", auth, validate(bookingSchema), controller.bookRoom);

// Delete hotel
router.delete("/delete", auth, controller.deleteHotel);

// Get all hotels
router.post("/all", controller.getAllHotels);

// Get one hotel
router.get("/single", controller.getSingleHotel);

export default router;
