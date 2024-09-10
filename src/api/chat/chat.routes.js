import express from "express";
const router = express.Router();
import {
  createChat,
  getChat,
  getChats,
  getMessages,
  messageSeen,
  seenAllMessages,
  saveMessage,
  deleteChat,
} from "./chat.controller.js";
import { validate } from "../../utils/schema.validation.js";
import {
  createChatSchema,
  singleChatSchema,
  msgSeenSchema,
  chatIdSchema,
  getMsgsSchema,
  saveMsgSchema,
} from "./chat.schema.js";
import auth from "../../middleware/auth.middleware.js";
import upload from "../../middleware/upload.middleware.js";

// @route    POST /api/chat/
// @desc     Create a chat
// @access   private
router.post("/", auth, validate(createChatSchema), createChat);

// @route    POST /api/chat/message
// @desc     Save a message
// @access   private
router.post(
  "/message",
  auth,
  upload.attachmentImgs.array("files"),
  saveMessage
);

// @route    GET /api/chat/?userId
// @desc     Get chats of a user
// @access   private
router.get("/", auth, getChats);

// @route    GET /api/chat/message
// @desc     Get messages of a chat with pagination
// @access   private
router.get("/messages", validate(getMsgsSchema), getMessages);

// @route    GET /api/chat/:chatId
// @desc     Get a single chat by Id
// @access   private
router.get("/:chatId", validate(singleChatSchema), getChat);

// @route    PATCH /api/chat/message/seen
// @desc     Save a message
// @access   private
router.patch("/message/seen", validate(msgSeenSchema), messageSeen);

// @route    PATCH /api/chat/message/seen/all
// @desc     Seen all messages of a chat
// @access   private
router.patch("/message/seen/all", validate(chatIdSchema), seenAllMessages);

// @route    PATCH /api/chat/message/seen
// @desc     Save a message
// @access   private
router.delete("/delete", validate(chatIdSchema), deleteChat);

export default router;
