import type { NextFunction, Request, Response } from "express";
import sendRes from "../utility/SendResponse";
import jwt, { decode, type JwtPayload } from "jsonwebtoken";
import config from "../config/consfig";
import { pool } from "../db";



const auth = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      sendRes(res, {
        statusCode: 400,
        success: false,
        message: "unauthorized request",
      });
    }

    // validation
    const decoded = jwt.verify(token as string, config.JWT_SEC) as JwtPayload;

    const userData = await pool.query(
      `
        SELECT * FROM users WHERE id=$1
        `,
      [decoded.id],
    );

    const User = userData.rows[0];

    if (userData.rows.length === 0) {
      sendRes(res, {
        statusCode: 400,
        success: false,
        message: "unauthorized request",
      });
    }else{
         (req as any).user = decoded;
         next()
    }

  };
};

export default auth;
