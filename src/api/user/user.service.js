import prisma from "../../../config/db.js";

const updateUser = (userId, data) => {
  return prisma.user.update({
    where: {
      userId: +userId,
    },
    data: data,
  });
};

const getUsers = () => {
  return prisma.user.findMany({
    select: {
      name: true,
      email: true,
      role: true,
    },
  });
};

const service = {
  updateUser,
  getUsers,
};

export default service;
