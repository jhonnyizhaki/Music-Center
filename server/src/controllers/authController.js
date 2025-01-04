import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    console.log(user);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error.message);

    res
      .status(400)
      .json({ message: "Registration failed", error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: user._id, role: user.role, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    res.cookie(
      "user",
      {
        id: user._id,
        name: user.name,
        role: user.role,
        email: user.email,
      },
      {
        httpOnly: false,
      }
    );

    res.status(200).json({
      message: "User logged in successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};

export const verify = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.password = "******";

    return res.status(200).json({ message: "Token is valid", user });
  } catch (error) {
    console.error("Verification error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("auth_token");
  return res.status(201).json();
};
