import express from "express";

const app = express();

app.use(express.json());

import authRouter from "./src/api/auth/auth.router.js";
import userRouter from "./src/api/user/user.router.js";

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

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
