import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const staticFolderPath = path.join(__dirname, "uploads");
app.use("/uploads", express.static(staticFolderPath));

import authRouter from "./src/api/auth/auth.router.js";
import userRouter from "./src/api/user/user.router.js";

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.get("/api", (req, res) => {
  return res.send("Server is running...!");
});

// Error handler
app.use((err, req, res, next) => {
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
