import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

export const generateTokenAndSaveToCookies = async (userId, res) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET_kEY, {
    expiresIn: "10d",
  });
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
  });
  await User.findByIdAndUpdate(userId, { token });
  return token;
};
