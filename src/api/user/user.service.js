import prisma from "../../../config/db.js";

// Updaet a user
const updateUser = (userId, data) => {
  return prisma.user.update({
    where: {
      userId: +userId,
    },
    data: data,
  });
};

// Get user by Id
const getUser = (userId) => {
  return prisma.user.findUnique({
    where: {
      userId: +userId,
    },
  });
};

// Get all users
const getUsers = () => {
  return prisma.user.findMany({
    select: {
      name: true,
      email: true,
      role: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const service = {
  updateUser,
  getUser,
  getUsers,
};

export default service;
