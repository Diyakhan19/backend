import { body, query, param } from "express-validator";

export const chatIdSchema = [body("chatId", "Chat id is required").isNumeric()];

// Chat schema
export const createChatSchema = [
  body("receiverId", "Reciever Id is required").isNumeric(),
];

// Save message Id
export const saveMsgSchema = [
  ...chatIdSchema,
  body("text", "Text is required").optional().isString().isLength({ min: 1 }),
];

// Chat schema
export const singleChatSchema = [
  param("chatId", "Chat id is required").isNumeric(),
];

// Message seen schema
export const msgSeenSchema = [
  body("messageId", "Message id is required").isNumeric(),
];

// Get all messages based on chatId
export const getMsgsSchema = [
  query("chatId", "Chat id is required").isNumeric(),
];
