import prisma from "../../../config/db.js";

// Create a new chat
const createChat = (initiatorId, data) => {
  const { receiverId, postId, hotelId } = data;

  const participants = [
    { participantId: initiatorId },
    { participantId: receiverId },
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

// Get chats of a user
const getChats = (userId, offset, limit) => {
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
      messages: {
        take: 1,
        orderBy: {
          createdAt: "desc",
        },
      },
      _count: {
        select: {
          messages: {
            where: {
              isSeen: false,
            },
          },
        },
      },
    },
    skip: offset,
    take: limit,
  });
};

// Get chat
const getChat = (chatId, userId) => {
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
const saveMessage = (chatId, userId, text) => {
  return prisma.message.create({
    data: {
      senderId: +userId,
      chatId: +chatId,
      text,
    },
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
      createdAt: "desc",
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

const service = {
  createChat,
  getChats,
  getChat,
  saveMessage,
  getMessagesCount,
  getMessages,
  messageSeen,
  seenAllMessages,
};

export default service;
