import { body, query, param } from "express-validator";

export const chatIdSchema = [body("chatId").isNumeric().withMessage(6002)];

// Chat schema
export const createChatSchema = [
  body("receiverId").isNumeric().withMessage(6001),
];

// Chat schema
export const singleChatSchema = [param("chatId").isNumeric().withMessage(6002)];

// Message seen schema
export const msgSeenSchema = [body("messageId").isNumeric().withMessage(6004)];

// Get all messages based on chatId
export const getMsgsSchema = [query("chatId").isNumeric().withMessage(6002)];
