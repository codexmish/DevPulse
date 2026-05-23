import type { Request, Response } from "express";
import { authService } from "./auth.services";
import sendRes from "../../utility/SendResponse";

const signUpController = async (req: Request, res: Response) => {
  try {
    const result = await authService.signupInDB(req.body);

    sendRes(res, {
      statusCode: 201,
      success: true,
      message: "User registered successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    sendRes(res, {
      statusCode: 500,
      success: false,
      message: error.message,
      error: error,
    });
  }
};

export const authController = { signUpController };
