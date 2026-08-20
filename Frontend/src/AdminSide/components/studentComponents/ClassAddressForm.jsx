const ClassAddressForm = ({ data, classes, sections, studentInput, errorMessage, onChange, onBack, onSubmit }) => (
  <div>
    <h4 className="text-white font-bold mt-1">Class &amp; Address Details</h4>
    <p className="text-underheading">Assign the student to a class and provide the residential address.</p>
    <p className="text-[#06b6d4] text-[10px] mt-4">CLASS INFORMATION</p>
    <hr className="mt-2 text-[#4a494980]" />
    <form className="student-form" onSubmit={onSubmit}>
      <div className="student-form-input">
        <label className="text-underheading" htmlFor="class_val">Class</label>
        <div className="student-form-input-group"><i className="ri-graduation-cap-line"></i><select id="class_val" name="class_val" value={data.class_val} onChange={onChange}><option value="">Select class</option>{classes.map((value) => <option value={value} key={value}>Class {value}</option>)}</select></div>
        {errorMessage("class_val")}
      </div>
      <div className="student-form-input">
        <label className="text-underheading" htmlFor="sec">Section</label>
        <div className="student-form-input-group"><i className="ri-dashboard-horizontal-line"></i><select id="sec" name="sec" value={data.sec} onChange={onChange}><option value="">Select section</option>{sections.map((value) => <option value={value} key={value}>Section {value}</option>)}</select></div>
        {errorMessage("sec")}
      </div>
      <div className="student-form-textarea">
        <label className="text-underheading" htmlFor="fullAddress">Full address</label>
        <div className="student-form-input-group"><i className="ri-map-pin-line"></i><textarea id="fullAddress" name="fullAddress" value={data.fullAddress} onChange={onChange} placeholder="House No, Street, Area, Landmark..."></textarea></div>
        {errorMessage("fullAddress")}
      </div>
      {studentInput("city", "City", "text", "e.g. Pune")}
      <div className="student-form-input">
        <label className="text-underheading" htmlFor="state_living">State</label>
        <div className="student-form-input-group"><i className="ri-send-plane-line"></i><select id="state_living" name="state_living" value={data.state_living} onChange={onChange}><option value="">Select state</option>{["Andhra Pradesh", "Bihar", "Delhi", "Gujarat", "Haryana", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Punjab", "Rajasthan", "Tamil Nadu", "Telangana", "Uttar Pradesh", "West Bengal"].map((value) => <option value={value} key={value}>{value}</option>)}</select></div>
        {errorMessage("state_living")}
      </div>
      {studentInput("pincode", "Pincode", "number", "e.g. 255245")}
      <div className="w-full flex justify-between items-center"><button type="button" className="sec-btn text-sm" onClick={onBack}><i className="ri-arrow-left-wide-line"></i> Back</button><button type="submit" className="primary-btn">Continue to Parent Info <i className="ri-arrow-right-wide-line"></i></button></div>
    </form>
  </div>
);

export default ClassAddressForm;