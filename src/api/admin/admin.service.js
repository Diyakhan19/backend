import prisma from "../../../config/db.js";

 const createDestination = async (data) => {
  return prisma.destination.create({ data });
};

 const getDestinations = async () => {
  return prisma.destination.findMany();
};

 const deleteDestination = async (id) => {
  return prisma.destination.delete({ where: { id: Number(id) } });
};
 const service = {createDestination, getDestinations, deleteDestination};
 export default service;