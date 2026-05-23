import { Router } from "express";
import { authController } from "./auth.controller";

const router = Router()

// ------signup
router.post("/signup", authController.signUpController)


export const authRouter = router