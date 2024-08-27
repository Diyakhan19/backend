import service from "./admin.service.js";
import { sendResponse } from "../../utils/response.js";

export const addDestination = async (req, res, next) => {
  try {
    const { title, location, district, description, mapUrl } = req.body;
    const images = req.files.map((file) => file.path);

    const newDestination = await service.createDestination({
      title,
      location,
      district,
      mapUrl,
      description,
      images,
      userId: req.user.userId,
    });

    return sendResponse(res, "Destination added successfully", newDestination);
  } catch (err) {
    console.log("error:", err);
    next({ status: 500, msg: err.message });
  }
};

export const getAllDestinations = async (req, res) => {
  try {
    const { search } = req.query;

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

    const destinations = await service.getDestinations(searchSchema);

    return sendResponse(res, "Get destinations successful", destinations);
  } catch (err) {
    console.log("error:", err);
    next({ status: 500, msg: err.message });
  }
};

export const deleteDestination = async (req, res) => {
  try {
    const { id } = req.params;
    await service.deleteDestination(id);
    return sendResponse(res, "Destination deleted", 200);
  } catch (err) {
    console.log("Login error:", err);
    next({ status: 500, msg: err.message });
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const { search } = req.query;

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

    const users = await service.getUsers(searchSchema);

    return sendResponse(res, "Get users successful", users);
  } catch (err) {
    console.log("error:", err);
    next({ status: 500, msg: err.message });
  }
};

export const updateUserStatus = async (req, res, next) => {
  try {
    const { userId, status } = req.body;

    const user = await service.updateUser(userId, { status });

    user.password = undefined;

    return sendResponse(res, "Status updated successfully", user);
  } catch (err) {
    console.log("error:", err);
    next({ status: 500, msg: err.message });
  }
};
