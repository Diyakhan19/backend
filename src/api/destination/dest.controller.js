import service from "./dest.service.js";
import { sendResponse } from "../../utils/response.js";

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
