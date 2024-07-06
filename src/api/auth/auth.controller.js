import prisma from "../../../config/db.js";

export const signup = async (req, res, next) => {
  try {
    const { name, email, role, password } = req.body;

    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: password,
      },
    });

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server error",
    });
  }
};
