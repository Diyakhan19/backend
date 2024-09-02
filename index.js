import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import auth from "./src/middleware/auth.middleware.js";

const app = express();

app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const staticFolderPath = path.join(__dirname, "uploads");
app.use("/uploads", express.static(staticFolderPath));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

// ==== CORS Policy ==== //
var whitelist = ["http://localhost:3000"];

export var corsOptions = {
  origin: function (origin, callback) {
    if (origin === undefined) return callback(null, true);

    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

// Routes
app.get("/api", (req, res) => {
  return res.send("Server is running...!");
});

import authRouter from "./src/api/auth/auth.router.js";
import userRouter from "./src/api/user/user.router.js";
import adminRouter from "./src/api/admin/admin.router.js";
import postRouter from "./src/api/post/post.router.js";
import hotelRouter from "./src/api/hotel/hotel.router.js";
import destRouter from "./src/api/destination/dest.router.js";
import transportRouter from "./src/api/transport/transport.router.js";

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/post", postRouter);
app.use("/api/hotel", hotelRouter);
app.use("/api/destination", destRouter);
app.use("/api/transport", transportRouter);

// Error handler
app.use((err, req, res, next) => {
  console.log("++++++++++> ", err);
  if (err.msg) {
    return res.status(err.status || 403).json({
      success: false,
      message: err.msg,
      data: {},
    });
  }
  return res.status(err.status || 500).json({
    success: false,
    message: "Interal server error",
    data: {},
  });
});

const server = app.listen(5000, () => console.log("Server is running...!"));
