import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import {
  createTodo,
  getAllTodos,
  updateTodo,
  deleteTodo,
} from "../controllers/todos.controller.js";

const router = Router();

router.route("/create").post(authenticate, createTodo);
router.route("/all-todos").get(authenticate, getAllTodos);
router.route("/update/:id").patch(authenticate, updateTodo);
router.route("/delete/:id").delete(authenticate, deleteTodo);

export default router;
