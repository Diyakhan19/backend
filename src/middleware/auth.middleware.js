import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ silent: process.env.NODE_ENV === "production" });

const JWT_SECRET = process.env.JWT_SECRET;

// Auth function
const auth = (req, res, next) => {
  console.log(req.params["0"]);

  // Get token from header
  const token = req.header("Authorization") || req.header("authorization");

  // Check if no token exists
  if (!token) {
    return res.status(401).json({
      code: 401,
      success: false,
      message: "No token, authorization denied",
    });
  }

  // Verify token
  try {
    jwt.verify(token, JWT_SECRET, (error, decoded) => {
      if (error) {
        return res.status(401).json({
          code: 401,
          success: false,
          message: "Invalid token, authorization denied",
        });
      } else {
        req.user = decoded;
        next();
      }
    });
  } catch (error) {
    console.error("Something went wrong with auth middleware");
    return next({ code: 5000, status: 500, error: error.message });
  }
};

export default auth;

// Decode token for socket
export const socketAuth = (socket, next) => {
  const token = socket.handshake.headers?.token;

  try {
    jwt.verify(token, JWT_SECRET, (error, decoded) => {
      if (error) {
        return next(new Error("Error in socket connection"));
      } else {
        socket.userId = decoded.user.userId;
        next();
      }
    });
  } catch (error) {
    console.log("Something went wrong with decoding token in socket");
    return next(new Error("Error in socket connection"));
  }
};
