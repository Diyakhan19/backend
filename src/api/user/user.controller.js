import { sendResponse } from "../../utils/response.js";
import service from "./user.service.js";

export const updateUser = async (req, res, next) => {
  try {
    const { name } = req.body;

    const userId = req.user.userId;

    const data = {
      name: name,
    };

    const updatedUser = await service.updateUser(userId, data);

    updatedUser.password = undefined;

    return sendResponse(res, "User info updated successfully", updatedUser);
  } catch (err) {
    console.log("Login error:", err);
    next({ status: 500, msg: err.message });
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await service.getUsers();

    return sendResponse(res, "Get all users succesfull", users);
  } catch (err) {
    console.log("Login error:", err);
    next({ status: 500, msg: err.message });
  }
};
