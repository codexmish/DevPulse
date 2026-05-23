import { pool } from "../../db";
import type { authuserFromMiddleware, IssueG } from "./issue.interface";

// create issue
const issueCreateService = async (
  payload: IssueG,
  authPayload: authuserFromMiddleware,
) => {
  const { title, description, type } = payload;
  const { id } = authPayload;

  //   validation
  if (!title) {
    throw new Error("Title is required");
  }

  if (!description) {
    throw new Error("Description is required");
  }

  const result = await pool.query(
    `
          INSERT INTO issues(title, description, type, reporter_id) VALUES($1,$2,$3, $4) RETURNING *
         `,
    [title, description, type, id],
  );

  return result;
};

export const issueService = { issueCreateService };
