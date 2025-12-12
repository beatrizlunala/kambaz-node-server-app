import quizAttemptsModel from "./model.js";

export const findAttemptsForQuizAndStudent = (quizId, studentId) =>
  quizAttemptsModel
    .find({ quiz: quizId, student: studentId })
    .sort({ attemptNumber: 1, submittedAt: 1 });

export const createAttemptForQuizAndStudent = async (
  quizId,
  studentId,
  attempt
) => {
  const existingCount = await quizAttemptsModel.countDocuments({
    quiz: quizId,
    student: studentId,
  });
  const attemptNumber = existingCount + 1;
  return quizAttemptsModel.create({
    ...attempt,
    quiz: quizId,
    student: studentId,
    attemptNumber,
  });
};
