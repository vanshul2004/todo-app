import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const navigateTo = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4001/user/signup",
        {
          username,
          email,
          password,
        },
        {
          withCredentials: true,
          Headers: {
            "content-type": "application/json",
          },
        },
      );
      // console.log(response);
      toast.success(response.data.message, {
        duration: 3000,
        position: "top-right",
      });
      localStorage.setItem("jwt", response.data.token);

      navigateTo("/Login");
    } catch (error) {
      // console.log(error.response.data.errors.map((err) => err.message));
      // alert(error.response.data.errors.map((err) => err.message).join("\n"));

      if (error.response.data.errors) {
        toast.error(
          error.response.data.errors.map((err) => err.message).join("\n"),
        );
      } else {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-md">
        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-6">Signup</h2>

        <form onSubmit={handleRegister} className="space-y-4">
          {/* Username */}
          <div>
            <label htmlFor="" className="block text-sm font-semibold mb-1">
              Username
            </label>
            <input
              value={username}
              type="text"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="" className="block text-sm font-semibold mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="" className="block text-sm font-semibold mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-900 duration-300"
          >
            Signup
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center mt-4">
          Already have an account?
          <Link
            to="/login"
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
