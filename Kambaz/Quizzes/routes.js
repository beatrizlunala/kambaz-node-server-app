import * as quizDao from "./dao.js";

const QuizzesRoutes = (app) => {
  // GET /api/courses/:cid/quizzes
  app.get("/api/courses/:cid/quizzes", async (req, res) => {
    const { cid } = req.params;
    const quizzes = await quizDao.findQuizzesForCourse(cid);
    res.json(quizzes);
  });

  // POST /api/courses/:cid/quizzes
  app.post("/api/courses/:cid/quizzes", async (req, res) => {
    const { cid } = req.params;
    const quiz = req.body;
    const newQuiz = await quizDao.createQuizForCourse(cid, quiz);
    res.json(newQuiz);
  });

  // GET /api/quizzes/:qid
  app.get("/api/quizzes/:qid", async (req, res) => {
    const { qid } = req.params;
    const quiz = await quizDao.findQuizById(qid);
    res.json(quiz);
  });

  // PUT /api/quizzes/:qid
  app.put("/api/quizzes/:qid", async (req, res) => {
    const { qid } = req.params;
    const quiz = req.body;
    await quizDao.updateQuiz(qid, quiz);
    const updated = await quizDao.findQuizById(qid);
    res.json(updated);
  });

  // DELETE /api/quizzes/:qid
  app.delete("/api/quizzes/:qid", async (req, res) => {
    const { qid } = req.params;
    const status = await quizDao.deleteQuiz(qid);
    res.json(status);
  });
};

export default QuizzesRoutes;
