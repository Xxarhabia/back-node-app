import { User } from "../models/User.js";
import { Role } from "../models/Role.js";

import jwt from "jsonwebtoken";
import config from "../config.js";

export const signUp = async (req, res) => {
  try {
    const { name, last_name, document, email, password } = req.body;
    const newUser = new User();

    const defaultRole = await Role.findOne({
      where: { name: "cliente" },
    });

    const userRole = [defaultRole.name];

    const userRegistered = await User.create({
      name,
      last_name,
      document,
      email,
      password: await newUser.encryptPassword(password),
      role: userRole,
    });

    const token = jwt.sign({ id: userRegistered.id }, config.SECRET, {
      expiresIn: 86400,
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const signIn = async (req, res) => {
  const user = new User();

  const userFound = await User.findOne({
    where: {
      email: req.body.email,
    },
    include: [Role],
  });

  if (!userFound) return res.status(404).json({ message: "User not found" });

  const matchPassword = await user.comparePassword(
    req.body.password,
    userFound.password
  );

  if (!matchPassword)
    return res.status(401).json({ token: null, message: "Invalid password" });

  const token = jwt.sign({ id: userFound.id }, config.SECRET, {
    expiresIn: 86400,
  });

  res.json({ token });
};
