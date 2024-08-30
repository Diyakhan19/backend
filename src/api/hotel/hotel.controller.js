import service from "./hotel.service.js";
import { sendResponse } from "../../utils/response.js";

// Create a new post
export const createHotel = async (req, res, next) => {
  try {
    const { name, description, address, city, mapUrl, facilities } = req.body;

    const data = {
      name,
      description,
      address,
      city,
      mapUrl,
      facilities: JSON.parse(facilities),
      images: req.files ? req.files.map((img) => img.path) : null,
      userId: req.user.userId,
    };

    const hotel = await service.createHotel(data);

    return sendResponse(res, "Hotel posted successfully", hotel);
  } catch (err) {
    console.log("Login error:", err);
    next({ status: 500, msg: err.message });
  }
};

// Add a room to hotel
export const addRoom = async (req, res, next) => {
  try {
    const {
      roomId,
      hotelId,
      name,
      description,
      size,
      bedType,
      capacity,
      pricePerNight,
      view,
      oldImages,
    } = req.body;

    let images = null;

    if (oldImages) {
      images = JSON.parse(oldImages);
    }

    if (req.files && req.files.length !== 0) {
      images = req.files.map((img) => img.path);
    }

    const data = {
      name,
      hotelId: +hotelId,
      description,
      size,
      bedType,
      capacity,
      pricePerNight: +pricePerNight,
      view,
      images: images,
    };

    const id = +roomId || -1;

    const room = await service.addRoom(id, data);

    return sendResponse(res, "Room added successfully", room);
  } catch (err) {
    console.log("Login error:", err);
    next({ status: 500, msg: err.message });
  }
};

// Book a room in a hotel
export const bookRoom = async (req, res, next) => {
  try {
    const {
      roomId,
      hotelId,
      name,
      nationality,
      phone,
      email,
      checkin,
      checkout,
      guests,
      specialRequest,
    } = req.body;

    const userId = req.user.userId;

    const data = {
      roomId,
      userId,
      name,
      nationality,
      phone,
      email,
      checkin,
      checkout,
      guests,
      specialRequest,
    };

    const booking = await service.createBooking(data);

    const updateRoomData = {
      isBooked: true,
      checkin,
      checkout,
    };

    await service.updateRoom(roomId, updateRoomData);

    return sendResponse(res, "Booking saved successfully", booking);
  } catch (err) {
    console.log("Login error:", err);
    next({ status: 500, msg: err.message });
  }
};

// Delet a post
export const deletePost = async (req, res, next) => {
  try {
    const { postId } = req.body;

    const post = await service.deletePost(postId);

    return sendResponse(res, "Post deleted successfully", post);
  } catch (err) {
    console.log("Login error:", err);
    next({ status: 500, msg: err.message });
  }
};

// Get all hotels
export const getAllHotels = async (req, res, next) => {
  try {
    const { search, city, facilities, limit, sortBy } = req.body;

    const searchSchema = search
      ? [
          {
            name: {
              startsWith: search,
              mode: "insensitive",
            },
          },
          {
            name: {
              contains: search.trim().replace(/\s+/g, " "),
              mode: "insensitive",
            },
          },
          {
            name: {
              search: search.trim().replace(/\s+/g, "&"),
            },
          },
        ]
      : undefined;

    const facilityFilter =
      Array.isArray(facilities) && facilities.length !== 0
        ? {
            hasEvery: facilities,
          }
        : undefined;

    let orderBy = {
      createdAt: "desc",
    };

    if (sortBy === "rating") {
      orderBy = {
        rating: "desc",
      };
    }

    const hotels = await service.getAllHotels(
      searchSchema,
      city,
      facilityFilter,
      limit,
      orderBy
    );

    return sendResponse(res, "Get hotels successful", hotels);
  } catch (err) {
    console.log("Login error:", err);
    next({ status: 500, msg: err.message });
  }
};

// Get all posts
export const getSingleHotel = async (req, res, next) => {
  try {
    const { hotelId } = req.query;

    const hotel = await service.getSingleHotel(hotelId);

    return sendResponse(res, "Get hotel successful", hotel);
  } catch (err) {
    console.log("Login error:", err);
    next({ status: 500, msg: err.message });
  }
};
