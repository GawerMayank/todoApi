import jwt  from "jsonwebtoken";

export const authenticate = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token)
    return res.status(404).json({
      message: "No token found",
    });
  try {
    const decoded = jwt.verify(
      token.split(" ")[1],
      process.env.TOKEN_KEY
    );
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};
