import prisma from "../../../config/db.js";

// Get user by email
const getUserByEmail = (email) => {
  return prisma.user.findFirst({
    where: {
      email: email.trim().toLowerCase(),
    },
    include: {
      favorites: {
        select: {
          postId: true,
          destinationId: true,
        },
      },
    },
  });
};

// Create a new user
const createUser = (data) => {
  return prisma.user.create({
    data: data,
  });
};

// Get user by id
const getUserById = (userId) => {
  return prisma.user.findUnique({
    where: {
      userId: +userId,
    },
    include: {
      posts: true,
      transports: true,
      bookings: {
        include: {
          room: {
            select: {
              name: true,
              hotel: {
                select: {
                  hotelId: true,
                  name: true,
                  images: true,
                },
              },
            },
          },
        },
      },
      rented: {
        include: {
          transport: {
            select: {
              title: true,
              type: true,
              images: true,
            },
          },
        },
      },
      favorites: {
        include: {
          post: true,
          destination: {
            include: {
              _count: {
                select: {
                  favorites: true,
                },
              },
            },
          },
        },
      },
      hotels: {
        include: {
          _count: {
            select: {
              reviews: true,
            },
          },
        },
      },
    },
  });
};

const service = {
  getUserByEmail,
  createUser,
  getUserById,
};

export default service;
