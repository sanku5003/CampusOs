import React from 'react'
import "../../styles/dashboard.css";
const StudentList = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="heading">
          <h1>Student Management</h1>
          <p>Manage all enrolled students, view profiles, and track academic records.</p>
        </div>
        <button className="primary-btn">+ Add New Student</button>
      </div>

      
    </div>
  )
}

export default StudentList
