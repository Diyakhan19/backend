import service from "./transport.service.js";
import userService from "../user/user.service.js";
import { sendResponse } from "../../utils/response.js";

// Create a new transport
export const createTransport = async (req, res, next) => {
  try {
    const {
      title,
      description,
      make,
      city,
      model,
      type,
      pricing,
      phone,
      capacity,
    } = req.body;

    const data = {
      title,
      description,
      make,
      model,
      type,
      pricing: JSON.parse(pricing),
      phone,
      capacity,
      city,
      images: req.files ? req.files.map((img) => img.path) : null,
      userId: req.user.userId,
    };

    const transport = await service.createTransport(data);

    return sendResponse(res, "Transport created successfully", transport);
  } catch (err) {
    console.log("Login error:", err);
    next({ status: 500, msg: err.message });
  }
};

// Get all transports
export const getTransports = async (req, res, next) => {
  try {
    const { search, type, city } = req.body;

    const searchSchema = search
      ? [
          {
            title: {
              startsWith: search,
              mode: "insensitive",
            },
          },
          {
            title: {
              contains: search.trim().replace(/\s+/g, " "),
              mode: "insensitive",
            },
          },
          {
            title: {
              search: search.trim().replace(/\s+/g, "&"),
            },
          },
        ]
      : undefined;

    const transports = await service.getTransports(searchSchema, type, city);

    return sendResponse(res, "Get transports successful", transports);
  } catch (err) {
    console.log("Login error:", err);
    next({ status: 500, msg: err.message });
  }
};

// Get single transport
export const getSingleTransport = async (req, res, next) => {
  try {
    const { transportId } = req.query;

    const transport = await service.getTransport(transportId);

    return sendResponse(res, "Get transport successful", transport);
  } catch (err) {
    console.log("Login error:", err);
    next({ status: 500, msg: err.message });
  }
};

// Bookmark a transport
export const bookmarkTransport = async (req, res, next) => {
  try {
    const { transportId } = req.body;

    const userId = req.user.userId;

    const user = await userService.getUser(userId);

    const bookmarks = [...user.bookmarks];

    if (bookmarks.includes(transportId)) {
      const indx = bookmarks.indexOf(transportId);
      if (indx > -1) {
        bookmarks.splice(indx, 1);
      }
    } else {
      bookmarks.push(transportId);
    }

    const updatedUser = await userService.updateUser(userId, {
      bookmarks: bookmarks,
    });

    return sendResponse(res, "Bookmarks updated user", {
      bookmarks: updatedUser.bookmarks,
    });
  } catch (err) {
    console.log("Login error:", err);
    next({ status: 500, msg: err.message });
  }
};
