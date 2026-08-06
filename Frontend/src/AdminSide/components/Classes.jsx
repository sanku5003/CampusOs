import React, { useEffect } from "react";
import { useClasses } from "../hooks/useClasses";
import "../styles/dashboard.css";
const Classes = () => {
  const { getClasses, loading, classes } = useClasses();

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
        <button className="primary-btn">+ Add Class</button>
      </div>

      
    </div>
  );
};

export default Classes;
