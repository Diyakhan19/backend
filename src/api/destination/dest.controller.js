import service from "./dest.service.js";
import userService from "../user/user.service.js";
import { sendResponse } from "../../utils/response.js";

// Add a destination to favitu
export const getSingleDestination = async (req, res, next) => {
  try {
    const { destinationId } = req.query;

    const dest = await service.getSingleDestination(destinationId);

    return sendResponse(res, "Get destination successfull", dest);
  } catch (err) {
    console.log("Login error:", err);
    next({ status: 500, msg: err.message });
  }
};

// Add a destination to favitu
export const addDestToFavorite = async (req, res, next) => {
  try {
    const { destinationId } = req.body;
    const userId = req.user.userId;

    const favorite = await service.getFavorite(userId, destinationId);

    if (favorite) {
      const removedFav = await service.removeFavorite(favorite.favId);
      return sendResponse(res, "Destination removed from favorites", {
        action: "removed",
        destinationId: removedFav.destinationId,
      });
    }

    const newFav = await service.addDestToFavorite(userId, destinationId);

    return sendResponse(res, "Destination added to favorites", {
      action: "added",
      destinationId: newFav.destinationId,
    });
  } catch (err) {
    console.log("Login error:", err);
    next({ status: 500, msg: err.message });
  }
};

// Add a destination to favitu
export const likeUnlikeDestination = async (req, res, next) => {
  try {
    const { destinationId } = req.body;
    const userId = req.user.userId;

    const user = await userService.getUser(userId);

    if (user.likes.includes(destinationId)) {
      const dest = await service.updateDestination(destinationId, {
        likes: { decrement: 1 },
      });
      const newLikes = user.likes.filter((id) => id !== destinationId);
      await userService.updateUser(userId, { likes: newLikes });
      return sendResponse(res, "Destination unliked", {
        action: "unliked",
        destinationId: dest.destinationId,
      });
    }

    const dest = await service.updateDestination(destinationId, {
      likes: { increment: 1 },
    });
    await userService.updateUser(userId, { likes: { push: destinationId } });

    return sendResponse(res, "Destination liked", {
      action: "liked",
      destinationId: dest.destinationId,
    });
  } catch (err) {
    console.log("Login error:", err);
    next({ status: 500, msg: err.message });
  }
};

// Add visited destination
export const addVisitedDestination = async (req, res, next) => {
  try {
    const { destinationId } = req.body;
    const userId = req.user.userId;

    const dest = await service.updateDestination(destinationId, {
      visits: { increment: 1 },
    });

    await userService.updateUser(userId, { visited: { push: destinationId } });

    return sendResponse(res, "Destination added to visited", {
      destinationId: dest.destinationId,
    });
  } catch (err) {
    console.log("Login error:", err);
    next({ status: 500, msg: err.message });
  }
};

// Add a review
export const addReview = async (req, res, next) => {
  try {
    const { destinationId, hotelId, stars, review } = req.body;
    const userId = req.user.userId;

    const data = {
      userId: +userId,
      stars: stars,
      text: review,
    };

    if (destinationId) {
      data.destinationId = +destinationId;
    }

    if (hotelId) {
      data.hotelId = +hotelId;
    }

    const newReview = await service.addReview(data);

    return sendResponse(res, "Review added successfully", newReview);
  } catch (err) {
    console.log("Login error:", err);
    next({ status: 500, msg: err.message });
  }
};
