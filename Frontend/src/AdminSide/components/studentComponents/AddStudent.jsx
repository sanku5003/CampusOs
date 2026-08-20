import { useEffect, useMemo, useState } from "react";
import "../../styles/dashboard.css";
import "remixicon/fonts/remixicon.css";
import { useClasses } from "../../hooks/useClasses";
import { useStudents } from "../../hooks/useStudents";
import AdmissionProgress from "./AdmissionProgress";
import StudentDetailsForm from "./StudentDetailsForm";
import ClassAddressForm from "./ClassAddressForm";
import GuardianForm from "./GuardianForm";
import ReviewSubmit from "./ReviewSubmit";

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
  const selectGuardian = (type) => {
    setGuardianType(type);
    setParentData((current) => ({
      ...current,
      [type]: { ...current[type], relation: guardianForms[type].relation },
    }));
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
    const email = emailField
      ? emailField.scope === "parent"
        ? parentData[parentType].email
        : studentData.email
      : "";
    if (email && !/^\S+@\S+\.\S+$/.test(email))
      nextErrors.email = "Enter a valid email address.";
    const contactField = fields.find(({ name }) => name === "contact");
    const contact = contactField
      ? contactField.scope === "parent"
        ? parentData[parentType].contact
        : studentData.contact
      : "";
    if (contact && !/^\+?[0-9\s-]{10,15}$/.test(contact))
      nextErrors.contact = "Enter a valid contact number.";
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
      ([name, value]) => name !== "relation" && value && value.trim() !== "",
    );
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
  const goToStep = (event, nextStep, fields) => {
    event.preventDefault();
    if (validate(fields)) {
      setSubmitError("");
      setCurrForm(nextStep);
    }
  };
  const parentStepSubmit = (event) => {
    event.preventDefault();
    const valid =
      (guardianType !== "primary" && !hasParentData(guardianType)) ||
      validate(parentFields, guardianType);
    if (valid) {
      setSubmitError("");
      setCurrForm(4);
    }
  };
  const submitAdmission = async () => {
    setSubmitError("");
    const primaryValid = validate(parentFields, "primary");
    const optionalTypes = ["secondary", "other"].filter(hasParentData);
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
      await Promise.all(
        ["primary", ...optionalTypes].map((type) =>
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
        <AdmissionProgress currentStep={currForm} />
        <div className="form-content">
          <div className="tag">STEP {currForm} OF 4</div>
          {currForm === 1 && (
            <StudentDetailsForm
              data={studentData}
              studentInput={studentInput}
              errorMessage={errorMessage}
              onChange={updateStudent}
              onSubmit={(event) => goToStep(event, 2, studentFields)}
            />
          )}
          {currForm === 2 && (
            <ClassAddressForm
              data={studentData}
              classes={uniqueClasses}
              sections={uniqueSections}
              studentInput={studentInput}
              errorMessage={errorMessage}
              onChange={updateStudent}
              onBack={() => setCurrForm(1)}
              onSubmit={(event) => goToStep(event, 3, addressFields)}
            />
          )}
          {currForm === 3 && (
            <GuardianForm
              guardians={parentData}
              guardianType={guardianType}
              guardianForms={guardianForms}
              selectedGuardian={selectedGuardian}
              errorMessage={errorMessage}
              onGuardianChange={selectGuardian}
              onFieldChange={updateParent}
              onBack={() => setCurrForm(2)}
              onSubmit={parentStepSubmit}
            />
          )}
          {currForm === 4 && (
            <ReviewSubmit
              sections={reviewSections}
              confirmed={confirmed}
              submitting={submitting}
              submitError={submitError}
              onConfirm={(event) => {
                setConfirmed(event.target.checked);
                setSubmitError("");
              }}
              onEdit={setCurrForm}
              onBack={() => setCurrForm(3)}
              onSubmit={() => {
                if (confirmed) submitAdmission();
                else
                  setSubmitError(
                    "Please confirm that the information is accurate and complete.",
                  );
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AddStudent;
