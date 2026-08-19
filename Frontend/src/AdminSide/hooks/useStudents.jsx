import { useState } from "react";
import {
  viewStudentsApi,
  addParentApi,
  addStudentApi,
} from "../services/student.api";

export const useStudents = () => {
  const [searching, setSearching] = useState(false);
  const [students, setStudents] = useState([]);

  const viewStudents = async (class_val, sec, search) => {
    setSearching(true);

    try {
      const response = await viewStudentsApi(class_val, sec, search);

      setStudents(response.students);

      return response.students;
    } catch (err) {
      console.log("VIEW STUDENTS ERROR:", err);
    } finally {
      setSearching(false);
    }
  };

  const addStudent = async (studentData) => {
    try {
      const response = await addStudentApi(studentData);
      return response.student;
    } catch (err) {
      console.log("ADD STUDENT ERROR:", err);
      throw err;
    }
  };

  const addParent = async (parentData) => {
    try {
      const response = await addParentApi(parentData);
      return response.parent;
    } catch (err) {
      console.log("ADD PARENT ERROR:", err);
      throw err;
    }
  };

  return { searching, students, viewStudents, addStudent, addParent };
};
