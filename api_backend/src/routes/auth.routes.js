import { Router } from "express";
const router = Router();

import { signIn, signUp } from "../controllers/auth.controller.js";
import {
  checkRolesExisted,
  checkDuplicateUsernameOrEmail,
} from "../middlewares/verifySingup.js";

router.post(
  "/signup",
  [checkDuplicateUsernameOrEmail, checkRolesExisted],
  signUp
);
router.post("/signin", signIn);

export default router;
