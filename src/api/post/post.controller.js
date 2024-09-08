import service from "./post.service.js";
import { sendResponse } from "../../utils/response.js";

// Create a new post
export const createPost = async (req, res, next) => {
  try {
    const {
      postId,
      title,
      description,
      address,
      city,
      price,
      category,
      features,
      oldImages,
    } = req.body;

    let images = oldImages ? JSON.parse(oldImages) : [];
    if (req.files) {
      req.files.forEach((img) => {
        images.push(img.path);
      });
    }

    const id = postId ? +postId : -1;

    const data = {
      title,
      description,
      address,
      city,
      price: +price,
      category,
      features: JSON.parse(features),
      images: images,
      userId: req.user.userId,
    };

    const post = await service.createPost(id, data);

    return sendResponse(res, "Post saved successfully", post);
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

// Get all posts
export const getAllPosts = async (req, res, next) => {
  try {
    const { search, city, category } = req.body;

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

    const posts = await service.getAllPosts(searchSchema, city, category);

    return sendResponse(res, "Get posts successful", posts);
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
