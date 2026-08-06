import React, { useEffect } from "react";
import { useClasses } from "../hooks/useClasses";
import '../styles/dashboard.css'
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
        <div>
            <h1>Class Management</h1>
            <p>View and manage data according to classes...</p>
        </div>

      {classes && classes.length > 0 && (
        <section className="class-list">
          {classes.map((classData) => {
            return (
              <div key={classData.class_id}>
                
              </div>
            );
          })}
        </section>
      )}
    </div>
  );
};

export default Classes;
