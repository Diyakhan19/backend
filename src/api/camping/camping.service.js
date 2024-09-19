import prisma from "../../../config/db.js";

// Create a new camping service
const createCampingService = (id, data) => {
  return prisma.camping.upsert({
    where: {
      campingId: id,
    },
    create: data,
    update: data,
  });
};

// Delete a camping
const deleteCamping = (campingId) => {
  return prisma.camping.delete({
    where: {
      campingId: +campingId,
    },
  });
};

// Get all camping services
const getAllCampingServices = (searchSchema, city, type) => {
  return prisma.camping.findMany({
    where: {
      city: city !== "" ? city : undefined,
      type: type !== "" ? type : undefined,
      OR: searchSchema,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      destination: {
        select: {
          destinationId: true,
          title: true,
          images: true,
        },
      },
    },
  });
};

// Get a single camping service
const getSingleService = (campingId) => {
  return prisma.camping.findUnique({
    where: {
      campingId: +campingId,
    },
    include: {
      user: {
        select: {
          userId: true,
          name: true,
          email: true,
          image: true,
        },
      },
      destination: true,
    },
  });
};

// Get favorite
const getFavorite = (userId, postId) => {
  return prisma.favorite.findFirst({
    where: {
      userId: +userId,
      postId: +postId,
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
const addPostToFavorite = (userId, postId) => {
  return prisma.favorite.create({
    data: {
      userId: +userId,
      postId: +postId,
    },
  });
};

const service = {
  createCampingService,
  deleteCamping,
  getAllCampingServices,
  getSingleService,
  getFavorite,
  removeFavorite,
  addPostToFavorite,
};

export default service;
