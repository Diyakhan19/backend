import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const encryptPassword = async (password) => {
  // This function hides a password.
  try {
    const salt = await bcrypt.genSalt(10); // We make some salt (extra random stuff) to help hide the password.
    const passwordHash = await bcrypt.hash(password, salt); // We mix the password with the salt to hide it.
    return passwordHash; // We return the hidden password.
  } catch (err) {
    console.log(err);
    return new Error("Error in encrypting password"); // If there is a problem, we show an error.
  }
};

export const comparePassword = async (password, hashedPassword) => {
  // This function compares a password with a hidden password.
  try {
    return await bcrypt.compare(password, hashedPassword); // We check if the passwords match.
  } catch (err) {
    console.log(err);
    throw new Error("Error in comparing password"); // If there is a problem, we show an error.
  }
};

// GET Token
export const getToken = async (payload, expiresIn) => {
  try {
    const token = await new Promise((resolve, reject) => {
      jwt.sign(payload, JWT_SECRET, { expiresIn: expiresIn }, (err, token) => {
        if (err) reject(err);
        resolve(token);
      });
    });

    return token;
  } catch (err) {
    console.log(err.message);
  }
};
