import { Todo } from "../models/todos.model.js";

const createTodo = async (req, res) => {
  const { title, content, completed, priority } = req.body;
  const userId = req.user._id;
  if (!title || !content) {
    return res.status(400).json({
      status: "error",
      message: "All fields are mandatory:title & content",
    });
  }
  try {
    const todo = await Todo.create({
      title,
      content,
      completed,
      priority,
      user: userId,
    });
    return res.status(201).json({
      status: "success",
      message: "Todo created successfully",
      data: { todo },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
const getAllTodos = async (req, res) => {
  const userId = req.user._id;
  if (!userId) {
    return res.status(400).json({
      status: "error",
      message: "userID is missing",
    });
  }
  try {
    const allTodos = await Todo.find({ user: userId });
    if (!allTodos.length) {
      return res.status(404).json({
        status: "error",
        message: "No todos found",
      });
    }
    return res.status(200).json({
      status: "success",
      message: "Fetched all todos",
      data: { allTodos },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
const updateTodo = async (req, res) => {
  const { title, content, completed, priority } = req.body;
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({
      status: "error",
      message: "Todo id is missing",
    });
  }
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      {
        $set: {
          title,
          content,
          completed,
          priority,
        },
      },
      { new: true }
    );
    if (!updatedTodo) {
      return res.status(404).json({
        status: "error",
        message: "Todo not found",
      });
    }
    return res.status(201).json({
      status: "success",
      message: "Todo updated successfully",
      data: { updatedTodo },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
const deleteTodo = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({
      status: "error",
      message: "Todo id is missing",
    });
  }
  try {
    const deletedTodo = await Todo.findByIdAndDelete(id);
    if (!deletedTodo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }
    return res.status(200).json({
      status: "success",
      message: "Todo deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

export { createTodo, getAllTodos, updateTodo, deleteTodo };
