import React, { useState } from "react";
import "../styles/register.css";
const Register = () => {
  const [currForm, setCurrForm] = useState(1);
  const [schoolName, setSchoolName] = useState("");
  const [principal, setPrincipal] = useState("");
  const [udiseCode, setUdiseCode] = useState();
  const [contact, setContact] = useState();

  const nextForm = () => {
    setCurrForm(currForm + 1);
  };

  

  const submitHandler = (e) => {
    e.preventDefault();
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

          <div className="step">
            <div className={currForm == 1 ? "active-step" : "completed-step" }>{currForm == 1 ? '1' : <span>&#10003;</span>}</div>
            <div className="step-line"></div>
            <div className="step-block">2</div>
            <div className="step-line"></div>
            <div className="step-block">3</div>
          </div>

          <form className="login-form">
            {currForm == "1" && (
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
                      onChange={(e) => setSchoolName(e.target.value)}
                      id="schoolName"
                      type="text"
                      placeholder="e.g. Sunrise Public School"
                      className="input-field w-full py-2 px-3"
                    />
                  </div>
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
                      onChange={(e) => setPrincipal(e.target.value)}
                      id="principal"
                      type="text"
                      placeholder="e.g. DR. Ramesh Kumar"
                      className="input-field w-full py-2 px-3"
                    />
                  </div>
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
                      onChange={(e) => setUdiseCode(e.target.value)}
                      id="udise"
                      type="Number"
                      placeholder="e.g. 12345678901"
                      className="input-field w-full py-2 px-3"
                    />
                  </div>
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
                      onChange={(e) => setContact(e.target.value)}
                      id="contact"
                      type="Number"
                      placeholder="e.g. +91 1234567899"
                      className="input-field w-full py-2 px-3"
                    />
                  </div>
                </div>
                <button
                  onClick={() => nextForm()}
                  className="mt-2 w-full rounded-[10px] bg-linear-to-r from-purple-600 via-violet-500 to-cyan-400 py-1 text-[0.8rem] font-semibold text-white shadow-lg shadow-purple-500/20 transition hover:brightness-110"
                >
                  Continue to Address
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
