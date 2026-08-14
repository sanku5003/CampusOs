import React, { useState } from "react";
import "../../styles/dashboard.css";
import "remixicon/fonts/remixicon.css";
const AddStudent = (props) => {
  const [currForm, setCurrForm] = useState("1");
  return (
    <div className="w-full h-full">
      <div className="flex justify-between w-full items-center">
        <button
          className="sec-btn text-sm"
          onClick={() => props.setCurrPage("student-list")}
        >
          <i class="ri-arrow-left-s-line"></i> Back To Students
        </button>
      </div>
      <h3 className="text-lg font-bold text-white text-center mt-1">
        Add New Student
      </h3>
      <hr className="fancy-line" />

      <div className="add-student-form">
        <div className="form-progress">
          <h4 className="text-white font-bold text-md">Admission Wizard</h4>
          <p className="text-underheading">Complete all 4 Steps</p>

          <div className="relative">
            <div className="form-steps">
              <div className="form-step-circle">
                <i className="ri-user-line"></i>
              </div>
              <div className="form-step-text">
                <h6 className="text-white text-sm font-semibold">
                  Student Details
                </h6>
                <p className="text-underheading">
                  Name , gender , contact , reg no
                </p>
              </div>
            </div>
            <div className="step-line"></div>
            <div className="form-steps">
              <div className="form-step-circle ">
                <i className="ri-graduation-cap-line"></i>
              </div>
              <div className="form-step-text">
                <h6 className="text-white text-sm font-semibold">
                  Class & Address
                </h6>
                <p className="text-underheading">
                  Class , Section , Address info
                </p>
              </div>
            </div>
            <div className="step-line"></div>
            <div className="form-steps">
              <div className="form-step-circle">
                <i className="ri-group-line"></i>
              </div>
              <div className="form-step-text">
                <h6 className="text-white text-sm font-semibold">
                  Student Details
                </h6>
                <p className="text-underheading">Parent Info , relation</p>
              </div>
            </div>
            <div className="step-line"></div>
            <div className="form-steps">
              <div className="form-step-circle">
                <i className="ri-checkbox-multiple-line"></i>
              </div>
              <div className="form-step-text">
                <h6 className="text-white text-sm font-semibold">
                  Review & Submit
                </h6>
                <p className="text-underheading">Confirm All Details</p>
              </div>
            </div>
            <div className="progress-bar">
              <div className="flex justify-between">
                <p className="text-underheading">Progress</p>
                <p className="text-underheading">
                  {((currForm - 1) / 4) * 100}%
                </p>
              </div>
              <div className="w-full bg-[#fbfbfb34] h-1 rounded mt-1 p-0 overflow-hidden">
                <div
                  className="h-full bg-linear-to-br from-[#7c3aed] to-[#06b6d4] "
                  style={{ width: `${((currForm - 1) / 4) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div className="form-content">
          <div className="tag">STEP {currForm} OF 4</div>
          {currForm == "1" && (
            <div>
              <h4 className="text-white font-bold mt-1">Student Details</h4>
              <p className="text-underheading">
                Fill in the student's personal information as per official
                records.
              </p>

              <p className="text-[#06b6d4] text-[10px] mt-4">
                PERSONAL INFORMATION
              </p>

              <hr className="mt-2 text-[#4a494980]" />

              <form className="student-form">
                <div className="student-form-input">
                  <label className="text-underheading" htmlFor="student_name">
                    Full name
                  </label>
                  <div className="student-form-input-group">
                    <i className="ri-user-line"></i>
                    <input type="text" placeholder="e.g. Aarav Rathi" />
                  </div>
                </div>
                <div className="student-form-input">
                  <label className="text-underheading" htmlFor="gender">
                    Gender
                  </label>
                  <div className="student-form-input-group">
                    <i className="ri-shining-line"></i>
                    <select>
                      <option disabled selected>
                        Select Gender
                      </option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="others">Others</option>
                    </select>
                  </div>
                </div>
                <div className="student-form-input">
                  <label className="text-underheading" htmlFor="reg_no">
                    Registration Number (Must be unique)
                  </label>
                  <div className="student-form-input-group">
                    <i className="ri-computer-line"></i>
                    <input type="Number" placeholder="e.g. 20251084" />
                  </div>
                </div>
                <div className="student-form-input">
                  <label className="text-underheading" htmlFor="reg_no">
                    Roll Number
                  </label>
                  <div className="student-form-input-group">
                    <i className="ri-tv-2-line"></i>
                    <input type="Number" placeholder="e.g. 432" />
                  </div>
                </div>
                <div className="student-form-input">
                  <label className="text-underheading" htmlFor="reg_no">
                    Student Email
                  </label>
                  <div className="student-form-input-group">
                    <i className="ri-mail-line"></i>
                    <input type="email" placeholder="e.g. student@gmail.com" />
                  </div>
                </div>
                <div className="student-form-input">
                  <label className="text-underheading" htmlFor="reg_no">
                    Student Contact
                  </label>
                  <div className="student-form-input-group">
                    <i className="ri-phone-line"></i>
                    <input type="Number" placeholder="e.g. 9876543210" />
                  </div>
                </div>
                <div className="student-form-input">
                  <label className="text-underheading" htmlFor="reg_no">
                    Admission Date
                  </label>
                  <div className="student-form-input-group">
                    <i className="ri-calendar-line"></i>
                    <input type="date" placeholder="e.g. 9876543210" />
                  </div>
                </div>
                <div className="student-form-input">
                  <label className="text-underheading" htmlFor="reg_no">
                    Date Of Birth
                  </label>
                  <div className="student-form-input-group">
                    <i className="ri-calendar-line"></i>
                    <input type="date" />
                  </div>
                </div>

              
                <button className="primary-btn">
                  Continue to Class & Address
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddStudent;
