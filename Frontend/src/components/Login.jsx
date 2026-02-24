import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigateTo = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4001/user/login",
        {
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
      navigateTo("/");
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
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <form onSubmit={handleLogin} className="space-y-4">
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
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center mt-4">
          Click Here To Register?
          <Link
            to="/Signup"
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}
