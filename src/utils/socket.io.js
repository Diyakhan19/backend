import { Server } from "socket.io";
import { socketAuth } from "../middleware/auth.middleware.js";
import service from "../api/chat/chat.service.js";

export let io;

// Inititialize the socket server
const init = (server) => {
  io = new Server(server);

  if (io) {
    io.use(socketAuth).on("connection", (socket) => {
      const userId = socket?.userId;

      if (userId) {
        socket.join(userId);
      }

      // Save and send a message
      const sendMsg = (receiverId, data) => {
        io.to(receiverId).emit("receiveMessage", data);
      };

      socket.on("sendMessage", async (payload) => {
        try {
          const { chatId, receiverId, text } = payload;
          const senderId = socket?.userId;

          if (!isNaN(chatId) && !isNaN(receiverId) && text !== "") {
            const message = await service.saveMessage(chatId, senderId, text);

            if (message) {
              const msgData = {
                chatId,
                senderId,
                text,
              };

              // Send real time message via socket
              sendMsg(receiverId, msgData);
            }
          }
        } catch (err) {
          console.log(err);
        }
      });
    });
  }
};

// Send message real time via socket
async function sendMsg(senderId, recieverId, text) {
  io.to(recieverId).emit("sendMessage", {
    senderId,
    text,
  });
}

const socket = {
  init,
  sendMsg,
};

export default socket;
