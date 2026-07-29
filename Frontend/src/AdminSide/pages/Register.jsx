import React, { useState } from "react";
import "../styles/register.css";
import "remixicon/fonts/remixicon.css";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth"
const Register = () => {
  const navigate = useNavigate();
  const {user , loading , handleRegister} = useAuth();
  const [currForm, setCurrForm] = useState(1);
  const [schoolName, setSchoolName] = useState("");
  const [principal, setPrincipal] = useState("");
  const [udiseCode, setUdiseCode] = useState();
  const [contact, setContact] = useState();
  const [fullAddress, setFullAddress] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [pincode, setPincode] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [agreeTandC, setAgreeTandC] = useState(false);

  // Validation error messages
  const [errSchoolName, setErrSchoolName] = useState("");
  const [errPrincipal, setErrPrincipal] = useState("");
  const [errUdise, setErrUdise] = useState("");
  const [errContact, setErrContact] = useState("");
  const [errAddress, setErrAddress] = useState("");
  const [errCity, setErrCity] = useState("");
  const [errState, setErrState] = useState("");
  const [errPincode, setErrPincode] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [errAgree, setErrAgree] = useState("");
  const [serverError, setServerError] = useState("");

  const prevPage = () => {
    setCurrForm(currForm - 1);
  };

  const submitHandlerForFirstForm = (e) => {
    e.preventDefault();
    setServerError("");
    // reset errors
    setErrSchoolName("");
    setErrPrincipal("");
    setErrUdise("");
    setErrContact("");

    let valid = true;
    if (!schoolName || schoolName.trim() === "") {
      setErrSchoolName("School name is required.");
      valid = false;
    }
    if (!principal || principal.trim() === "") {
      setErrPrincipal("Principal name is required.");
      valid = false;
    }
    const udiseVal = String(udiseCode || "").replace(/\D/g, "");
    if (!udiseVal || !/^\d{11}$/.test(udiseVal)) {
      setErrUdise("Valid 11-digit UDISE code is required.");
      valid = false;
    }
    const contactDigits = String(contact || "").replace(/\D/g, "");
    if (!contactDigits) {
      setErrContact("Valid contact number is required.");
      valid = false;
    } else if (contactDigits.length < 10) {
      setErrContact("Plz enter a valid contact number");
      valid = false;
    }

    if (valid) setCurrForm(2);
  };

  const submitHandlerForSecForm = (e) => {
    e.preventDefault();
    setServerError("");
    // reset errors
    setErrAddress("");
    setErrCity("");
    setErrState("");
    setErrPincode("");

    let valid = true;
    if (!fullAddress || fullAddress.trim() === "") {
      setErrAddress("Address is required.");
      valid = false;
    }
    if (!city || city.trim() === "") {
      setErrCity("City is required.");
      valid = false;
    }
    if (!state || String(state).trim() === "") {
      setErrState("State is required.");
      valid = false;
    }
    const pin = String(pincode || "").replace(/\D/g, "");
    if (!pin || !/^\d{6}$/.test(pin)) {
      setErrPincode("Valid 6-digit pincode is required.");
      valid = false;
    }

    if (valid) setCurrForm(3);
  };

  const submitHandlerForThirdForm = async (e) => {
    e.preventDefault();
    setServerError("");
    setErrEmail("");
    setErrPassword("");
    setErrAgree("");

    let valid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(String(email).toLowerCase())) {
      setErrEmail("Valid email address is required.");
      valid = false;
    }
    if (!password || String(password).length < 8) {
      setErrPassword("Password must be at least 8 characters.");
      valid = false;
    }
    if (!agreeTandC) {
      setErrAgree("You must agree to the Terms and Privacy Policy.");
      valid = false;
    }

    if (valid) {
      const schoolData = {
        schoolName,
        fullAddress,
        city,
        State_living: state,
        pincode,
        udiseCode,
        principal,
        email,
        contact,
        passcode: password,
      };

      const result = await handleRegister(schoolData);

      if (result.success) {
        navigate("/");
        return;
      }

      const message = result.message || "Registration failed";
      setServerError(message);

      if (/email/i.test(message)) {
        setErrEmail(message);
      } else if (/contact/i.test(message)) {
        setErrContact(message);
      } else if (/school|udise/i.test(message)) {
        setErrUdise(message);
      } else if (/password/i.test(message)) {
        setErrPassword(message);
      } else if (/agree|terms|privacy/i.test(message)) {
        setErrAgree(message);
      }
    }
  };

  return (
    <div className="bg-[#060b18] h-screen w-screen flex text-white">
      <div className="left">
        <div className="left-box">
          <div className="w-full p-0">
            <img
              className="w-35 mb-3"
              src="/Gemini_Generated_Image_lk6x0elk6x0elk6x-removebg-preview.png"
              alt="CampusOS"
            />
          </div>
          <div>
            <h1 className="text-3xl text-white font-bold">
              Get Started <br />
              in 3 Simple Steps
            </h1>
          </div>
          <p className="text-xs text-[#94a3b8]">
            Join 500+ schools already using CampusOS to streamline their <br />
            daily operations and improve academic outcomes.
          </p>

          <div className="step-overview">
            <div
              className={
                currForm == 1
                  ? "step-overview-block-active"
                  : "step-overview-block"
              }
            >
              <div className={currForm == 1 ? "active-step" : "completed-step"}>
                1
              </div>
              <div>
                <h3>School Information</h3>
                <p>Basic Details about your school</p>
              </div>
            </div>
            <div
              className={
                currForm != 1
                  ? "step-progress-line-completed"
                  : "step-progress-line"
              }
            ></div>
            <div
              className={
                currForm == 2
                  ? "step-overview-block-active"
                  : "step-overview-block"
              }
            >
              <div
                className={
                  currForm == 2
                    ? "active-step"
                    : currForm == 3
                      ? "completed-step"
                      : "step-block"
                }
              >
                2
              </div>
              <div>
                <h3>Location Details</h3>
                <p>Address , City , State and Pincode</p>
              </div>
            </div>
            <div
              className={
                currForm == 3
                  ? "step-progress-line-completed"
                  : "step-progress-line"
              }
            ></div>
            <div
              className={
                currForm == 3
                  ? "step-overview-block-active"
                  : "step-overview-block"
              }
            >
              <div className={currForm == 3 ? "active-step" : "step-block"}>
                3
              </div>
              <div>
                <h3>Account Setup</h3>
                <p>Login Credentials and Confirmation</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="right">
        <div className="register-form">
          <h1 className="text-2xl font-bold text-white">
            Register your school
          </h1>
          <p className="text-[#94a3b8]">
            Complete all 3 steps to create your account
          </p>

          {serverError && (
            <div className="auth-alert mt-3">
              <i className="ri-error-warning-line"></i>
              <span>{serverError}</span>
            </div>
          )}

          <div className="step">
            <div className={currForm == 1 ? "active-step" : "completed-step"}>
              {currForm == 1 ? "1" : <span>&#10003;</span>}
            </div>
            <div
              className={currForm != 1 ? "step-line-active" : "step-line"}
            ></div>
            <div
              className={
                currForm == 2
                  ? "active-step"
                  : currForm == 3
                    ? "completed-step"
                    : "step-block"
              }
            >
              {currForm == 3 ? <span>&#10003;</span> : "2"}
            </div>
            <div
              className={currForm == 3 ? "step-line-active" : "step-line"}
            ></div>
            <div className={currForm == 3 ? "active-step" : "step-block"}>
              3
            </div>
          </div>
          {currForm == "1" && (
            <form className="login-form" onSubmit={submitHandlerForFirstForm}>
              <div className="form-1">
                <div>
                  {" "}
                  <h4 className="text-xs uppercase text-[#06b6d4] font-semibold mb-0">
                    School Information
                  </h4>
                  <hr className="mt-1 h-0.1 text-[#06b6d4]" />
                </div>

                <div className="login-field">
                  <label
                    className=" text-[#94a3b8] font-semibold text-[0.7rem]  block"
                    htmlFor="schoolName"
                  >
                    School Name
                  </label>
                  <div className="relative">
                    <span className="input-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M19 21H5C4.44772 21 4 20.5523 4 20V11L1 11L11.3273 1.6115C11.7087 1.26475 12.2913 1.26475 12.6727 1.6115L23 11L20 11V20C20 20.5523 19.5523 21 19 21ZM13 19H18V9.15745L12 3.7029L6 9.15745V19H11V13H13V19Z"></path>
                      </svg>
                    </span>
                    <input
                      value={schoolName}
                      onChange={(e) => {
                        setSchoolName(e.target.value);
                        setErrSchoolName("");
                      }}
                      id="schoolName"
                      type="text"
                      placeholder="e.g. Sunrise Public School"
                      className="input-field w-full py-2 px-3"
                    />
                  </div>
                  {errSchoolName && (
                    <p className="auth-field-error">
                      <i className="ri-error-warning-line"></i> {errSchoolName}
                    </p>
                  )}
                </div>
                <div className="login-field">
                  <label
                    className=" text-[#94a3b8] font-semibold text-[0.7rem]  block"
                    htmlFor="principal"
                  >
                    Principal /Head Of School
                  </label>
                  <div className="relative">
                    <span className="input-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M20 22H18V20C18 18.3431 16.6569 17 15 17H9C7.34315 17 6 18.3431 6 20V22H4V20C4 17.2386 6.23858 15 9 15H15C17.7614 15 20 17.2386 20 20V22ZM12 13C8.68629 13 6 10.3137 6 7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7C18 10.3137 15.3137 13 12 13ZM12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"></path>
                      </svg>
                    </span>
                    <input
                      value={principal}
                      onChange={(e) => {
                        setPrincipal(e.target.value);
                        setErrPrincipal("");
                      }}
                      id="principal"
                      type="text"
                      placeholder="e.g. DR. Ramesh Kumar"
                      className="input-field w-full py-2 px-3"
                    />
                  </div>
                  {errPrincipal && (
                    <p className="auth-field-error">
                      <i className="ri-error-warning-line"></i> {errPrincipal}
                    </p>
                  )}
                </div>
                <div className="login-field">
                  <label
                    className=" text-[#94a3b8] font-semibold text-[0.7rem]  block"
                    htmlFor="udise"
                  >
                    UDISE+ Code <small>(11 digit unique school code)</small>
                  </label>
                  <div className="relative">
                    <span className="input-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M4 16H20V5H4V16ZM13 18V20H17V22H7V20H11V18H2.9918C2.44405 18 2 17.5511 2 16.9925V4.00748C2 3.45107 2.45531 3 2.9918 3H21.0082C21.556 3 22 3.44892 22 4.00748V16.9925C22 17.5489 21.5447 18 21.0082 18H13Z"></path>
                      </svg>
                    </span>
                    <input
                      value={udiseCode}
                      onChange={(e) => {
                        setUdiseCode(e.target.value);
                        setErrUdise("");
                      }}
                      id="udise"
                      type="Number"
                      placeholder="e.g. 12345678901"
                      className="input-field w-full py-2 px-3"
                    />
                  </div>
                  {errUdise && (
                    <p className="auth-field-error">
                      <i className="ri-error-warning-line"></i> {errUdise}
                    </p>
                  )}
                </div>

                <div className="login-field">
                  <label
                    className=" text-[#94a3b8] font-semibold text-[0.7rem]  block"
                    htmlFor="contact"
                  >
                    School Contact Number
                  </label>
                  <div className="relative">
                    <span className="input-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M9.36556 10.6821C10.302 12.3288 11.6712 13.698 13.3179 14.6344L14.2024 13.3961C14.4965 12.9845 15.0516 12.8573 15.4956 13.0998C16.9024 13.8683 18.4571 14.3353 20.0789 14.4637C20.599 14.5049 21 14.9389 21 15.4606V19.9234C21 20.4361 20.6122 20.8657 20.1022 20.9181C19.5723 20.9726 19.0377 21 18.5 21C9.93959 21 3 14.0604 3 5.5C3 4.96227 3.02742 4.42771 3.08189 3.89776C3.1343 3.38775 3.56394 3 4.07665 3H8.53942C9.0611 3 9.49513 3.40104 9.5363 3.92109C9.66467 5.54288 10.1317 7.09764 10.9002 8.50444C11.1427 8.9484 11.0155 9.50354 10.6039 9.79757L9.36556 10.6821ZM6.84425 10.0252L8.7442 8.66809C8.20547 7.50514 7.83628 6.27183 7.64727 5H5.00907C5.00303 5.16632 5 5.333 5 5.5C5 12.9558 11.0442 19 18.5 19C18.667 19 18.8337 18.997 19 18.9909V16.3527C17.7282 16.1637 16.4949 15.7945 15.3319 15.2558L13.9748 17.1558C13.4258 16.9425 12.8956 16.6915 12.3874 16.4061L12.3293 16.373C10.3697 15.2587 8.74134 13.6303 7.627 11.6707L7.59394 11.6126C7.30849 11.1044 7.05754 10.5742 6.84425 10.0252Z"></path>
                      </svg>
                    </span>
                    <input
                      value={contact}
                      onChange={(e) => {
                        setContact(e.target.value);
                        setErrContact("");
                      }}
                      id="contact"
                      type="Number"
                      placeholder="e.g. +91 1234567899"
                      className="input-field w-full py-2 px-3"
                    />
                  </div>
                  {errContact && (
                    <p className="auth-field-error">
                      <i className="ri-error-warning-line"></i> {errContact}
                    </p>
                  )}
                </div>
                <button className="mt-2 w-full rounded-[10px] bg-linear-to-r from-purple-600 via-violet-500 to-cyan-400 py-1 text-[0.8rem] font-semibold text-white shadow-lg shadow-purple-500/20 transition hover:brightness-110">
                  Continue to Address <i className="ri-arrow-right-long-line"></i>
                </button>
              </div>
            </form>
          )}

          {currForm == "2" && (
            <form className="login-form" onSubmit={submitHandlerForSecForm}>
              <div className="form-1">
                <div>
                  <h4 className="text-xs uppercase text-[#06b6d4] font-semibold mb-0">
                    Location Details
                  </h4>
                  <hr className="mt-1 h-0.1 text-[#06b6d4]" />
                </div>

                <div className="login-field">
                  <label
                    className=" text-[#94a3b8] font-semibold text-[0.7rem]  block"
                    htmlFor="schoolName"
                  >
                    Address
                  </label>
                  <div className="relative">
                    <span className="input-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 20.8995L16.9497 15.9497C19.6834 13.2161 19.6834 8.78392 16.9497 6.05025C14.2161 3.31658 9.78392 3.31658 7.05025 6.05025C4.31658 8.78392 4.31658 13.2161 7.05025 15.9497L12 20.8995ZM12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364L12 23.7279ZM12 13C13.1046 13 14 12.1046 14 11C14 9.89543 13.1046 9 12 9C10.8954 9 10 9.89543 10 11C10 12.1046 10.8954 13 12 13ZM12 15C9.79086 15 8 13.2091 8 11C8 8.79086 9.79086 7 12 7C14.2091 7 16 8.79086 16 11C16 13.2091 14.2091 15 12 15Z"></path>
                      </svg>
                    </span>
                    <input
                      value={fullAddress}
                      onChange={(e) => {
                        setFullAddress(e.target.value);
                        setErrAddress("");
                      }}
                      id="Address"
                      type="text"
                      placeholder="Street , Area , Building..."
                      className="input-field w-full py-2 px-3"
                    />
                  </div>
                  {errAddress && (
                    <p className="auth-field-error">
                      <i className="ri-error-warning-line"></i> {errAddress}
                    </p>
                  )}
                </div>
                <div className="flex gap-4">
                  <div className="login-field">
                    <label
                      className=" text-[#94a3b8] font-semibold text-[0.7rem]  block"
                      htmlFor="schoolName"
                    >
                      City
                    </label>
                    <div className="relative">
                      <span className="input-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M21 19H23V21H1V19H3V4C3 3.44772 3.44772 3 4 3H14C14.5523 3 15 3.44772 15 4V19H19V11H17V9H20C20.5523 9 21 9.44772 21 10V19ZM5 5V19H13V5H5ZM7 11H11V13H7V11ZM7 7H11V9H7V7Z"></path>
                        </svg>
                      </span>
                      <input
                        value={city}
                        onChange={(e) => {
                          setCity(e.target.value);
                          setErrCity("");
                        }}
                        id="City"
                        type="text"
                        placeholder="e.g. Sunrise Public School"
                        className="input-field w-full py-2 px-3"
                      />
                    </div>
                    {errCity && (
                      <p className="auth-field-error">
                        <i className="ri-error-warning-line"></i> {errCity}
                      </p>
                    )}
                  </div>
                  <div className="login-field">
                    <label
                      className=" text-[#94a3b8] font-semibold text-[0.7rem]  block"
                      htmlFor="schoolName"
                    >
                      State
                    </label>
                    <div className="relative">
                      <span className="input-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M21.7267 2.95694L16.2734 22.0432C16.1225 22.5716 15.7979 22.5956 15.5563 22.1126L11 13L1.9229 9.36919C1.41322 9.16532 1.41953 8.86022 1.95695 8.68108L21.0432 2.31901C21.5716 2.14285 21.8747 2.43866 21.7267 2.95694ZM19.0353 5.09647L6.81221 9.17085L12.4488 11.4255L15.4895 17.5068L19.0353 5.09647Z"></path>
                        </svg>
                      </span>
                      <select
                        value={state}
                        onChange={(e) => {
                          setState(e.target.value);
                          setErrState("");
                        }}
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
                        <option value="Himachal Pradesh">
                          Himachal Pradesh
                        </option>
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
                      {errState && (
                        <p className="auth-field-error">
                          <i className="ri-error-warning-line"></i> {errState}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="login-field">
                  <label
                    className=" text-[#94a3b8] font-semibold text-[0.7rem]  block"
                    htmlFor="schoolName"
                  >
                    Pin Code
                  </label>
                  <div className="relative">
                    <span className="input-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M11 17.9381C7.05369 17.446 4 14.0796 4 10C4 5.58172 7.58172 2 12 2C16.4183 2 20 5.58172 20 10C20 14.0796 16.9463 17.446 13 17.9381V20.0116C16.9463 20.1039 20 20.7351 20 21.5C20 22.3284 16.4183 23 12 23C7.58172 23 4 22.3284 4 21.5C4 20.7351 7.05369 20.1039 11 20.0116V17.9381ZM12 16C15.3137 16 18 13.3137 18 10C18 6.68629 15.3137 4 12 4C8.68629 4 6 6.68629 6 10C6 13.3137 8.68629 16 12 16ZM12 12C10.8954 12 10 11.1046 10 10C10 8.89543 10.8954 8 12 8C13.1046 8 14 8.89543 14 10C14 11.1046 13.1046 12 12 12Z"></path>
                      </svg>
                    </span>
                    <input
                      value={pincode}
                      onChange={(e) => {
                        setPincode(e.target.value);
                        setErrPincode("");
                      }}
                      id="PinCode"
                      type="text"
                      placeholder="e.g. 284301"
                      className="input-field w-full py-2 px-3"
                    />
                  </div>
                  {errPincode && (
                    <p className="auth-field-error">
                      <i className="ri-error-warning-line"></i> {errPincode}
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={prevPage}
                    className="border-[#94a3b82a] text-[#94a3b8] border rounded-[10px] hover:bg-[#94a3b81a]"
                  >
                    <i className="ri-arrow-left-long-line"></i>Back
                  </button>
                  <button className="mt-2 w-full rounded-[10px] bg-linear-to-r from-purple-600 via-violet-500 to-cyan-400 py-1 text-[0.8rem] font-semibold text-white shadow-lg shadow-purple-500/20 transition hover:brightness-110">
                    Continue to Account <i className="ri-arrow-right-long-line"></i>
                  </button>
                </div>
              </div>
            </form>
          )}

          {currForm == "3" && (
            <form className="login-form" onSubmit={submitHandlerForThirdForm}>
              <div className="form-1">
                <div>
                  <h4 className="text-xs uppercase text-[#06b6d4] font-semibold mb-0">
                    Account Credentials
                  </h4>
                  <hr className="mt-1 h-0.1 text-[#06b6d4]" />
                </div>

                <div className="login-field">
                  <label
                    className=" text-[#94a3b8] font-semibold text-[0.7rem]  block"
                    htmlFor="schoolName"
                  >
                    School Email Address
                  </label>
                  <div className="relative">
                    <span className="input-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM20 7.23792L12.0718 14.338L4 7.21594V19H20V7.23792ZM4.51146 5L12.0619 11.662L19.501 5H4.51146Z"></path>
                      </svg>
                    </span>
                    <input
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setErrEmail("");
                      }}
                      id="email"
                      type="email"
                      placeholder="principal@school.edu.in"
                      className="input-field w-full py-2 px-3"
                    />
                  </div>
                  {errEmail && (
                    <p className="auth-field-error">
                      <i className="ri-error-warning-line"></i> {errEmail}
                    </p>
                  )}
                </div>
                <div className="login-field">
                  <label
                    className=" text-[#94a3b8] font-semibold text-[0.7rem]  block"
                    htmlFor="schoolName"
                  >
                    Create Password
                  </label>
                  <div className="relative">
                    <span className="input-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M6 8V7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7V8H20C20.5523 8 21 8.44772 21 9V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V9C3 8.44772 3.44772 8 4 8H6ZM19 10H5V20H19V10ZM11 15.7324C10.4022 15.3866 10 14.7403 10 14C10 12.8954 10.8954 12 12 12C13.1046 12 14 12.8954 14 14C14 14.7403 13.5978 15.3866 13 15.7324V18H11V15.7324ZM8 8H16V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V8Z"></path>
                      </svg>
                    </span>
                    <input
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setErrPassword("");
                      }}
                      id="password"
                      type="password"
                      placeholder="Min. 8 Characters"
                      className="input-field w-full py-2 px-3"
                    />
                  </div>
                  {errPassword && (
                    <p className="auth-field-error">
                      <i className="ri-error-warning-line"></i> {errPassword}
                    </p>
                  )}
                </div>

                <div>
                  <label className="flex items-center mt-4 checkbox-input gap-2">
                    <span
                      onClick={() => {
                        const toggled = !agreeTandC;
                        setAgreeTandC(toggled);
                        if (toggled) setErrAgree("");
                      }}
                      className={
                        agreeTandC == false
                          ? "checkbox-custom"
                          : "checkbox-custom-tick"
                      }
                    >
                      {agreeTandC == true ? <span>&#10003;</span> : ""}
                    </span>
                    <span>
                      I agree to the
                      <a href="#" className="auth-link">
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="#" className="auth-link">
                        Privacy Policy
                      </a>
                    </span>
                  </label>
                  {errAgree && (
                    <p className="auth-field-error">
                      <i className="ri-error-warning-line"></i> {errAgree}
                    </p>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={prevPage}
                    className="border-[#94a3b82a] text-[#94a3b8] border rounded-[10px] hover:bg-[#94a3b81a]"
                  >
                    <i className
                    ="ri-arrow-left-long-line"></i>Back
                  </button>
                  <button className="mt-2 w-full rounded-[10px] bg-linear-to-r from-purple-600 via-violet-500 to-cyan-400 py-1 text-[0.8rem] font-semibold text-white shadow-lg shadow-purple-500/20 transition hover:brightness-110">
                    Create Account <span>&#10003;</span>
                  </button>
                </div>
              </div>
            </form>
          )}
          <br />
          <p className="text-center text-[#94a3b8]">
            Already Registered?{" "}
            <Link
              to={"/login"}
              className=" text-cyan-400 font-semibold hover:text-cyan-300"
            >
              Sign In <i className="ri-arrow-right-long-line"></i>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
