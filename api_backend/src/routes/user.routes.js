import { Router } from "express";
import { createUser } from "../controllers/user.controller.js";
import { veriryToken, isAdmin } from "../middlewares/authJwt.js";
import {
  checkRolesExisted,
  checkDuplicateUsernameOrEmail,
} from "../middlewares/verifySingup.js";

const router = Router();

router.post(
  "/",
  [veriryToken, isAdmin, checkRolesExisted, checkDuplicateUsernameOrEmail],
  createUser
);

export default router;
