import prisma from "../../../config/db.js";

// Get favorite
const getFavorite = (userId, destinationId) => {
  return prisma.favorite.findFirst({
    where: {
      userId: +userId,
      destinationId: +destinationId,
    },
  });
};

// Get favorite
const removeFavorite = (favId) => {
  return prisma.favorite.delete({
    where: {
      favId: +favId,
    },
  });
};

// Add post to favorites
const addDestToFavorite = (userId, destinationId) => {
  return prisma.favorite.create({
    data: {
      userId: +userId,
      destinationId: +destinationId,
    },
  });
};

const service = {
  getFavorite,
  removeFavorite,
  addDestToFavorite,
};

export default service;
