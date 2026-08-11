import React, { useState } from "react";
import "../../styles/dashboard.css";
import StudentList from "./StudentList";
const Student = () => {
  const [currPage , setCurrPage] = useState('student-list')
  return (
    <div>
      {currPage == 'student-list' && <StudentList/>}
    </div>
  );
};

export default Student;
