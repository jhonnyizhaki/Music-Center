import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import googleAuth from "../config/googleAuth.js";
import * as arctic from "arctic";
import { z } from "zod";

export const register = async (req, res) => {
  const { email, password } = req.body;
  console.log({ email });

  try {
    const user = await User.create({ email, password });
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ message: "Registration failed", error: error.message });
  }
};

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */

export const googleRegister = async (req, res) => {
  try {
    const state = arctic.generateState();
    const codeVerifier = arctic.generateCodeVerifier();
    const scopes = ["openid", "profile", "email"];
    const url = googleAuth.createAuthorizationURL(state, codeVerifier, scopes);

    res.cookie("codeVerifier", codeVerifier, { httpOnly: true });
    res.cookie("state", state, { httpOnly: true });

    res.json({ url: url.href });
  } catch (error) {
    res.status(400).json({ message: "Registration failed", error: error.message });
  }
};

const authWithGoogleQuerySchema = z.object({
  state: z.string(),
  code: z.string(),
  scope: z.string(),
  prompt: z.string(),
});
const authWithGoogleCookieSchema = z.object({
  state: z.string(),

  codeVerifier: z.string(),
});

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */

export const authWithGoogle = async (req, res) => {
  try {
    const reqData = authWithGoogleQuerySchema.parse(req.query);
    const reqCookie = authWithGoogleCookieSchema.parse(req.cookies);

    if (reqCookie.state !== reqData.state) {
      return res.status(400).json();
    }

    const tokens = await googleAuth.validateAuthorizationCode(reqData.code, reqCookie.codeVerifier);
    console.log(tokens);

    const USER_INFO_URL = "https://www.googleapis.com/oauth2/v1/userinfo";
    const googleUserResponse = await fetch(USER_INFO_URL, {
      headers: {
        Authorization: `Bearer ${tokens.accessToken()}`,
      },
    });

    const googleUserData = await googleUserResponse.json();

    const user = await User.findOne({ email: googleUserData.email });

    if (!user) {
      const user = await User.create({ email: googleUserData.email });

      return res.redirect("http://localhost:5173/login").status(200);
    }
    const token = jwt.sign({ id: user._id, role: user.role, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    res.cookie(
      "user",

      encodeURI(
        JSON.stringify({
          id: user._id,
          name: user.name,
          role: user.role,
          email: user.email,
        })
      ),
      {
        httpOnly: false,
      }
    );
    return res.redirect("http://localhost:5173");
  } catch (error) {
    res.status(400).json({ message: "Registration failed", error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !bcrypt.compare(password, user.password)) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id, role: user.role, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    res.cookie(
      "user",

      encodeURI(
        JSON.stringify({
          id: user._id,
          name: user.name,
          role: user.role,
          email: user.email,
        })
      ),
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

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */

export const googleLogin = async (req, res) => {
  try {
    const state = arctic.generateState();
    const codeVerifier = arctic.generateCodeVerifier();
    const scopes = ["openid", "profile", "email"];

    const url = googleAuth.createAuthorizationURL(state, codeVerifier, scopes);

    res.cookie("codeVerifier", codeVerifier, { httpOnly: true });
    res.cookie("state", state, { httpOnly: true });
    res.json({ url: url.href });
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
