import express, { type Request, type Response } from "express";
import { authRouter } from "./modules/auth/auth.router";
import { issueRouter } from "./modules/issue/issue.router";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// ----router
app.use("/api/auth", authRouter);
app.use("/api", issueRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;
