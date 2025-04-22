import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const token = req.cookies.auth_token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    console.log(error);
    res.status(403).json({ message: "Invalid token" });
  }
};

export const adminAuthenticationMiddleware = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized." });
  }
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }

  next();
};

export default authMiddleware;
