import prisma from "../../config/db.js";
import { encryptPassword } from "../api/auth/auth.utils.js";

export const addAdmin = async () => {
  try {
    const adminExists = await prisma.user.findFirst({
      where: {
        email: "admin@ek.com",
      },
    });

    if (adminExists) {
      return console.log("----> Admin already exists");
    }

    const passHash = await encryptPassword("Admin@123");

    const admin = {
      name: "Admin",
      email: "admin@ek.com",
      password: passHash,
      roles: ["admin"],
    };

    await prisma.user.create({
      data: admin,
    });

    console.log("----> Admin added successfully.");
  } catch (err) {
    console.log(err);
  }
};
