import { Router } from "express";
import { issueController } from "./issue.controller";
import auth from "../../middleware/authmiddleware";

const router = Router();

// ------Create Issue
router.post("/issues",auth(), issueController.issueCreateController);


export const issueRouter = router;