import { Server } from "socket.io";
import { socketAuth } from "../middleware/auth.middleware.js";
import service from "../api/chat/chat.service.js";
import upload from "../middleware/upload.middleware.js";

export let io;

// Inititialize the socket server
const init = (server) => {
  io = new Server(server, { cors: { origin: "*" } });

  if (io) {
    io.use(socketAuth).on("connection", (socket) => {
      const userId = socket?.userId;

      if (userId) {
        socket.join(userId);
      }

      // Save and send a message
      // const sendMsg = (receiverId, data) => {
      //   io.to(receiverId).emit("receiveMessage", data);
      // };

      // socket.on("sendMessage", async (payload, callback) => {
      //   try {
      //     const { chatId, receiverId, text } = payload;
      //     const senderId = socket?.userId;

      //     if (!isNaN(chatId) && !isNaN(receiverId) && text !== "") {
      //       const message = await service.saveMessage(chatId, senderId, text);

      //       if (message) {
      //         // Send real time message via socket
      //         sendMsg(receiverId, message);

      //         // Respond to client
      //         callback({
      //           success: true,
      //           message: "Message saved successfully",
      //           data: message,
      //         });
      //       }
      //     }
      //   } catch (err) {
      //     callback({
      //       success: false,
      //       message: "Error in saving message",
      //     });
      //     console.log(err);
      //   }
      // });
    });
  }
};

// Send message real time via socket
async function sendMsg(receiverId, message) {
  const id = +receiverId;
  io.to(id).emit("receiveMessage", message);
}

const socket = {
  init,
  sendMsg,
};

export default socket;
