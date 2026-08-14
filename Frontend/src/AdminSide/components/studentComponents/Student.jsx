import React, { useState } from "react";
import "../../styles/dashboard.css";
import StudentList from "./StudentList";
import AddStudent from "./AddStudent";
const Student = () => {
  const [currPage , setCurrPage] = useState('student-list')
  return (
    <div>
      {currPage == 'student-list' && <StudentList currPage={currPage} setCurrPage = {setCurrPage} />}
      {currPage == 'AddStudentPage' && <AddStudent currPage={currPage} setCurrPage = {setCurrPage}/>}
    </div>
  );
};

export default Student;
