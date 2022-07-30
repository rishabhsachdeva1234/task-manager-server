import Task from "./task.model.js";
import mongoose from "mongoose";
import { TaskDto } from "./dto/task.dto.js";

export class TaskController {
  static async createTask(req, res) {
    try {
      const { error, value } = TaskDto.validateCreateTask(req.body);
      if (error) return res.status(400).json({ message: error });

      await Task.create(value);

      return res.json({ message: "Task created successfully" });
    } catch (error) {
      console.error("createTask API", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async getAllTask(req, res) {
    try {
      const tasks = await Task.find({});
      return res.json(tasks);
    } catch (error) {
      console.error("getAllTask API", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async getTask(req, res) {
    try {
      const { id: taskID } = req.params;
      const ObjectId = mongoose.Types.ObjectId;
      if (!ObjectId.isValid(taskID))
        return res.status(400).json({ message: "Invalid ID" });
      const task = await Task.findOne({ _id: taskID });
      if (!task) return res.status(404).json({ message: "No task found" });
      return res.json(task);
    } catch (error) {
      console.error("getAllTask API", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async updateTask(req, res) {
    try {
      const { id: taskID } = req.params;
      const ObjectId = mongoose.Types.ObjectId;
      if (!ObjectId.isValid(taskID))
        return res.status(400).json({ message: "Invalid ID" });

      const { error, value } = TaskDto.validateUpdateTask(req.body);
      if (error) return res.status(400).json({ message: error });

      const task = await Task.findOneAndUpdate({ _id: taskID }, value);

      if (!task) return res.status(404).json({ message: "No task found" });
      return res.json({ message: "Task updated successfully" });
    } catch (error) {
      console.error("updateTask API", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async deleteTask(req, res) {
    try {
      const { id: taskID } = req.params;
      const ObjectId = mongoose.Types.ObjectId;
      if (!ObjectId.isValid(taskID))
        return res.status(400).json({ message: "Invalid ID" });
      const task = await Task.findOneAndDelete({ _id: taskID });
      if (!task) return res.status(404).json({ message: "No task found" });
      return res.json({ message: "Task deleted successfully" });
    } catch (error) {
      console.error("deleteTask API", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
