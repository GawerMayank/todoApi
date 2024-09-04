import { Router } from "express";
import {
  registerUser,
  login,
  changePassword,
  currentUser,
  deleteUser,
} from "../controllers/user.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(login);
router.route("/change-password").post(authenticate, changePassword);
router.route("/current-user").get(authenticate, currentUser);
router.route("/delete").delete(authenticate, deleteUser);

export default router;
