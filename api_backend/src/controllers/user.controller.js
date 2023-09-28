import { User } from "../models/User.js";
import { Role } from "../models/Role.js";

import jwt from "jsonwebtoken";
import config from "../config.js";

export const createUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const newUser = new User();

    let userRole;
    if (role) {
      const roles = await Role.findAll({
        where: { name: role },
      });
      userRole = roles.map((role) => role.name);
    } else {
      const defaultRole = await Role.findOne({
        where: { name: "cliente" },
      });
      userRole = [defaultRole.name];
    }

    const userRegistered = await User.create({
      username,
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
