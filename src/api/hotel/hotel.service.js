import prisma from "../../../config/db.js";

// Create a new post
const createHotel = (data) => {
  return prisma.hotel.create({
    data,
  });
};

// Delete a post
const deletePost = (postId) => {
  return prisma.post.delete({
    where: {
      postId: +postId,
    },
  });
};

// Get all posts
const getAllHotels = (searchSchema, city, facilityFilter) => {
  return prisma.hotel.findMany({
    where: {
      city: city !== "" ? city : undefined,
      OR: searchSchema,
      facilities: facilityFilter,
    },
    include: {
      _count: {
        select: {
          reviews: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

// Get a single post
const getSinglePost = (postId) => {
  return prisma.post.findUnique({
    where: {
      postId: +postId,
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
      _count: {
        select: {
          favorites: true,
        },
      },
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
  createHotel,
  deletePost,
  getAllHotels,
  getSinglePost,
  getFavorite,
  removeFavorite,
  addPostToFavorite,
};

export default service;
