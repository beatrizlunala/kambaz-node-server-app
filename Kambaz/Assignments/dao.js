import { v4 as uuidv4 } from "uuid";

export function findAssignmentsForCourse(courseId) {
  return Database.filter((assignment) => assignment.course === courseId);
}

export function createAssignment(assignment) {
  const newAssignment = { ...assignment, _id: Date.now().toString() };
  Database.push(newAssignment);
  return newAssignment;
}

export function deleteAssignment(assignmentId) {
  const index = Database.findIndex(
    (assignment) => assignment._id === assignmentId
  );
  if (index !== -1) {
    Database.splice(index, 1);
    return { status: "deleted" };
  }
  return { status: "not found" };
}

export function updateAssignment(assignmentId, assignmentUpdates) {
  const index = Database.findIndex(
    (assignment) => assignment._id === assignmentId
  );
  if (index !== -1) {
    Database[index] = { ...Database[index], ...assignmentUpdates };
    return Database[index];
  }
  return null;
}
