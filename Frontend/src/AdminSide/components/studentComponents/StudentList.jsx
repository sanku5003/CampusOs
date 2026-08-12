import React, { useEffect, useState } from "react";
import "../../styles/dashboard.css";
import { useStudents } from "../../hooks/useStudents";
import "remixicon/fonts/remixicon.css";
import { useClasses } from "../../hooks/useClasses";
const StudentList = () => {
  const { searching, students, viewStudents } = useStudents();
  const { getClasses, loading, classes } = useClasses();

  const uniqueClasses = useMemo(() => {
    return [...new Set(classes.map((item) => item.class))];
  }, [classes]);

  const uniqueSections = useMemo(() => {
    return [...new Set(classes.map((item) => item.section))];
  }, [classes]);

  const [search, setSearch] = useState("");
  const [class_val, setClassVal] = useState("");
  const [sec, setSec] = useState("");

  useEffect(() => {
    getClasses();
  }, []);
  useEffect(() => {
    console.log(students);
  }, []);

  useEffect(() => {
    viewStudents(class_val, sec, search);
  }, [class_val, sec, search]);

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="heading">
          <h1>Student Management</h1>
          <p>
            Manage all enrolled students, view profiles, and track academic
            records.
          </p>
        </div>
        <button className="primary-btn">+ Add New Student</button>
      </div>

      <div className="list">
        <div className="filter">
          <form className="filter-form" onSubmit={(e) => e.preventDefault()}>
            <div className="filter-form-input">
              <i className="ri-search-line"></i>
              <input
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                type="text"
                placeholder="Search Student by Name , Registration No...."
              />
            </div>
            <div className="filter-form-dropdown">
              <select
                value={class_val}
                onChange={(e) => {
                  setClassVal(e.target.value);
                }}
              >
                <option value="">All Classes</option>

                {uniqueClasses.map((classData, idx) => (
                  <option value={classData} key={idx}>
                    Class {classData}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-form-dropdown">
              <select
                value={sec}
                onChange={(e) => {
                  setSec(e.target.value);
                }}
              >
                <option value="">All Sections</option>

                {uniqueSections.map((section, idx) => (
                  <option value={section} key={idx}>
                    Section {section}
                  </option>
                ))}
              </select>
            </div>
            <div className="export-button">
              <i className="ri-printer-line"></i> Print
            </div>
          </form>
        </div>

        <div className="student-list">
          <table>
            <thead>
              <tr>
                <th>Sr.</th>
                <th>Student</th>
                <th>Class</th>
                <th>Section</th>

                <th>Reg. No</th>
              </tr>
            </thead>

            <tbody>
              {students.map((student, idx) => {
                return (
                  <tr className="list-element">
                    <td>{idx + 1}</td>
                    <td>{student.student_name}</td>
                    <td>class {student.class_val}</td>
                    <td>{student.section}</td>
                    <td>{student.reg_no}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {students.length == 0 && (
            <div className="w-full text-center text-white bg-[#12182d] p-2">No Student Found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentList;
