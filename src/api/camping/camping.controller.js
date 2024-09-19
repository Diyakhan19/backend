import service from "./camping.service.js";
import { sendResponse } from "../../utils/response.js";

// Create a new camping service
export const creatCampingService = async (req, res, next) => {
  try {
    const {
      campingId,
      name,
      description,
      duration,
      price,
      type,
      city,
      phone,
      destinationId,
      facilities,
      oldImages,
    } = req.body;

    let images = oldImages ? JSON.parse(oldImages) : [];
    if (req.files) {
      req.files.forEach((img) => {
        images.push(img.path);
      });
    }

    const id = campingId ? +campingId : -1;

    const data = {
      name,
      description,
      duration,
      price: +price,
      type,
      city,
      phone,
      destinationId: +destinationId,
      facilities: JSON.parse(facilities),
      images: images,
      userId: req.user.userId,
    };

    const post = await service.createCampingService(id, data);

    return sendResponse(res, "Camping service saved successfully", post);
  } catch (err) {
    console.log("Login error:", err);
    next({ status: 500, msg: err.message });
  }
};

// Delete a camping service
export const deleteCamping = async (req, res, next) => {
  try {
    const { campingId } = req.body;

    const camping = await service.deleteCamping(campingId);

    return sendResponse(res, "Camping deleted successfully", camping);
  } catch (err) {
    console.log("Login error:", err);
    next({ status: 500, msg: err.message });
  }
};

// Get all camping services
export const getAllCampingServices = async (req, res, next) => {
  try {
    const { search, city, type } = req.query;

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

    const campings = await service.getAllCampingServices(
      searchSchema,
      city,
      type
    );

    return sendResponse(res, "Get camping services successful", campings);
  } catch (err) {
    console.log("Login error:", err);
    next({ status: 500, msg: err.message });
  }
};

// Get single camping service
export const getSingleService = async (req, res, next) => {
  try {
    const { campingId } = req.query;

    const camping = await service.getSingleService(campingId);

    return sendResponse(res, "Get camping successful", camping);
  } catch (err) {
    console.log("Login error:", err);
    next({ status: 500, msg: err.message });
  }
};
