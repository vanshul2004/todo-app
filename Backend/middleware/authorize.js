import jwt from "jsonwebtoken";
import User from "../model/user.model.js";
export const authenticate = async (req, res, next) => {
  const token = req.cookies.jwt;
  // console.log("jwt middleware token", token);
  if (!token) {
    return res.json({ message: "unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_kEY);
    console.log(decoded);
    req.user = await User.findById(decoded.id);
    console.log("done", req.user);
  } catch (error) {
    return res.status(400).json({ message: "" + error.message });
  }
  next();
};
