import prisma from "../../../config/db.js";

// Create a new hotel
const createHotel = (data) => {
  return prisma.hotel.create({
    data,
  });
};

// Create a room
const addRoom = (roomId, data) => {
  return prisma.room.upsert({
    where: {
      roomId: +roomId,
    },
    create: data,
    update: data,
  });
};

// Update a hotel
const updateRoom = (roomId, data) => {
  return prisma.room.update({
    where: {
      roomId: +roomId,
    },
    data: data,
  });
};

// Create a booking
const createBooking = (data) => {
  return prisma.booking.create({
    data: data,
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
const getAllHotels = (searchSchema, city, facilityFilter, limit, orderBy) => {
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
    orderBy: orderBy,
    take: limit ? +limit : undefined,
  });
};

// Get a single post
const getSingleHotel = (hotelId) => {
  return prisma.hotel.findUnique({
    where: {
      hotelId: +hotelId,
    },
    include: {
      rooms: {
        include: {
          bookings: {
            select: {
              userId: true,
            },
          },
        },
      },
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
      _count: {
        select: {
          reviews: true,
        },
      },
    },
  });
};

const service = {
  createHotel,
  updateRoom,
  addRoom,
  createBooking,
  deletePost,
  getAllHotels,
  getSingleHotel,
};

export default service;
