import prisma from "../../../config/db.js";

// Get single destination
const getSingleDestination = (destinationId) => {
  return prisma.destination.findUnique({
    where: {
      destinationId: +destinationId,
    },
    include: {
      reviews: {
        include: {
          user: {
            select: {
              name: true,
              image: true,
            },
          },
        },
      },
    },
  });
};

// Update a destination
const updateDestination = (destinationId, data) => {
  return prisma.destination.update({
    where: {
      destinationId: +destinationId,
    },
    data: data,
  });
};

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

// Add a review
const addReview = (data) => {
  return prisma.review.create({
    data: data,
  });
};

const service = {
  getSingleDestination,
  updateDestination,
  getFavorite,
  removeFavorite,
  addDestToFavorite,
  addReview,
};

export default service;
