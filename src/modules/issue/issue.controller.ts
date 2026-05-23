import type { Request, Response } from "express";
import { issueService } from "./issue.services";
import sendRes from "../../utility/SendResponse";

// -----Create Issue
const issueCreateController = async (req: Request, res: Response) => {
  try {
    const result = await issueService.issueCreateService(
      req.body,
      (req as any).user,
    );

    sendRes(res, {
      statusCode: 201,
      success: true,
      message: "Issue created successfully",
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

export const issueController = { issueCreateController };
