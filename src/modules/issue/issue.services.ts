import { pool } from "../../db";
import type {
  authuserFromMiddleware,
  FilteringIsuues,
  IssueG,
} from "./issue.interface";

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

// get all user
const getAllIssue = async (payload: FilteringIsuues) => {
  const { sort, type, status } = payload;

  let queryText = `SELECT * FROM issues WHERE 1=1`;

  // if send type
  if (type) {
    queryText = queryText + ` AND type = '${type}'`;
  }

  // if sent status
  if (status) {
    queryText = queryText + ` AND status = '${status}'`;
  }

  // sorting
  if (sort === "oldest") {
    queryText = queryText + ` ORDER BY created_at ASC`;
  } else {
    queryText = queryText + ` ORDER BY created_at DESC`;
  }

  const issueResult = await pool.query(queryText);
  // return issueResult

  // --------------adding reporter field
  const formattedIssues = [];
  const result = issueResult.rows;

  // -finding reporter user
  for (const issue of result) {
    const currentReporterId = issue.reporter_id;
    if (currentReporterId) {
      // ---finding user data
      const userData = await pool.query(
        `SELECT id, name, role FROM users WHERE id = $1`,
        [currentReporterId],
      );

      const userObj = userData.rows[0];

      // ---creating reporter field
      if (userObj) {
        issue.reporter = {
          id: userObj.id,
          name: userObj.name,
          role: userObj.role,
        };
      } else {
        issue.reporter = null;
      }
      delete issue.reporter_id;
      const newOrderedIssue = {
        id: issue.id,
        title: issue.title,
        description: issue.description,
        type: issue.type,
        status: issue.status,
        reporter: issue.reporter,
        created_at: issue.created_at,
        updated_at: issue.updated_at,
      };

      formattedIssues.push(newOrderedIssue);
    }
    return formattedIssues;
  }
};

// get singleIssue
const getSingleIssue = async (id: string) => {
  const result = await pool.query(
    `
      SELECT * FROM issues WHERE id=$1
      `,
    [id],
  );
  const issue = result.rows[0];
  const formattedIssues = [];
  const currentReporterId = issue.reporter_id;
  if (currentReporterId) {
    // ---finding user data
    const userData = await pool.query(
      `SELECT id, name, role FROM users WHERE id = $1`,
      [currentReporterId],
    );

    const userObj = userData.rows[0];
    if (userObj) {
      issue.reporter = {
        id: userObj.id,
        name: userObj.name,
        role: userObj.role,
      };
    } else {
      issue.reporter = null;
    }
    delete issue.reporter_id;
    const newOrderedIssue = {
      id: issue.id,
      title: issue.title,
      description: issue.description,
      type: issue.type,
      status: issue.status,
      reporter: issue.reporter,
      created_at: issue.created_at,
      updated_at: issue.updated_at,
    };
    formattedIssues.push(newOrderedIssue);
    return formattedIssues;
  }
};

// ---update issue
const updateIssue = async (payload: IssueG, id: string) => {
  const { title, description, type } = payload;

  const result = await pool.query(
    `
      UPDATE issues SET title=COALESCE($1,title), 
      description=COALESCE($2,description), 
      type=COALESCE($3,type)

      WHERE id=$4 RETURNING *
      `,
    [title, description, type, id],
  );

  return result;
};

export const issueService = {
  issueCreateService,
  getAllIssue,
  getSingleIssue,
  updateIssue,
};
