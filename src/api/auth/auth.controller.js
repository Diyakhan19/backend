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

// Create
prisma.hotel.create({
  data: {
    title: "Hotel",
  },
});

// Find
prisma.user.findUnique({
  where: {
    userId: 5,
  },
});

prisma.user.findFirst({
  where: {
    name: "Fayiz",
  },
  include: {
    posts: {
      select: {
        title: true,
      },
      take: 10,
    },
  },
});

prisma.user.findMany({
  where: {
    name: "Fayiz",
  },
});

prisma.user.delete({
  where: {
    email: "fayiz@gmail.com",
  },
});

prisma.user.deleteMany({
  where: {
    name: "Fayiz",
  },
});

prisma.user.update({
  where: {
    userId: 5,
  },
  data: {
    name: "Fayiz Khan",
    role: "seller",
  },
});

// 3,7,50
prisma.user.updateMany({
  where: {
    userId: {
      in: [3, 7, 50],
    },
  },
  data: {
    role: "seller",
  },
});

prisma.user.updateMany({
  data: {
    role: "seller",
  },
});
