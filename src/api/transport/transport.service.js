import prisma from "../../../config/db.js";

// Create a new transport
const createTransport = (data) => {
  return prisma.transport.create({
    data,
  });
};

// Get all tranposts
const getTransports = (searchSchema, type, city) => {
  return prisma.transport.findMany({
    where: {
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
  });
};

const service = {
  createTransport,
  getTransports,
  getTransport,
};

export default service;
