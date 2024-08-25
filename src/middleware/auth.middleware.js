import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ silent: process.env.NODE_ENV === "production" });

const JWT_SECRET = process.env.JWT_SECRET;

const auth = (req, res, next) => {
  // Public Routes
  const excludedPaths = [
    "/api/auth/login",
    "/api/auth/signup",
    "/api/auth/user",
    "/api/post/all",
    "/api/post/single",
  ];

  console.log(req.params["0"]);

  // Get token from header
  const token = req.header("Authorization") || req.header("authorization");

  // Check if route is public
  if (excludedPaths.includes(req.params["0"]) && !token) return next();

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
