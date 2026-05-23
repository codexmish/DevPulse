import { Router } from "express";
import { authController } from "./auth.controller";

const router = Router();

// ------signup
router.post("/signup", authController.signUpController);

// login
router.post("/login", authController.loginController)

export const authRouter = router;
