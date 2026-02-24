import Todo from "../model/todo.model.js";
export const createTodo = async (req, res) => {
  const todo = new Todo({
    text: req.body.text,
    completed: req.body.completed,
  });
  try {
    const newTodo = await todo.save();
    res.status(201).json({ message: "todo created succesfully", newTodo });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "error in todo creation" });
  }
};

export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(201).json({ message: "todos fetched successfully", todos });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "error in fetching todos" });
  }
};
export const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(201).json({ message: "todo updated successfully", todo });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "error in updating todo" });
  }
};
export const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      res.status(404).json({ message: "todo not found" });
    }
    res.status(201).json({ message: "todo deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "error in deleting todo" });
  }
};
