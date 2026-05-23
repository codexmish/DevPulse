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

// -----get all issues
const getAllIssue = async (req: Request, res: Response) => {
  try {
    const result = await issueService.getAllIssue(req.query);

    sendRes(res, {
      statusCode: 200,
      success: true,
      data: result,
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

// ----get single issue
const getSingleIssue = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await issueService.getSingleIssue(id as string);

    if (!result) {
      sendRes(res, {
        statusCode: 400,
        success: false,
        message: "issue not found",
      });
    }

    sendRes(res, {
      statusCode: 200,
      success: true,
      data: result,
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

// ---update issue
const updateIssue = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await issueService.updateIssue(req.body, id as string);

    if (result.rows.length === 0) {
      sendRes(res, {
        statusCode: 400,
        success: false,
        message: "no issue found",
      });
    }

    sendRes(res, {
      statusCode: 200,
      success: true,
      message: "Issue updated successfully",
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

// ---delete issue
const deleteIssue = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await issueService.deleteIssue(id as string);

    if (result.rows.length === 0) {
      sendRes(res, {
        statusCode: 400,
        success: false,
        message: "no issue found",
      });
    }

    sendRes(res, {
      statusCode: 200,
      success: true,
      message: "Issue deleted successfully",
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

export const issueController = {
  issueCreateController,
  getAllIssue,
  getSingleIssue,
  updateIssue,
  deleteIssue,
};
