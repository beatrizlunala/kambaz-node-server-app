import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export default function AssignmentsDao() {
  function findAssignmentsForCourse(courseId) {
    return model.filter((assignment) => assignment.course === courseId);
  }

  function findAssignmentById(assignmentId) {
    return model.find((assignment) => assignment._id === assignmentId);
  }

  function findAllAssignments() {
    return model.find();
  }

  function createAssignment(assignment) {
    const newAssignment = { ...assignment, _id: uuidv4() };
    return model.create(newAssignment);
  }

  function deleteAssignment(assignmentId) {
    model.deleteOne({ _id: assignmentId });
  }

  function updateAssignment(assignmentId, assignmentUpdates) {
    model.updateOne({ _id: assignmentId }, { $set: assignmentUpdates });
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
