import { useState } from "react";
import { viewStudentsApi } from "../services/student.api";

export const useStudents = () => {
  const [searching, setSearching] = useState(false);
  const [students, setStudents] = useState([]);

 const viewStudents = async (class_val, sec, search) => {
  setSearching(true);

  try {
    const response = await viewStudentsApi(
      class_val,
      sec,
      search
    );

    setStudents(response.students);

    return response.students;
  } catch (err) {
    console.log("VIEW STUDENTS ERROR:", err);
  } finally {
    setSearching(false);
  }
};


  return {searching , students , viewStudents};
};
