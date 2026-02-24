import User from "../model/user.model.js";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { generateTokenAndSaveToCookies } from "../jwt/token.js";
const userSchema = z.object({
  username: z.string().min(3, "username should be atleast 3 characters long"),
  email: z.string().email("invalid email address"),
  password: z.string().min(6, "password should be atleast 6 characters long"),
});
export const register = async (req, res) => {
  //   console.log("testing", req.body);
  const { username, email, password } = req.body;
  if (!email || !password || !username) {
    return res.status(400).json({ message: "all fields are required" });
  }
  const validation = userSchema.safeParse({ username, email, password });
  // console.log("validation", validation);
  // console.log("issues", JSON.stringify(validation.error, null, 2));

  if (!validation.success) {
    const errors = validation.error.issues.map((err) => ({
      field: err.path[0],
      message: err.message,
    }));

    return res.status(400).json({ errors });
  }

  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ message: "user already exists" });
  } else {
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashPassword,
      email,
    });
    // console.log(hashPassword);
    // console.log(newUser);
    newUser
      .save()
      .then(async (user) => {
        const token = await generateTokenAndSaveToCookies(newUser._id, res);
        res
          .status(201)
          .json({ message: "user registered succesfully", newUser, token });
      })
      .catch((error) => {
        console.log(error);
        res.status(400).json({ message: "error in user registration" });
      });
  }
};
// export const register = async (req, res) => {
//   const registerUser = new User({
//     username: req.body.username,
//     email: req.body.email,
//     passowrd: req.body.password,
//   });
//   try {
//     const newRegisterUser = await registerUser.save();
//     res
//       .status(201)
//       .json({ message: "user registered successfully", newRegisterUser });
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({ message: "error in user registration" });
//   }
//   console.log("signup function called");
// };

// try {
//   const { username, email, password } = req.body;
//   console.log("Received data:", { username, email, password });
// } catch (error) {
//   console.log(error);
//   res.status(400).json({ message: "error in user registration" });
// }

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "all fields are required" });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "incorrect email or password" });
    }
    const token = await generateTokenAndSaveToCookies(user._id, res);

    return res
      .status(200)
      .json({ message: " user is logged in succesfully", token }, { user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "error in logging" });
  }
};
export const logout = (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
    });

    res.status(200).json({ message: "Logged out successfully ✅" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error in logout" });
  }
};
