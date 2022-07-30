import { Router } from "express";
import { TaskController } from "./task.controller.js";
export const taskRouter = Router();
taskRouter
  .route("/")
  .get(TaskController.getAllTask)
  .post(TaskController.createTask);

taskRouter
  .route("/:id")
  .get(TaskController.getTask)
  .patch(TaskController.updateTask)
  .delete(TaskController.deleteTask);
