import React, { useEffect, useState } from "react";
import { useClasses } from "../../hooks/useClasses";

import "../../styles/dashboard.css";
const ClassList = (props) => {
  const { getClasses, loading, classes } = useClasses();
  const [index, setIndex] = useState(1);

  useEffect(() => {
    getClasses();
  }, []);

  useEffect(() => {
    console.log(classes);
  }, [classes]);

  if (loading) {
    return <h1>Loading.....</h1>;
  }
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="heading">
          <h1>Class Management</h1>
          <p>View and manage data for classes</p>
        </div>
        <button className="primary-btn" onClick={()=> {props.setCurrPage('addClassFormPage')}}>+ Add Class</button>
      </div>

      {classes.length === 0 && (
        <div className="h-[70vh] flex w-full justify-center items-center">
          <h1 className="text-white text-2xl font-extrabold">
            {" "}
            No Class Found...
          </h1>
        </div>
      )}

      {classes && classes.length > 0 && (
        <div className="class-list">
          <table>
            <thead className="class-card-head">
              <tr>
                <th className="list-head">Sr.</th>
                <th className="list-head">Class</th>
                <th className="list-head">Section</th>
                <th className="list-head"> Room No. </th>
                <th className="list-head"> Medium </th>
                <th className="list-head">Actions</th>
              </tr>
            </thead>
            {classes.map((classData , idx) => {
              return (
                <tbody className="class-card" key={idx}>
                  <tr>
                    <td className="list-value">{idx+1}</td>
                    <td className="list-value">class {classData.class}</td>
                    <td className="list-value"> {classData.section}</td>
                    <td className="list-value"> {classData.room_no}</td>
                    <td className="list-value"> {classData.medium}</td>
                    <td className="list-value">
                      <button className="sec-btn">View</button>
                      <button className="sec-btn">Edit</button>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
      )}
    </div>
  );
};

export default ClassList;
