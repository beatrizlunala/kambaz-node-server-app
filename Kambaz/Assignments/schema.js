import mongoose from "mongoose";
const assignmentsSchema = new mongoose.Schema(
  {
    _id: String,
    title: String,
    course: String,
    description: String,
    availableDate: String,
    dueDate: String,
    availableUntilDate: String,
    points: Number,
  },
  { collection: "assignments" }
);
export default assignmentsSchema;
