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
    const { search, city, facilities } = req.body;

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

    const hotels = await service.getAllHotels(
      searchSchema,
      city,
      facilityFilter
    );

    return sendResponse(res, "Get hotels successful", hotels);
  } catch (err) {
    console.log("Login error:", err);
    next({ status: 500, msg: err.message });
  }
};

// Get all posts
export const getSinglePost = async (req, res, next) => {
  try {
    const { postId } = req.query;

    const post = await service.getSinglePost(postId);

    return sendResponse(res, "Get post successful", post);
  } catch (err) {
    console.log("Login error:", err);
    next({ status: 500, msg: err.message });
  }
};

// Add a post to favitu
export const addPostToFavorite = async (req, res, next) => {
  try {
    const { postId } = req.body;
    const userId = req.user.userId;

    const favorite = await service.getFavorite(userId, postId);

    if (favorite) {
      const removedFav = await service.removeFavorite(favorite.favId);
      return sendResponse(res, "Post removed from favorites", {
        action: "removed",
        postId: removedFav.postId,
      });
    }

    const newFav = await service.addPostToFavorite(userId, postId);

    return sendResponse(res, "Post added to favorites", {
      action: "added",
      postId: newFav.postId,
    });
  } catch (err) {
    console.log("Login error:", err);
    next({ status: 500, msg: err.message });
  }
};
