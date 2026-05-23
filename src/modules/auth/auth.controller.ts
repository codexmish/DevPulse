import type { Request, Response } from "express";
import { authService } from "./auth.services";
import sendRes from "../../utility/SendResponse";

// signup controller
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

// login controller
const loginController = async (req: Request, res: Response) => {
  try {
    const result = await authService.loginInDB(req.body);
    console.log(result);

    const { accessToken, RefreshToken, user } = result;

    // access token set
    res.cookie("acc_tkn", accessToken, {
      secure: false, //in production
      httpOnly: true,
      sameSite: "lax",
    });

    // Refresh token set
    res.cookie("ref_tkn", RefreshToken, {
      secure: false, //in production
      httpOnly: true,
      sameSite: "lax",
    });

    // response
    sendRes(res, {
      statusCode: 200,
      success: true,
      message: "Login successful",
      data: { token: accessToken, user },
    });
  } catch (error: any) {
    console.log(error);

    sendRes(res, {
      statusCode: 500,
      success: false,
      message: error.message,
      error: error,
    });
  }
};

export const authController = { signUpController, loginController };
