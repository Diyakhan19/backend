import { sendResponse } from "../../utils/response.js";
import service from "./chat.service.js";
import socket from "../../utils/socket.io.js";

// ==== Create a new chat ==== //
export const createChat = async (req, res, next) => {
  try {
    const { receiverId, postId, hotelId } = req.body;
    const initiatorId = req.user.userId;

    const chatExists = await service.getChat(initiatorId, postId);

    console.log("+++++++>", chatExists);

    if (chatExists) {
      return sendResponse(res, "Chat already exists", chatExists);
    }

    const data = {
      receiverId,
      postId,
      hotelId,
    };

    const chat = await service.createChat(initiatorId, data);

    return sendResponse(res, "Chat created successfully", chat);
  } catch (error) {
    console.log(error);
    next({ status: 500, msg: error.message });
  }
};

// ==== Save a message ==== //
export const saveMessage = async (req, res, next) => {
  try {
    const { chatId, text, receiverId } = req.body;
    const senderId = req.user.userId;

    let files = null;

    if (req.files) {
      files = req.files.map((item) => {
        return {
          path: item.path,
          mimeType: item.mimetype,
        };
      });
    }

    const data = {
      chatId: +chatId,
      senderId,
      text,
      attachments: files,
    };

    const message = await service.saveMessage(data);

    socket.sendMsg(receiverId, message);

    return sendResponse(res, "Message saved successfully", message);
  } catch (error) {
    console.log(error);
    return next({ code: 5000, status: 500, error: error.message });
  }
};

// ==== Get chats of a user ==== //
export const getChats = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    const chats = await service.getChats(userId);

    return sendResponse(res, "Get chats successfull", chats);
  } catch (error) {
    console.log(error);
    next({ status: 500, msg: error.message });
  }
};

// ==== Get a single chat By Id ==== //
export const getChat = async (req, res, next) => {
  try {
    const { chatId } = req.params;
    const userId = req.user.userId;

    const chat = await service.getChatById(chatId, userId);

    return sendResponse(res, "Get chat successfull", chat);
  } catch (error) {
    console.log(error);
    next({ status: 500, msg: error.message });
  }
};

// ==== Get messages of a chat with pagination ==== //
export const getMessages = async (req, res, next) => {
  try {
    const { chatId } = req.query;

    const messages = await service.getMessages(chatId);

    return sendResponse(res, "Get messages successfull", messages);
  } catch (error) {
    console.log(error);
    next({ status: 500, msg: error.message });
  }
};

// ==== Message seen schema ==== //
export const messageSeen = async (req, res, next) => {
  try {
    const { messageId } = req.body;

    const seenMessage = await service.messageSeen(messageId);

    return sendResponse(res, "Message seen successfull", seenMessage);
  } catch (error) {
    console.log(error);
    next({ status: 500, msg: error.message });
  }
};

// ==== Seen all messages of a chat ==== //
export const seenAllMessages = async (req, res, next) => {
  try {
    const { chatId } = req.body;

    const seenAll = await service.seenAllMessages(chatId);

    return sendResponse(res, "Seen all messages successfull", seenAll);
  } catch (error) {
    console.log(error);
    next({ status: 500, msg: error.message });
  }
};
