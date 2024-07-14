import prisma from "../../../config/db.js";

// Get user by email
const getUserByEmail = (email) => {
  return prisma.user.findFirst({
    where: {
      email: email.trim().toLowerCase(),
    },
  });
};

// Create a new user
const createUser = (data) => {
  return prisma.user.create({
    data: data,
  });
};

const service = {
  getUserByEmail,
  createUser,
};

export default service;
