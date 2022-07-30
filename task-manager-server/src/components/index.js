import { Router } from "express";
import { taskRouter } from "./task/index.js";

export const restRouter = Router();

restRouter.use("/task", taskRouter);
