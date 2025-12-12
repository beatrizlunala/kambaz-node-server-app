import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export default function AssignmentsDao() {
  function findAssignmentsForCourse(courseId) {
    return model.find({ course: courseId });
  }

  function findAssignmentById(assignmentId) {
    return model.findById(assignmentId);
  }

  function findAllAssignments() {
    return model.find();
  }

  function createAssignment(assignment) {
    return model.create(assignment);
  }

  function deleteAssignment(assignmentId) {
    return model.deleteOne({ _id: assignmentId });
  }

  function updateAssignment(assignmentId, assignmentUpdates) {
    return model.updateOne({ _id: assignmentId }, { $set: assignmentUpdates });
  }

  return {
    findAssignmentsForCourse,
    findAssignmentById,
    findAllAssignments,
    createAssignment,
    deleteAssignment,
    updateAssignment,
  };
}
