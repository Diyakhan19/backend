import prisma from "../../../config/db.js";

// Create a new hotel
const createHotel = (id, data) => {
  return prisma.hotel.upsert({
    where: {
      hotelId: id,
    },
    create: data,
    update: data,
  });
};

// Update a  hotel
const updateHotel = (id, data) => {
  return prisma.hotel.update({
    where: {
      hotelId: id,
    },
    data: data,
  });
};

// Delete a hotel
const deleteHotel = (hotelId) => {
  return prisma.hotel.delete({
    where: {
      hotelId: +hotelId,
    },
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

// Get hotel average rating
const getHotelRating = (hotelId) => {
  return prisma.review.aggregate({
    where: {
      hotelId: +hotelId,
    },
    _avg: {
      stars: true,
    },
  });
};

const service = {
  createHotel,
  updateHotel,
  deleteHotel,
  updateRoom,
  addRoom,
  createBooking,
  deletePost,
  getAllHotels,
  getSingleHotel,
  getHotelRating,
};

export default service;
