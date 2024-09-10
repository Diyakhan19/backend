import prisma from "../../../config/db.js";

// Create a new chat
const createChat = (initiatorId, data) => {
  const { receiverId, postId, hotelId } = data;

  const participants = [
    { participantId: +initiatorId },
    { participantId: +receiverId },
  ];

  return prisma.chat.create({
    data: {
      initiatorId: +initiatorId,
      postId: +postId,
      hotelId: +hotelId,
      participants: {
        createMany: {
          data: participants,
        },
      },
    },
  });
};

// Get chat
const getChat = (userId, postId, hotelId) => {
  return prisma.chat.findFirst({
    where: {
      initiatorId: +userId,
      OR: [
        {
          postId: +postId,
        },
        {
          hotelId: +hotelId,
        },
      ],
    },
  });
};

// Get chats of a user
const getChats = (userId) => {
  return prisma.chat.findMany({
    where: {
      participants: {
        some: {
          participantId: +userId,
        },
      },
    },
    include: {
      participants: {
        where: {
          participantId: {
            not: {
              equals: +userId,
            },
          },
        },
        include: {
          participant: {
            select: {
              userId: true,
              name: true,
              image: true,
            },
          },
        },
      },
      post: {
        select: {
          postId: true,
          title: true,
          images: true,
        },
      },
      hotel: {
        select: {
          hotelId: true,
          name: true,
          images: true,
        },
      },
    },
  });
};

// Get chat
const getChatById = (chatId, userId) => {
  return prisma.chat.findUnique({
    where: {
      chatId: +chatId,
    },
    include: {
      participants: {
        where: {
          participantId: {
            not: {
              equals: +userId,
            },
          },
        },
        include: {
          participant: {
            select: {
              userId: true,
              name: true,
              image: true,
            },
          },
        },
      },
      messages: {
        take: 10,
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
};

// Save a new message
const saveMessage = (data) => {
  return prisma.message.create({
    data: data,
  });
};

// Get messages of a chat with pagination
const getMessagesCount = (chatId) => {
  return prisma.message.count({
    where: {
      chatId: +chatId,
    },
  });
};

// Get messages of a chat with pagination
const getMessages = (chatId) => {
  return prisma.message.findMany({
    where: {
      chatId: +chatId,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
};

// Update a message status to seen
const messageSeen = (messageId) => {
  return prisma.message.update({
    where: {
      messageId: +messageId,
    },
    data: {
      isSeen: true,
    },
  });
};

// Seen all message of a chat
const seenAllMessages = (chatId) => {
  return prisma.message.updateMany({
    where: {
      chatId: +chatId,
      isSeen: false,
    },
    data: {
      isSeen: true,
    },
  });
};

// Delete a chat
const deleteChat = (chatId) => {
  return prisma.chat.delete({
    where: {
      chatId: +chatId,
    },
  });
};

const service = {
  createChat,
  getChat,
  getChats,
  getChatById,
  saveMessage,
  getMessagesCount,
  getMessages,
  messageSeen,
  seenAllMessages,
  deleteChat,
};

export default service;
