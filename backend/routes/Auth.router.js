import { Router } from "express";
import { HandleLogin, HandleSignUp } from "../controllers/user.controller.js";
import {
  signupValidation,
  loginValidation,
} from "../middlewares/Auth.validation.js";
const router = Router();

router.post("/signup", signupValidation, HandleSignUp);
router.post("/login", loginValidation, HandleLogin);

export default router;
