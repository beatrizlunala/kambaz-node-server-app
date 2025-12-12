import mongoose from "mongoose";
import quizAttemptsSchema from "./schema.js";
const quizAttemptsModel = mongoose.model(
  "QuizAttemptModel",
  quizAttemptsSchema
);
export default quizAttemptsModel;
