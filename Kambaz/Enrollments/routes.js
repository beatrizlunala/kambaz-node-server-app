import EnrollmentsDao from "./dao.js";
export default function EnrollmentsRoutes(app) {
  const dao = EnrollmentsDao();

  app.get("/api/enrollments", async (req, res) => {
    const enrollments = await dao.findAllEnrollments();
    res.json(enrollments);
  });

  app.post("/api/users/:userId/courses/:courseId/enroll", async (req, res) => {
    const { userId, courseId } = req.params;
    const enrollment = await dao.enrollUserInCourse(userId, courseId);
    res.json(enrollment);
  });

  app.delete(
    "/api/users/:userId/courses/:courseId/enroll",
    async (req, res) => {
      const { userId, courseId } = req.params;
      const result = await dao.unenrollUserFromCourse(userId, courseId);
      res.json(result);
    }
  );
}
// import EnrollmentsDao from "./dao.js";

// export default function EnrollmentsRoutes(app) {
//   const dao = EnrollmentsDao();

//   const enrollUserInCourse = async (req, res) => {
//     const { courseId } = req.params;
//     const currentUser = req.session["currentUser"];

//     if (!currentUser) {
//       res.sendStatus(401).json({ message: "User not logged in" });
//       return;
//     }
//     // Only STUDENT role should be able to enroll
//     if (currentUser.role !== "STUDENT") {
//       res.status(403).json({ message: "Only students can enroll in courses" });
//       return;
//     }

//     try {
//       const enrollment = await dao.enrollUserInCourse(
//         currentUser._id,
//         courseId
//       );
//       res.json(enrollment);
//     } catch (error) {
//       // Handle duplicate enrollment (if _id already exists)
//       if (error.code === 11000) {
//         res.status(400).json({ message: "Already enrolled in this course" });
//       } else {
//         res.status(500).json({ message: "Failed to enroll in course" });
//       }
//     }
//   };
//   app.post("/api/courses/:courseId/enroll", enrollUserInCourse);

//   const unenrollUserFromCourse = async (req, res) => {
//     const currentUser = req.session["currentUser"];
//     if (!currentUser) {
//       res.sendStatus(401);
//       return;
//     }
//     // Only STUDENT role should be able to unenroll
//     if (currentUser.role !== "STUDENT") {
//       res
//         .status(403)
//         .json({ message: "Only students can unenroll from courses" });
//       return;
//     }
//     const { courseId } = req.params;
//     const status = await dao.unenrollUserFromCourse(currentUser._id, courseId);
//     res.json(status);
//   };
//   app.delete("/api/courses/:courseId/enroll", unenrollUserFromCourse);

//   const checkEnrollment = async (req, res) => {
//     const currentUser = req.session["currentUser"];
//     if (!currentUser) {
//       res.sendStatus(401);
//       return;
//     }
//     const { courseId } = req.params;
//     // FACULTY is considered "enrolled" in all courses
//     if (currentUser.role === "FACULTY") {
//       res.json({ enrolled: true, role: "FACULTY" });
//       return;
//     }
//     // For students, check actual enrollment
//     const courses = await dao.findCoursesForUser(currentUser._id);
//     const enrolled = courses.some((course) => course._id === courseId);
//     res.json({ enrolled, role: currentUser.role });
//   };
//   app.get("/api/courses/:courseId/enroll", checkEnrollment);
// }
