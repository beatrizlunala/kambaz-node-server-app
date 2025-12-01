/**
 * Assignment Client for React Application
 * 
 * This file should be copied to your React application (kambaz-next-js)
 * and placed in an appropriate location (e.g., src/services/assignments.js)
 * 
 * Make sure to install axios in your React app if not already installed:
 * npm install axios
 */

import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:4000";

const request = axios.create({
  withCredentials: true,
});

/**
 * Find all assignments
 * @returns {Promise} Promise that resolves to an array of all assignments
 */
export const findAllAssignments = async () => {
  const response = await request.get(`${API_BASE}/api/assignments`);
  return response.data;
};

/**
 * Find assignments for a specific course
 * @param {string} courseId - The ID of the course
 * @returns {Promise} Promise that resolves to an array of assignments for the course
 */
export const findAssignmentsForCourse = async (courseId) => {
  const response = await request.get(
    `${API_BASE}/api/courses/${courseId}/assignments`
  );
  return response.data;
};

/**
 * Find a single assignment by ID
 * @param {string} assignmentId - The ID of the assignment
 * @returns {Promise} Promise that resolves to the assignment object
 */
export const findAssignmentById = async (assignmentId) => {
  const response = await request.get(
    `${API_BASE}/api/assignments/${assignmentId}`
  );
  return response.data;
};

/**
 * Create a new assignment
 * @param {Object} assignment - The assignment object to create
 * @returns {Promise} Promise that resolves to the created assignment
 */
export const createAssignment = async (assignment) => {
  const response = await request.post(`${API_BASE}/api/assignments`, assignment);
  return response.data;
};

/**
 * Update an existing assignment
 * @param {string} assignmentId - The ID of the assignment to update
 * @param {Object} assignment - The updated assignment data
 * @returns {Promise} Promise that resolves to the updated assignment
 */
export const updateAssignment = async (assignmentId, assignment) => {
  const response = await request.put(
    `${API_BASE}/api/assignments/${assignmentId}`,
    assignment
  );
  return response.data;
};

/**
 * Delete an assignment
 * @param {string} assignmentId - The ID of the assignment to delete
 * @returns {Promise} Promise that resolves when the assignment is deleted
 */
export const deleteAssignment = async (assignmentId) => {
  const response = await request.delete(
    `${API_BASE}/api/assignments/${assignmentId}`
  );
  return response.data;
};

