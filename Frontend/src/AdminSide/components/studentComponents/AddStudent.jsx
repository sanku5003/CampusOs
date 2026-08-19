import { useEffect, useMemo, useState } from "react";
import "../../styles/dashboard.css";
import "remixicon/fonts/remixicon.css";
import { useClasses } from "../../hooks/useClasses";
import { useStudents } from "../../hooks/useStudents";

const initialStudentData = {
  student_name: "",
  gender: "",
  reg_no: "",
  roll_no: "",
  email: "",
  contact: "",
  admission_date: "",
  dob: "",
  class_val: "",
  sec: "",
  fullAddress: "",
  city: "",
  state_living: "",
  pincode: "",
};

const initialParentData = {
  parent_name: "",
  relation: "father",
  email: "",
  contact: "",
  education: "",
  profession: "",
};

const initialGuardians = {
  primary: { ...initialParentData },
  secondary: { ...initialParentData, relation: "mother" },
  other: { ...initialParentData, relation: "guardian" },
};

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

const AddStudent = (props) => {
  const { getClasses, classes } = useClasses();
  const { addStudent, addParent } = useStudents();
  const [currForm, setCurrForm] = useState(1);
  const [guardianType, setGuardianType] = useState("primary");
  const [studentData, setStudentData] = useState(initialStudentData);
  const [parentData, setParentData] = useState(initialGuardians);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    getClasses();
  }, []);

  const uniqueClasses = useMemo(
    () => [...new Set(classes.map((item) => item.class))],
    [classes],
  );
  const uniqueSections = useMemo(
    () => [...new Set(classes.map((item) => item.section))],
    [classes],
  );
  const selectedGuardian = guardianForms[guardianType];
  const selectedParent = parentData[guardianType];

  const updateStudent = (event) => {
    const { name, value } = event.target;
    setStudentData((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
  };

  const updateParent = (event) => {
    const { name, value } = event.target;
    setParentData((current) => ({
      ...current,
      [guardianType]: { ...current[guardianType], [name]: value },
    }));
    setErrors((current) => ({ ...current, [name]: "" }));
  };

  const validate = (fields, parentType = guardianType) => {
    const nextErrors = {};
    fields.forEach(({ name, label, scope }) => {
      const value =
        scope === "parent"
          ? parentData[parentType][name]
          : (studentData[name] ?? "");
      if (!String(value).trim()) nextErrors[name] = `${label} is required.`;
    });
    const emailField = fields.find(({ name }) => name === "email");
    if (emailField) {
      const email =
        emailField.scope === "parent"
          ? parentData[parentType].email
          : studentData.email;
      if (email && !/^\S+@\S+\.\S+$/.test(email))
        nextErrors.email = "Enter a valid email address.";
    }
    const contactField = fields.find(({ name }) => name === "contact");
    if (contactField) {
      const contact =
        contactField.scope === "parent"
          ? parentData[parentType].contact
          : studentData.contact;
      if (contact && !/^\+?[0-9\s-]{10,15}$/.test(contact))
        nextErrors.contact = "Enter a valid contact number.";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const studentFields = [
    ["student_name", "Full name"],
    ["gender", "Gender"],
    ["reg_no", "Registration number"],
    ["roll_no", "Roll number"],
    ["email", "Student email"],
    ["contact", "Student contact"],
    ["admission_date", "Admission date"],
    ["dob", "Date of birth"],
  ].map(([name, label]) => ({ name, label, scope: "student" }));
  const addressFields = [
    ["class_val", "Class"],
    ["sec", "Section"],
    ["fullAddress", "Full address"],
    ["city", "City"],
    ["state_living", "State"],
    ["pincode", "Pincode"],
  ].map(([name, label]) => ({ name, label, scope: "student" }));
  const parentFields = [
    ["parent_name", "Full name"],
    ["relation", "Relation"],
    ["email", "Email"],
    ["contact", "Contact"],
    ["education", "Education"],
    ["profession", "Profession / occupation"],
  ].map(([name, label]) => ({ name, label, scope: "parent" }));

  const hasParentData = (type) =>
    Object.entries(parentData[type]).some(
      ([name, value]) =>
        name !== "relation" && value && value.trim() !== "",
    );

  const parentStepSubmit = (event) => {
    event.preventDefault();
    const isPrimary = guardianType === "primary";
    const isOptionalAndEmpty = !isPrimary && !hasParentData(guardianType);
    const isValid = isOptionalAndEmpty || validate(parentFields, guardianType);

    if (isValid) {
      setSubmitError("");
      setCurrForm(4);
    }
  };

  const goToStep = (event, nextStep, fields) => {
    event.preventDefault();
    if (validate(fields)) {
      setSubmitError("");
      setCurrForm(nextStep);
    }
  };

  const submitAdmission = async () => {
    setSubmitError("");
    const primaryValid = validate(parentFields, "primary");
    const optionalTypes = ["secondary", "other"].filter((type) =>
      hasParentData(type),
    );
    const optionalValid = optionalTypes.every((type) =>
      validate(parentFields, type),
    );
    if (
      !validate([...studentFields, ...addressFields]) ||
      !primaryValid ||
      !optionalValid
    )
      return;
    setSubmitting(true);
    try {
      const student = await addStudent({
        ...studentData,
        reg_no: Number(studentData.reg_no),
        roll_no: Number(studentData.roll_no),
        pincode: Number(studentData.pincode),
      });
      const parentsToSubmit = ["primary", ...optionalTypes];
      await Promise.all(
        parentsToSubmit.map((type) =>
          addParent({ ...parentData[type], student_id: student.student_id }),
        ),
      );
      props.setCurrPage("student-list");
    } catch (error) {
      setSubmitError(
        error.response?.data?.message ||
          "Admission could not be submitted. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const errorMessage = (name) =>
    errors[name] && <p className="form-error">{errors[name]}</p>;
  const studentInput = (name, label, type = "text", placeholder = "") => (
    <div className="student-form-input" key={name}>
      <label className="text-underheading" htmlFor={name}>
        {label}
      </label>
      <div className="student-form-input-group">
        <i className="ri-user-line"></i>
        <input
          id={name}
          name={name}
          type={type}
          value={studentData[name]}
          onChange={updateStudent}
          placeholder={placeholder}
        />
      </div>
      {errorMessage(name)}
    </div>
  );
  const reviewValue = (value) => value || "Not provided";

  const reviewSections = [
    {
      title: "Student Details",
      icon: "ri-user-line",
      step: 1,
      values: [
        ["Full name", studentData.student_name],
        ["Gender", studentData.gender],
        ["Reg. number", studentData.reg_no],
        ["Roll number", studentData.roll_no],
        ["Email", studentData.email],
        ["Contact", studentData.contact],
        ["Admission date", studentData.admission_date],
        ["Date of birth", studentData.dob],
      ],
    },
    {
      title: "Class & Address",
      icon: "ri-graduation-cap-line",
      step: 2,
      values: [
        ["Class", studentData.class_val],
        ["Section", studentData.sec],
        ["Full address", studentData.fullAddress],
        ["City", studentData.city],
        ["State", studentData.state_living],
        ["Pincode", studentData.pincode],
      ],
    },
    ...Object.entries(guardianForms)
      .filter(([type]) => type === "primary" || hasParentData(type))
      .map(([type, guardian]) => ({
        title: guardian.label,
        icon: guardian.icon,
        step: 3,
        values: [
          ["Parent name", parentData[type].parent_name],
          ["Relation", parentData[type].relation],
          ["Email", parentData[type].email],
          ["Contact", parentData[type].contact],
          ["Education", parentData[type].education],
          ["Profession", parentData[type].profession],
        ],
      })),
  ];

  return (
    <div className="w-full h-full">
      <div className="flex justify-between w-full items-center">
        <button
          className="sec-btn text-sm"
          onClick={() => props.setCurrPage("student-list")}
        >
          <i className="ri-arrow-left-s-line"></i> Back To Students
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
            {[
              "Student Details",
              "Class & Address",
              "Parent/Guardian",
              "Review & Submit",
            ].map((title, index) => (
              <div key={title}>
                <div className="form-steps">
                  <div
                    className={`form-step-circle ${currForm === index + 1 ? "active" : currForm > index + 1 ? "completed-step" : ""}`}
                  >
                    {currForm > index + 1 ? (
                      <i className="ri-check-line text-white"></i>
                    ) : (
                      <i
                        className={
                          index === 0
                            ? "ri-user-line"
                            : index === 1
                              ? "ri-graduation-cap-line"
                              : index === 2
                                ? "ri-group-line"
                                : "ri-checkbox-multiple-line"
                        }
                      ></i>
                    )}
                  </div>
                  <div className="form-step-text">
                    <h6 className="text-white text-sm font-semibold">
                      {title}
                    </h6>
                    <p className="text-underheading">
                      {index === 0
                        ? "Name, gender, contact, reg no"
                        : index === 1
                          ? "Class, section, address info"
                          : index === 2
                            ? "Parent info, relation"
                            : "Confirm all details"}
                    </p>
                  </div>
                </div>
                {index < 3 && (
                  <div
                    className={`step-line ${currForm > index + 1 ? "step-line-active" : ""}`}
                  ></div>
                )}
              </div>
            ))}
            <div className="progress-bar">
              <div className="flex justify-between">
                <p className="text-underheading">Progress</p>
                <p className="text-underheading">
                  {((currForm - 1) / 4) * 100}%
                </p>
              </div>
              <div className="w-full bg-[#fbfbfb34] h-1 rounded mt-1 p-0 overflow-hidden">
                <div
                  className="h-full bg-linear-to-br from-[#7c3aed] to-[#06b6d4]"
                  style={{ width: `${((currForm - 1) / 4) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="form-content">
          <div className="tag">STEP {currForm} OF 4</div>
          {currForm === 1 && (
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
                onSubmit={(event) => goToStep(event, 2, studentFields)}
              >
                {studentInput(
                  "student_name",
                  "Full name",
                  "text",
                  "e.g. Aarav Rathi",
                )}
                <div className="student-form-input">
                  <label className="text-underheading" htmlFor="gender">
                    Gender
                  </label>
                  <div className="student-form-input-group">
                    <i className="ri-shining-line"></i>
                    <select
                      id="gender"
                      name="gender"
                      value={studentData.gender}
                      onChange={updateStudent}
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="others">Others</option>
                    </select>
                  </div>
                  {errorMessage("gender")}
                </div>
                {studentInput(
                  "reg_no",
                  "Registration number",
                  "number",
                  "e.g. 20251084",
                )}
                {studentInput("roll_no", "Roll number", "number", "e.g. 432")}
                {studentInput(
                  "email",
                  "Student email",
                  "email",
                  "e.g. student@gmail.com",
                )}
                {studentInput(
                  "contact",
                  "Student contact",
                  "tel",
                  "e.g. 9876543210",
                )}
                {studentInput("admission_date", "Admission date", "date")}
                {studentInput("dob", "Date of birth", "date")}
                <button type="submit" className="primary-btn">
                  Continue to Class &amp; Address
                </button>
              </form>
            </div>
          )}

          {currForm === 2 && (
            <div>
              <h4 className="text-white font-bold mt-1">
                Class &amp; Address Details
              </h4>
              <p className="text-underheading">
                Assign the student to a class and provide the residential
                address.
              </p>
              <p className="text-[#06b6d4] text-[10px] mt-4">
                CLASS INFORMATION
              </p>
              <hr className="mt-2 text-[#4a494980]" />
              <form
                className="student-form"
                onSubmit={(event) => goToStep(event, 3, addressFields)}
              >
                <div className="student-form-input">
                  <label className="text-underheading" htmlFor="class_val">
                    Class
                  </label>
                  <div className="student-form-input-group">
                    <i className="ri-graduation-cap-line"></i>
                    <select
                      id="class_val"
                      name="class_val"
                      value={studentData.class_val}
                      onChange={updateStudent}
                    >
                      <option value="">Select class</option>
                      {uniqueClasses.map((value) => (
                        <option value={value} key={value}>
                          Class {value}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errorMessage("class_val")}
                </div>
                <div className="student-form-input">
                  <label className="text-underheading" htmlFor="sec">
                    Section
                  </label>
                  <div className="student-form-input-group">
                    <i className="ri-dashboard-horizontal-line"></i>
                    <select
                      id="sec"
                      name="sec"
                      value={studentData.sec}
                      onChange={updateStudent}
                    >
                      <option value="">Select section</option>
                      {uniqueSections.map((value) => (
                        <option value={value} key={value}>
                          Section {value}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errorMessage("sec")}
                </div>
                <div className="student-form-textarea">
                  <label className="text-underheading" htmlFor="fullAddress">
                    Full address
                  </label>
                  <div className="student-form-input-group">
                    <i className="ri-map-pin-line"></i>
                    <textarea
                      id="fullAddress"
                      name="fullAddress"
                      value={studentData.fullAddress}
                      onChange={updateStudent}
                      placeholder="House No, Street, Area, Landmark..."
                    ></textarea>
                  </div>
                  {errorMessage("fullAddress")}
                </div>
                {studentInput("city", "City", "text", "e.g. Pune")}
                <div className="student-form-input">
                  <label className="text-underheading" htmlFor="state_living">
                    State
                  </label>
                  <div className="student-form-input-group">
                    <i className="ri-send-plane-line"></i>
                    <select
                      id="state_living"
                      name="state_living"
                      value={studentData.state_living}
                      onChange={updateStudent}
                    >
                      <option value="">Select state</option>
                      {[
                        "Andhra Pradesh",
                        "Bihar",
                        "Delhi",
                        "Gujarat",
                        "Haryana",
                        "Karnataka",
                        "Kerala",
                        "Madhya Pradesh",
                        "Maharashtra",
                        "Punjab",
                        "Rajasthan",
                        "Tamil Nadu",
                        "Telangana",
                        "Uttar Pradesh",
                        "West Bengal",
                      ].map((value) => (
                        <option value={value} key={value}>
                          {value}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errorMessage("state_living")}
                </div>
                {studentInput("pincode", "Pincode", "number", "e.g. 255245")}
                <div className="w-full flex justify-between items-center">
                  <button
                    type="button"
                    className="sec-btn text-sm"
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

          {currForm === 3 && (
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
                    className={`guardian-tab ${guardianType === type ? "guardian-tab-active" : ""}`}
                    onClick={() => {
                      setGuardianType(type);
                      setParentData((current) => ({
                        ...current,
                        [type]: { ...current[type], relation: guardian.relation },
                      }));
                    }}
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
                className="student-form"
                onSubmit={parentStepSubmit}
              >
                <div className="student-form-input">
                  <label className="text-underheading" htmlFor="parent_name">
                    Full name
                  </label>
                  <div className="student-form-input-group">
                    <i className="ri-user-line"></i>
                    <input
                      id="parent_name"
                      name="parent_name"
                      value={selectedParent.parent_name}
                      onChange={updateParent}
                      placeholder="e.g. Suresh Rathi"
                    />
                  </div>
                  {errorMessage("parent_name")}
                </div>
                <div className="student-form-input">
                  <label className="text-underheading" htmlFor="relation">
                    Relation
                  </label>
                  <div className="student-form-input-group">
                    <i className="ri-user-line"></i>
                    <select
                      id="relation"
                      name="relation"
                      value={selectedParent.relation}
                      onChange={updateParent}
                    >
                      <option value="father">Father</option>
                      <option value="mother">Mother</option>
                      <option value="guardian">Guardian</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  {errorMessage("relation")}
                </div>
                <div className="student-form-input">
                  <label className="text-underheading" htmlFor="parent_email">
                    Email
                  </label>
                  <div className="student-form-input-group">
                    <i className="ri-mail-line"></i>
                    <input
                      id="parent_email"
                      name="email"
                      type="email"
                      value={selectedParent.email}
                      onChange={updateParent}
                      placeholder="parent@email.com"
                    />
                  </div>
                  {errorMessage("email")}
                </div>
                <div className="student-form-input">
                  <label className="text-underheading" htmlFor="parent_contact">
                    Contact
                  </label>
                  <div className="student-form-input-group">
                    <i className="ri-phone-line"></i>
                    <input
                      id="parent_contact"
                      name="contact"
                      type="tel"
                      value={selectedParent.contact}
                      onChange={updateParent}
                      placeholder="+91-9876543210"
                    />
                  </div>
                  {errorMessage("contact")}
                </div>
                <div className="student-form-input">
                  <label className="text-underheading" htmlFor="education">
                    Education
                  </label>
                  <div className="student-form-input-group">
                    <i className="ri-graduation-cap-line"></i>
                    <select
                      id="education"
                      name="education"
                      value={selectedParent.education}
                      onChange={updateParent}
                    >
                      <option value="">Select qualification</option>
                      <option value="secondary">Secondary School</option>
                      <option value="higher_secondary">Higher Secondary</option>
                      <option value="graduate">Graduate</option>
                      <option value="postgraduate">Postgraduate</option>
                      <option value="doctorate">Doctorate</option>
                    </select>
                  </div>
                  {errorMessage("education")}
                </div>
                <div className="student-form-input">
                  <label className="text-underheading" htmlFor="profession">
                    Profession / Occupation
                  </label>
                  <div className="student-form-input-group">
                    <i className="ri-briefcase-line"></i>
                    <input
                      id="profession"
                      name="profession"
                      value={selectedParent.profession}
                      onChange={updateParent}
                      placeholder="e.g. Software Engineer, Doctor, Teacher"
                    />
                  </div>
                  {errorMessage("profession")}
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
                    Review &amp; Submit{" "}
                    <i className="ri-arrow-right-wide-line"></i>
                  </button>
                </div>
              </form>
            </div>
          )}

          {currForm === 4 && (
            <div className="review-panel">
              <h4 className="text-white font-bold mt-1">Review &amp; Submit</h4>
              <p className="text-underheading">
                Confirm the admission details before submitting the application.
              </p>
              {reviewSections.map((section) => (
                <section className="review-card" key={section.title}>
                  <div className="review-card-heading">
                    <h5>
                      <i className={section.icon}></i>
                      {section.title}
                    </h5>
                    <button
                      type="button"
                      onClick={() => setCurrForm(section.step)}
                    >
                      Edit
                    </button>
                  </div>
                  <div className="review-grid">
                    {section.values.map(([label, value]) => (
                      <div key={label}>
                        <p>{label}</p>
                        <strong>{reviewValue(value)}</strong>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
              <label className="review-confirm">
                <input
                  type="checkbox"
                  checked={confirmed}
                  onChange={(event) => {
                    setConfirmed(event.target.checked);
                    setSubmitError("");
                  }}
                />{" "}
                I confirm that all information provided is accurate and
                complete.
              </label>
              {submitError && (
                <p className="form-submit-error">{submitError}</p>
              )}
              <div className="w-full flex justify-between items-center mt-5">
                <button
                  type="button"
                  className="sec-btn text-sm"
                  onClick={() => setCurrForm(3)}
                >
                  <i className="ri-arrow-left-wide-line"></i> Back
                </button>
                <button
                  type="button"
                  className="primary-btn"
                  disabled={submitting}
                  onClick={() => {
                    if (confirmed) submitAdmission();
                    else
                      setSubmitError(
                        "Please confirm that the information is accurate and complete.",
                      );
                  }}
                >
                  {submitting ? "Submitting..." : "Submit Admission"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddStudent;
