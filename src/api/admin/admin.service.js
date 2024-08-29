import prisma from "../../../config/db.js";

const createDestination = (data) => {
  return prisma.destination.create({ data });
};

const getDestinations = (searchSchema, orderBy) => {
  return prisma.destination.findMany({
    where: {
      OR: searchSchema,
    },
    include: {
      _count: {
        select: {
          favorites: true,
        },
      },
    },
    orderBy: orderBy,
    take: orderBy === "Top 5" ? 5 : undefined,
  });
};

const deleteDestination = (id) => {
  return prisma.destination.delete({ where: { id: Number(id) } });
};

const getUsers = (searchSchema) => {
  return prisma.user.findMany({
    where: {
      OR: searchSchema,
    },
    select: {
      userId: true,
      name: true,
      email: true,
      roles: true,
      image: true,
      status: true,
      _count: {
        select: {
          posts: true,
          hotels: true,
          transports: true,
        },
      },
    },
  });
};

const updateUser = (userId, data) => {
  return prisma.user.update({
    where: {
      userId: +userId,
    },
    data: data,
  });
};

const service = {
  createDestination,
  getDestinations,
  deleteDestination,
  getUsers,
  updateUser,
};

export default service;
