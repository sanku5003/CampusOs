const AdmissionProgress = ({ currentStep }) => {
  const steps = [
    ["Student Details", "Name, gender, contact, reg no", "ri-user-line"],
    ["Class & Address", "Class, section, address info", "ri-graduation-cap-line"],
    ["Parent/Guardian", "Parent info, relation", "ri-group-line"],
    ["Review & Submit", "Confirm all details", "ri-checkbox-multiple-line"],
  ];

  return (
    <div className="form-progress">
      <h4 className="text-white font-bold text-md">Admission Wizard</h4>
      <p className="text-underheading">Complete all 4 Steps</p>
      <div className="relative">
        {steps.map(([title, description, icon], index) => (
          <div key={title}>
            <div className="form-steps">
              <div
                className={`form-step-circle ${currentStep === index + 1 ? "active" : currentStep > index + 1 ? "completed-step" : ""}`}
              >
                {currentStep > index + 1 ? (
                  <i className="ri-check-line text-white"></i>
                ) : (
                  <i className={icon}></i>
                )}
              </div>
              <div className="form-step-text">
                <h6 className="text-white text-sm font-semibold">{title}</h6>
                <p className="text-underheading">{description}</p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`step-line ${currentStep > index + 1 ? "step-line-active" : ""}`}
              ></div>
            )}
          </div>
        ))}
        <div className="progress-bar">
          <div className="flex justify-between">
            <p className="text-underheading">Progress</p>
            <p className="text-underheading">{((currentStep - 1) / 4) * 100}%</p>
          </div>
          <div className="w-full bg-[#fbfbfb34] h-1 rounded mt-1 p-0 overflow-hidden">
            <div
              className="h-full bg-linear-to-br from-[#7c3aed] to-[#06b6d4]"
              style={{ width: `${((currentStep - 1) / 4) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmissionProgress;