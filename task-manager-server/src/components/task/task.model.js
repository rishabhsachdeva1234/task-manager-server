import mongoose from "mongoose";
const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required field"],
    trim: true,
    maxLength: [20, "name cannot be more than 20 characters"],
  },
  completed: { type: Boolean, default: false },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
});

export default mongoose.model("Task", taskSchema);
