const StudentDetailsForm = ({
  data,
  studentInput,
  errorMessage,
  onSubmit,
  onChange,
}) => (
  <div>
    <h4 className="text-white font-bold mt-1">Student Details</h4>
    <p className="text-underheading">
      Fill in the student's personal information as per official records.
    </p>
    <p className="text-[#06b6d4] text-[10px] mt-4">PERSONAL INFORMATION</p>
    <hr className="mt-2 text-[#4a494980]" />
    <form className="student-form" onSubmit={onSubmit}>
      {studentInput("student_name", "Full name", "text", "e.g. Aarav Rathi")}
      <div className="student-form-input">
        <label className="text-underheading" htmlFor="gender">
          Gender
        </label>
        <div className="student-form-input-group">
          <i className="ri-shining-line"></i>
          <select
            id="gender"
            name="gender"
            value={data.gender}
            onChange={onChange}
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>
        </div>
        {errorMessage("gender")}
      </div>
      {studentInput("reg_no", "Registration number", "number", "e.g. 20251084")}
      {studentInput("roll_no", "Roll number", "number", "e.g. 432")}
      {studentInput(
        "email",
        "Student email",
        "email",
        "e.g. student@gmail.com",
      )}
      {studentInput("contact", "Student contact", "tel", "e.g. 9876543210")}
      {studentInput("admission_date", "Admission date", "date")}
      {studentInput("dob", "Date of birth", "date")}
      <button type="submit" className="primary-btn">
        Continue to Class &amp; Address
      </button>
    </form>
  </div>
);

export default StudentDetailsForm;
