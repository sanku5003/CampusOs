import React, { useEffect, useMemo, useState } from "react";
import "../../styles/dashboard.css";
import "remixicon/fonts/remixicon.css";
import { useClasses } from "../../hooks/useClasses";
const AddStudent = (props) => {
  const { getClasses, loading, classes } = useClasses();

  const [currForm, setCurrForm] = useState(1);
  const [guardianType, setGuardianType] = useState("primary");

  const guardianForms = {
    primary: {
      label: "Father / Primary",
      heading: "PRIMARY GUARDIAN DETAILS",
      relation: "father",
      icon: "ri-user-line",
    },
    secondary: {
      label: "Mother / Secondary",
      heading: "SECONDARY GUARDIAN DETAILS",
      relation: "mother",
      icon: "ri-user-line",
    },
    other: {
      label: "Guardian / Other",
      heading: "OTHER GUARDIAN DETAILS",
      relation: "guardian",
      icon: "ri-group-line",
    },
  };

  const selectedGuardian = guardianForms[guardianType];

  useEffect(() => {
    getClasses();
  }, []);

  const uniqueClasses = useMemo(() => {
    return [...new Set(classes.map((item) => item.class))];
  }, [classes]);

  const uniqueSections = useMemo(() => {
    return [...new Set(classes.map((item) => item.section))];
  }, [classes]);

  const studentDetailsFormHandler = (e) => {
    e.preventDefault();
    setCurrForm(2);
  };

  const classAddressFormHandler = (e) => {
    e.preventDefault();
    setCurrForm(3);
  };

  const parentDetailsFormHandler = (e) => {
    e.preventDefault();
    setCurrForm(4);
  };

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
              <div
                className={
                  currForm == 1
                    ? "form-step-circle active"
                    : currForm != 1 && "form-step-circle completed-step"
                }
              >
                {currForm == 1 && <i className="ri-user-line"></i>}
                {currForm != 1 && <i className="ri-check-line text-white"></i>}
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
            <div
              className={
                currForm > 1 ? "step-line step-line-active" : "step-line"
              }
            ></div>
            <div className="form-steps">
              <div
                className={
                  currForm == 2
                    ? "form-step-circle active"
                    : currForm > 2
                      ? "form-step-circle completed-step"
                      : "form-step-circle"
                }
              >
                {currForm <= 2 && <i className="ri-graduation-cap-line"></i>}
                {currForm > 2 && <i className="ri-check-line text-white"></i>}
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
            <div
              className={
                currForm > 2 ? "step-line step-line-active" : "step-line"
              }
            ></div>
            <div className="form-steps">
              <div
                className={
                  currForm == 3
                    ? "form-step-circle active"
                    : currForm > 3
                      ? "form-step-circle completed-step"
                      : "form-step-circle"
                }
              >
                {currForm <= 3 && <i className="ri-group-line"></i>}
                {currForm > 3 && <i className="ri-check-line text-white"></i>}
              </div>
              <div className="form-step-text">
                <h6 className="text-white text-sm font-semibold">
                  Parent/Guardian
                </h6>
                <p className="text-underheading">Parent Info , relation</p>
              </div>
            </div>
            <div
              className={
                currForm > 3 ? "step-line step-line-active" : "step-line"
              }
            ></div>
            <div className="form-steps">
              <div
                className={
                  currForm == 4
                    ? "form-step-circle active"
                    : currForm > 4
                      ? "form-step-circle completed-step"
                      : "form-step-circle"
                }
              >
                {currForm <= 4 && <i className="ri-checkbox-multiple-line"></i>}
                {currForm > 4 && <i className="ri-check-line text-white"></i>}
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
          {currForm <= 4 && <div className="tag">STEP {currForm} OF 4</div>}

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

              <form
                className="student-form"
                onSubmit={(e) => studentDetailsFormHandler(e)}
              >
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

          {currForm == 2 && (
            <div>
              <h4 className="text-white font-bold mt-1">
                Class & Address Details
              </h4>
              <p className="text-underheading">
                Assign the student to a class and provide the residential
                address.
              </p>

              <p className="text-[#06b6d4] text-[10px] mt-4">
                PERSONAL INFORMATION
              </p>

              <hr className="mt-2 text-[#4a494980]" />

              <form
                className="student-form"
                onSubmit={(e) => classAddressFormHandler(e)}
              >
                <div className="student-form-input">
                  <label className="text-underheading" htmlFor="class">
                    Class
                  </label>
                  <div className="student-form-input-group">
                    <i className="ri-graduation-cap-line"></i>
                    <select>
                      <option disabled selected>
                        Select Class
                      </option>
                      {uniqueClasses.map((classData, idx) => (
                        <option value={classData} key={idx}>
                          Class {classData}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="student-form-input">
                  <label className="text-underheading" htmlFor="section">
                    Section
                  </label>
                  <div className="student-form-input-group">
                    <i className="ri-dashboard-horizontal-line"></i>
                    <select>
                      <option disabled selected>
                        Select Class
                      </option>
                      {uniqueSections.map((classData, idx) => (
                        <option value={classData} key={idx}>
                          Section {classData}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <p className="text-[#06b6d4] text-[10px] mt-4">
                  RESEDENTIAL ADDRESS
                </p>
                <br />
                <hr className="mt-2 text-[#4a494980] w-full" />

                <div className="student-form-textarea ">
                  <label className="text-underheading" htmlFor="student_name">
                    Full Address
                  </label>
                  <div className="student-form-input-group">
                    <i className="ri-map-pin-line"></i>
                    <textarea
                      className="w-full"
                      placeholder="House No , Street , Area , Landmark..."
                    ></textarea>
                  </div>
                </div>
                <div className="student-form-input">
                  <label className="text-underheading" htmlFor="city">
                    City
                  </label>
                  <div className="student-form-input-group">
                    <i className="ri-building-2-line"></i>
                    <input type="text" placeholder="e.g. Pune" />
                  </div>
                </div>

                <div className="student-form-input">
                  <label className="text-underheading" htmlFor="section">
                    State
                  </label>
                  <div className="student-form-input-group">
                    <i className="ri-send-plane-line"></i>
                    <select
                      id="State"
                      type="Select"
                      className="input-field w-full py-2 px-3"
                    >
                      <option value="" disabled>
                        Select State
                      </option>

                      <option value="Andhra Pradesh">Andhra Pradesh</option>
                      <option value="Arunachal Pradesh">
                        Arunachal Pradesh
                      </option>
                      <option value="Assam">Assam</option>
                      <option value="Bihar">Bihar</option>
                      <option value="Chhattisgarh">Chhattisgarh</option>
                      <option value="Goa">Goa</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="Haryana">Haryana</option>
                      <option value="Himachal Pradesh">Himachal Pradesh</option>
                      <option value="Jharkhand">Jharkhand</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Kerala">Kerala</option>
                      <option value="Madhya Pradesh">Madhya Pradesh</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Manipur">Manipur</option>
                      <option value="Meghalaya">Meghalaya</option>
                      <option value="Mizoram">Mizoram</option>
                      <option value="Nagaland">Nagaland</option>
                      <option value="Odisha">Odisha</option>
                      <option value="Punjab">Punjab</option>
                      <option value="Rajasthan">Rajasthan</option>
                      <option value="Sikkim">Sikkim</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Telangana">Telangana</option>
                      <option value="Tripura">Tripura</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                      <option value="Uttarakhand">Uttarakhand</option>
                      <option value="West Bengal">West Bengal</option>

                      <option value="Andaman and Nicobar Islands">
                        Andaman and Nicobar Islands
                      </option>
                      <option value="Chandigarh">Chandigarh</option>
                      <option value="Dadra and Nagar Haveli and Daman and Diu">
                        Dadra and Nagar Haveli and Daman and Diu
                      </option>
                      <option value="Delhi">Delhi (NCT)</option>
                      <option value="Jammu and Kashmir">
                        Jammu and Kashmir
                      </option>
                      <option value="Ladakh">Ladakh</option>
                      <option value="Lakshadweep">Lakshadweep</option>
                      <option value="Puducherry">Puducherry</option>
                    </select>
                  </div>
                </div>
                <div className="student-form-input">
                  <label className="text-underheading" htmlFor="pincode">
                    Pincode
                  </label>
                  <div className="student-form-input-group">
                    <i className="ri-bank-card-line"></i>
                    <input type="Number" placeholder="e.g.255245" />
                  </div>
                </div>

                <br />

                <div className="w-full flex justify-between items-center">
                  <button
                    type="button"
                    className="sec-btn text-sm mt-auto"
                    onClick={() => setCurrForm(1)}
                  >
                    <i className="ri-arrow-left-wide-line"></i> Back
                  </button>
                  <button type="submit" className="primary-btn">
                    Continue to Parent Info{" "}
                    <i className="ri-arrow-right-wide-line"></i>
                  </button>
                </div>
              </form>
            </div>
          )}

          {currForm == 3 && (
            <div>
              <h4 className="text-white font-bold mt-1">
                Parent / Guardian Information
              </h4>
              <p className="text-underheading">
                Provide parent or guardian details for communication and
                records.
              </p>

              <div className="guardian-tabs">
                {Object.entries(guardianForms).map(([type, guardian]) => (
                  <button
                    key={type}
                    type="button"
                    className={`guardian-tab ${
                      guardianType === type ? "guardian-tab-active" : ""
                    }`}
                    onClick={() => setGuardianType(type)}
                  >
                    <i className={guardian.icon}></i> {guardian.label}
                  </button>
                ))}
              </div>

              <p className="text-[#06b6d4] text-[10px] mt-6">
                {selectedGuardian.heading}
              </p>

              <hr className="mt-2 text-[#4a494980]" />

              <form
                key={guardianType}
                className="student-form"
                onSubmit={(e) => parentDetailsFormHandler(e)}
              >
                <div className="student-form-input">
                  <label className="text-underheading" htmlFor="parent_name">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <div className="student-form-input-group">
                    <i className="ri-user-line"></i>
                    <input
                      id="parent_name"
                      name="parent_name"
                      type="text"
                      placeholder="e.g. Suresh Rathi"
                      required
                    />
                  </div>
                </div>
                <div className="student-form-input">
                  <label className="text-underheading" htmlFor="relation">
                    Relation <span className="text-red-400">*</span>
                  </label>
                  <div className="student-form-input-group">
                    <i className="ri-user-line"></i>
                    <select
                      id="relation"
                      name="relation"
                      defaultValue={selectedGuardian.relation}
                      required
                    >
                      <option value="father">Father</option>
                      <option value="mother">Mother</option>
                      <option value="guardian">Guardian</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="student-form-input">
                  <label className="text-underheading" htmlFor="parent_email">
                    Email <span className="text-red-400">*</span>
                  </label>
                  <div className="student-form-input-group">
                    <i className="ri-mail-line"></i>
                    <input
                      id="parent_email"
                      name="email"
                      type="email"
                      placeholder="parent@email.com"
                      required
                    />
                  </div>
                </div>
                <div className="student-form-input">
                  <label className="text-underheading" htmlFor="parent_contact">
                    Contact <span className="text-red-400">*</span>
                  </label>
                  <div className="student-form-input-group">
                    <i className="ri-phone-line"></i>
                    <input
                      id="parent_contact"
                      name="contact"
                      type="tel"
                      placeholder="+91-9876543210"
                      required
                    />
                  </div>
                </div>
                <div className="student-form-input">
                  <label className="text-underheading" htmlFor="education">
                    Education <span className="text-red-400">*</span>
                  </label>
                  <div className="student-form-input-group">
                    <i className="ri-graduation-cap-line"></i>
                    <select id="education" name="education" defaultValue="" required>
                      <option value="" disabled>
                        Select qualification
                      </option>
                      <option value="secondary">Secondary School</option>
                      <option value="higher_secondary">Higher Secondary</option>
                      <option value="graduate">Graduate</option>
                      <option value="postgraduate">Postgraduate</option>
                      <option value="doctorate">Doctorate</option>
                    </select>
                  </div>
                </div>
                <div className="student-form-input">
                  <label className="text-underheading" htmlFor="profession">
                    Profession / Occupation <span className="text-red-400">*</span>
                  </label>
                  <div className="student-form-input-group">
                    <i className="ri-briefcase-line"></i>
                    <input
                      id="profession"
                      name="profession"
                      type="text"
                      placeholder="e.g. Software Engineer, Doctor, Teacher"
                      required
                    />
                  </div>
                </div>

                <div className="w-full flex justify-between items-center mt-5">
                  <button
                    type="button"
                    className="sec-btn text-sm"
                    onClick={() => setCurrForm(2)}
                  >
                    <i className="ri-arrow-left-wide-line"></i> Back
                  </button>
                  <button type="submit" className="primary-btn">
                    Review &amp; Submit <i className="ri-arrow-right-wide-line"></i>
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddStudent;
