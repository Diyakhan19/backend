import service from "./transport.service.js";
import userService from "../user/user.service.js";
import { sendResponse } from "../../utils/response.js";

// Create a new transport
export const createTransport = async (req, res, next) => {
  try {
    const {
      transportId,
      title,
      description,
      make,
      city,
      model,
      type,
      pricing,
      phone,
      capacity,
      oldImages,
    } = req.body;

    let images = oldImages ? JSON.parse(oldImages) : [];
    if (req.files) {
      req.files.forEach((img) => {
        images.push(img.path);
      });
    }

    const id = transportId ? +transportId : -1;

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
      images: images,
      userId: req.user.userId,
    };

    const transport = await service.createTransport(id, data);

    return sendResponse(res, "Transport saved successfully", transport);
  } catch (err) {
    console.log("Login error:", err);
    next({ status: 500, msg: err.message });
  }
};

// Get all transports
export const getTransports = async (req, res, next) => {
  try {
    const { search, type, city, trasportIds, limit, sortBy } = req.body;

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

    let orderBy = {
      createdAt: "desc",
    };

    if (sortBy === "rating") {
      orderBy = {
        rating: "desc",
      };
    }

    const transports = await service.getTransports(
      searchSchema,
      type,
      city,
      trasportIds,
      orderBy,
      limit
    );

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

// Delete a transpoet
export const deleteTransport = async (req, res, next) => {
  try {
    const { transportId } = req.body;

    const transport = await service.deleteTransport(transportId);

    return sendResponse(res, "Transport deleted successfully", transport);
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

// Transport booking
export const bookTranport = async (req, res, next) => {
  try {
    const {
      transportId,
      name,
      nationality,
      phone,
      email,
      passangers,
      pricePlan,
    } = req.body;

    const userId = +req.user.userId;

    const data = {
      userId,
      transportId: +transportId,
      name,
      nationality,
      phone,
      email,
      passangers: +passangers,
      pricePlan,
    };

    const booking = await service.createBooking(data);

    await service.updateTransport(transportId, { status: "rented" });

    return sendResponse(res, "Transport rented successfully", booking);
  } catch (err) {
    console.log("Login error:", err);
    next({ status: 500, msg: err.message });
  }
};

// Update status
export const updateStatus = async (req, res, next) => {
  try {
    const { transportId, status } = req.body;

    const data = {
      status,
    };

    const transport = await service.updateTransport(transportId, data);

    return sendResponse(res, "Status updated successfully", transport);
  } catch (err) {
    console.log("Login error:", err);
    next({ status: 500, msg: err.message });
  }
};
