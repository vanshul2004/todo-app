import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Home() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newTodo, setNewTodo] = useState("");
  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchtodos = async () => {
      try {
        setLoading(true);

        const response = await axios.get("http://localhost:4001/todo/fetch", {
          withCredentials: true,
          headers: { "content-type": "application/json" },
        });

        console.log("API todos:", response.data.todos);

        setTodos(response.data.todos);
        setError(null);
      } catch (error) {
        setError("failed to fetch todos");
      } finally {
        setLoading(false);
      }
    };

    fetchtodos();
  }, []);
  // useEffect(() => {
  //   console.log("✅ Todos state updated:", todos);
  // }, [todos]);

  const todoCreate = async () => {
    if (!newTodo) return;

    try {
      const response = await axios.post(
        "http://localhost:4001/todo/create",
        { text: newTodo, completed: false },
        { withCredentials: true },
      ); // console.log(response);
      setTodos([...todos, response.data.newTodo]);
      setNewTodo("");
    } catch (error) {
      setError("failed to create Todo");
    }
  };
  const todoStatus = async (id) => {
    const todo = todos.find((t) => t._id === id);
    try {
      const response = await axios.put(
        `http://localhost:4001/todo/update/${id}`,
        {
          ...todo,
          completed: !todo.completed,
        },
        {
          withCredentials: true,
        },
      );
      console.log(response.data.todo);
      setTodos(todos.map((t) => (t._id === id ? response.data.todo : t)));
    } catch (error) {
      setError("failed to find Todo status");
    }
  };

  const todoDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4001/todo/delete/${id}`, {
        withCredentials: true,
      });
      setTodos(todos.filter((t) => t._id !== id));
    } catch (error) {
      setError("failed to Delete Todo");
    }
  };
  const logoutTodo = async () => {
    try {
      await axios.get("http://localhost:4001/user/logout", {
        withCredentials: true,
      });
      toast.success("successfully logged Out");
      navigateTo("/login");
      localStorage.removeItem("jwt");
    } catch (error) {
      toast.error("error in logout");
    }
  };
  const reamainingTodos = todos.filter((todo) => !todo.completed).length;

  return (
    <div className="bg-gray-100 mt-8 max-w-lg lg:max-w-xl rounded-lg shadow-lg mx-8 sm:mx-auto  p-6">
      <h1 className="text-2xl font-semibold text-center "> Todo App</h1>
      <div className="flex mb-4">
        <input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && todoCreate()}
          type="text"
          placeholder="Add a new Todo"
          className=" grow p-2 rounded-l-md focus:outline-none"
        />
        <button
          onClick={todoCreate}
          className="bg-blue-600 rounded-r-md px-4 py-2 hover:bg-blue-900 duration-300"
        >
          Add
        </button>
      </div>
      {loading ? (
        <div className=" justify-center ">
          <span className="text-gray-500">Loading...</span>
        </div>
      ) : error ? (
        <div className="text-center text-red-600 font-semibold">{error}</div>
      ) : (
        <ul className=" space-y-2 ">
          {todos.map((todo, index) => (
            <li
              key={todo._id || index}
              className="flex justify-between  p-3  rounded-md bg-grey-100"
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => todoStatus(todo._id)}
                  className="mr-2"
                />
                <span
                  className={`${todo.completed ? "line-through text-gray-800 font-semibold" : ""} `}
                >
                  {todo.text}
                </span>
              </div>
              <button
                onClick={() => todoDelete(todo._id)}
                className="text-red-500 hover:text-red-800 duration-300"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      <p className="mt-4 text-center text-sm text-gray-700">
        {reamainingTodos} todo remaining
      </p>
      <button
        onClick={() => logoutTodo()}
        className="bg-red-500 text-white  hover:bg-red-800 duration-300 mt-6 px-4 py-2  rounded-md mx-auto  block"
      >
        Logout
      </button>
    </div>
  );
}

export default Home;
