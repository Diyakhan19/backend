import prisma from "../../../config/db.js";

// Create a new transport
const createTransport = (data) => {
  return prisma.transport.create({
    data,
  });
};

// Update a transport
const updateTransport = (transportId, data) => {
  return prisma.transport.update({
    where: {
      transportId: +transportId,
    },
    data: data,
  });
};

// Get all tranposts
const getTransports = (searchSchema, type, city) => {
  return prisma.transport.findMany({
    where: {
      status: {
        not: "rented",
      },
      type: type !== "" ? type : undefined,
      city: city !== "" ? city : undefined,
      OR: searchSchema,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

//  Get single tranpost
const getTransport = (transportId) => {
  return prisma.transport.findUnique({
    where: {
      transportId: +transportId,
    },
    include: {
      user: {
        select: {
          userId: true,
          name: true,
          image: true,
          email: true,
        },
      },
    },
  });
};

// Create booking
const createBooking = (data) => {
  return prisma.transportBooking.create({
    data,
  });
};

const service = {
  createTransport,
  updateTransport,
  getTransports,
  getTransport,
  createBooking,
};

export default service;
