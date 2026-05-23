import { Router } from "express";
import { issueController } from "./issue.controller";
import auth from "../../middleware/authmiddleware";

const router = Router();

// ------Create Issue
router.post("/issues",auth(), issueController.issueCreateController);
// ------get all issues
router.get("/issues", issueController.getAllIssue)
// ------get Single issues
router.get("/issues/:id", issueController.getSingleIssue)


export const issueRouter = router;