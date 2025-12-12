import CoursesDao from "./dao.js";
import EnrollmentsDao from "../Enrollments/dao.js";

export default function CourseRoutes(app) {
  const dao = CoursesDao();
  const enrollmentsDao = EnrollmentsDao();

  const findAllCourses = async (req, res) => {
    const courses = await dao.findAllCourses();
    res.send(courses);
  };
  app.get("/api/courses", findAllCourses);

  const findCoursesForEnrolledUser = async (req, res) => {
    let { userId } = req.params;
    let userRole = null;
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
      userRole = currentUser.role;
    } else {
      const currentUser = req.session["currentUser"];
      if (currentUser && currentUser._id === userId) {
        userRole = currentUser.role;
      }
    }
    const courses = await dao.findCoursesForEnrolledUser(userId, userRole);
    res.json(courses);
  };
  app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);

  const createCourse = async (req, res) => {
    const newCourse = await dao.createCourse(req.body);
    const currentUser = req.session["currentUser"];
    enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
    res.json(newCourse);
  };
  app.post("/api/users/current/courses", createCourse);

  const deleteCourse = async (req, res) => {
    const { cid } = req.params;
    await enrollmentsDao.unenrollAllUsersFromCourse(cid);
    const status = await dao.deleteCourse(cid);
    res.send(status);
  };
  app.delete("/api/courses/:cid", deleteCourse);

  const updateCourse = async (req, res) => {
    const { cid } = req.params;
    const courseUpdates = req.body;
    const status = await dao.updateCourse(cid, courseUpdates);
    res.send(status);
  };
  app.put("/api/courses/:cid", updateCourse);

  const findUsersForCourse = async (req, res) => {
    const { cid } = req.params;
    const users = await enrollmentsDao.findUsersForCourse(cid);
    res.json(users);
  };
  app.get("/api/courses/:cid/users", findUsersForCourse);

  const enrollUserInCourse = async (req, res) => {
    let { uid, cid } = req.params;
    if (uid === "current") {
      const currentUser = req.session["currentUser"];
      uid = currentUser._id;
    }
    const status = await enrollmentsDao.enrollUserInCourse(uid, cid);
    res.send(status);
  };
  const unenrollUserFromCourse = async (req, res) => {
    let { uid, cid } = req.params;
    if (uid === "current") {
      const currentUser = req.session["currentUser"];
      uid = currentUser._id;
    }
    const status = await enrollmentsDao.unenrollUserFromCourse(uid, cid);
    res.send(status);
  };
  app.post("/api/users/:uid/courses/:cid", enrollUserInCourse);
  app.delete("/api/users/:uid/courses/:cid", unenrollUserFromCourse);
}
