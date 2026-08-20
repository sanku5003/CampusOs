const GuardianForm = ({
  guardians,
  guardianType,
  guardianForms,
  selectedGuardian,
  errorMessage,
  onGuardianChange,
  onFieldChange,
  onBack,
  onSubmit,
}) => {
  const selectedParent = guardians[guardianType];

  return (
    <div>
      <h4 className="text-white font-bold mt-1">
        Parent / Guardian Information
      </h4>
      <p className="text-underheading">
        Provide parent or guardian details for communication and records.
      </p>
      <div className="guardian-tabs">
        {Object.entries(guardianForms).map(([type, guardian]) => (
          <button
            key={type}
            type="button"
            className={`guardian-tab ${guardianType === type ? "guardian-tab-active" : ""}`}
            onClick={() => onGuardianChange(type)}
          >
            <i className={guardian.icon}></i> {guardian.label}
          </button>
        ))}
      </div>
      <p className="text-[#06b6d4] text-[10px] mt-6">
        {selectedGuardian.heading}
      </p>
      <hr className="mt-2 text-[#4a494980]" />
      <form className="student-form" onSubmit={onSubmit}>
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
              onChange={onFieldChange}
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
              onChange={onFieldChange}
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
              onChange={onFieldChange}
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
              onChange={onFieldChange}
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
              onChange={onFieldChange}
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
              onChange={onFieldChange}
              placeholder="e.g. Software Engineer, Doctor, Teacher"
            />
          </div>
          {errorMessage("profession")}
        </div>
        <div className="w-full flex justify-between items-center mt-5">
          <button type="button" className="sec-btn text-sm" onClick={onBack}>
            <i className="ri-arrow-left-wide-line"></i> Back
          </button>
          <button type="submit" className="primary-btn">
            Review &amp; Submit <i className="ri-arrow-right-wide-line"></i>
          </button>
        </div>
      </form>
    </div>
  );
};

export default GuardianForm;
