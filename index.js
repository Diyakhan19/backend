import express from "express";

const app = express();

app.use(express.json());

import authRouter from "./src/api/auth/auth.router.js";

app.use("/api/auth", authRouter);

const server = app.listen(5000, () => console.log("Server is running...!"));
