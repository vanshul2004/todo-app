import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import todoRoute from "./routes/todo.route.js";
import UserRoute from "./routes/user.route.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 4001;
const DB_URI = process.env.MONGO_URI;
//middleware
app.use(cookieParser()); // ✅ MUST come before routes

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: "GET,POST,DELETE,PUT",
    allowedHeaders: ["content-type", "Authoriztion"],
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/todo", todoRoute);
app.use("/user", UserRoute);
//Database connection code
try {
  await mongoose.connect(DB_URI);
  console.log("Connected to MongoDB");
} catch (error) {
  console.error("Error connecting to MongoDB:", error.message);
}
//routes

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
