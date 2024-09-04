import { User } from "../models/user.model.js";

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({
      status: "error",
      message: "All fields are mandatory:username, email & password",
    });
  }
  try {
    const user = await User.create({
      username,
      email,
      password,
    });
    return res.status(201).json({
      status: "success",
      message: "User created successfully",
      data: { username, email },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      status: "error",
      message: "All fields are mandatory:username & password",
    });
  }
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }
    const isMatched = await user.isPasswordCorrect(password);
    if (!isMatched) {
      return res.status(400).json({
        status: "error",
        message: "Wrong password",
      });
    }
    const token = await user.generateToken(user._id);
    if (!token) {
      return res.status(400).json({
        status: "error",
        message: "Failed to generate token",
      });
    }
    return res.status(200).json({
      status: "success",
      message: "User logged in",
      data: { username, token },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    return res.status(400).json({
      status: "error",
      message: "All fields are mandatory:oldPassword & newPassword",
    });
  }
  try {
    const user = await User.findById(req.user?._id);
    const isMatched = await user.isPasswordCorrect(oldPassword);
    if (!isMatched) {
      return res.status(400).json({
        status: "error",
        message: "Wrong password",
      });
    }

    user.password = newPassword;
    await user.save({ validateBeforeSave: false });
    return res.status(200).json({
      status: "success",
      message: "Password changed succesfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const currentUser = async (req, res) => {
  const user = req.user;
  if (!user) {
    return res.status(404).json({
      status: "error",
      message: "User not found",
    });
  }
  return res.status(200).json({
    status: "success",
    message: "User fetched successfully",
    data: { user },
  });
};

const deleteUser = async (req, res) => {
  const user = req.user;
  if (!user) {
    return res.status(404).json({
      status: "error",
      message: "User not found",
    });
  }
  try {
    await User.findOneAndDelete({ _id: user._id });
    return res.status(200).json({
      status: "success",
      message: "User deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

export { registerUser, login, changePassword, currentUser, deleteUser };
