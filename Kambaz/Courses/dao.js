import { v4 as uuidv4 } from "uuid";
import model from "./model.js";
import enrollmentsModel from "../Enrollments/model.js";

export default function CoursesDao(db) {
  function findAllCourses() {
    return model.find();
  }
  async function findCoursesForEnrolledUser(userId, userRole) {
    // FACULTYs can access all courses
    if (userRole === "FACULTY") {
      return model.find();
    }
    // STUDENTs only see courses they're enrolled in
    const enrollments = await enrollmentsModel.find({ user: userId });
    const courseIds = enrollments.map((enrollment) => enrollment.course);
    const courses = await model.find({ _id: { $in: courseIds } });
    return courses;
  }

  function createCourse(course) {
    const newCourse = { ...course, _id: uuidv4() };
    return model.create(newCourse);
  }

  function deleteCourse(courseId) {
    return model.deleteOne({ _id: courseId });
  }

  function updateCourse(courseId, course) {
    return model.updateOne({ _id: courseId }, { $set: course });
  }

  return {
    findAllCourses,
    findCoursesForEnrolledUser,
    createCourse,
    deleteCourse,
    updateCourse,
  };
}
