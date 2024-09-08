import { sendResponse } from "../../utils/response.js";
import service from "./chat.service.js";
import socket from "../../utils/socket.io.js";

// ==== Create a new chat ==== //
export const createChat = async (req, res, next) => {
  try {
    const { receiverId, postId, hotelId } = req.body;
    const initiatorId = req.user.userId;

    const data = {
      receiverId,
      postId,
      hotelId,
    };

    const chat = await service.createChat(initiatorId, data);

    return sendResponse(res, "Chat created successfully", chat);
  } catch (error) {
    console.log(error);
    next({ status: 500, msg: err.message });
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
    next({ status: 500, msg: err.message });
  }
};

// ==== Get a single chat By Id ==== //
export const getChat = async (req, res, next) => {
  try {
    const { chatId } = req.params;
    const userId = req.user.userId;

    const chat = await service.getChat(chatId, userId);

    return sendResponse(res, "Get chat successfull", chat);
  } catch (error) {
    console.log(error);
    next({ status: 500, msg: err.message });
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
    next({ status: 500, msg: err.message });
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
    next({ status: 500, msg: err.message });
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
    next({ status: 500, msg: err.message });
  }
};
