import { sendResponse } from "../../utils/response.js";
import service from "./auth.service.js";
import { encryptPassword, comparePassword, getToken } from "./auth.utils.js";

// Function to sign up a user
export const signup = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    const userExists = await service.getUserByEmail(email);

    if (userExists) {
      return next({ status: 400, msg: "User with that email already exists" });
    }

    const hashedPass = await encryptPassword(password);

    const data = {
      name: name,
      email: email.trim().toLowerCase(),
      password: hashedPass,
      role: [role],
      profileImage: req.file ? req.file.path : null,
    };

    const user = await service.createUser(data);

    if (!user) {
      return next({ status: 400, msg: "Error in creating user" });
    }

    user.password = undefined;

    return sendResponse(res, "Signup successful", user);
  } catch (err) {
    console.error("Signup error:", err);
    next({ status: 500, msg: err.message });
  }
};

// Function to log in a user
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await service.getUserByEmail(email);

    if (!user) {
      return next({ status: 400, msg: "User not found" });
    }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      return next({ status: 400, msg: "Invalid credentials" });
    }

    user.password = undefined;

    // Token JWT
    const payload = {
      userId: user.userId,
      email: user.email,
      role: user.role,
    };

    const token = await getToken(payload, "5d");

    const data = {
      token: token,
      user: user,
    };

    return sendResponse(res, "Login successful", data);
  } catch (err) {
    console.log("Login error:", err);
    next({ status: 500, msg: err.message });
  }
};
