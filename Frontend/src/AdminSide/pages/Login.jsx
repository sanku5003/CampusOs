import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
const Login = () => {
  const { loading, handleLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    const result = await handleLogin({ email, passcode: password });
    console.log(result);

    if (result.success) {
      navigate("/");
      return;
    }
  };

  return (
    <div className="h-screen flex flex-row bg-[#060b18] ">
      <div className="p-4 border-[#393939] border-r border-solid  w-[50%] bg-[radial-gradient(circle_at_top_left,rgba(88,28,135,0.5)_0%,rgba(30,27,75,0.35)_55%,#0B1020_70%,#070B16_100%)] flex items-center justify-center ">
        <div className="w-[48%] flex flex-col justify-start">
          <div>
            <img
              className="w-28 mb-3"
              src="/Gemini_Generated_Image_lk6x0elk6x0elk6x-removebg-preview.png"
              alt="CampusOS"
            />
          </div>
          <h1 className="text-white font-bold text-2xl leading-8 mb-1">
            Empowering Schools with Smart Management
          </h1>
          <p className="text-xs text-[#94a3b8] leading-relaxed mb-3 ">
            Manage students, staff, academics, fees, attendance, and more — all
            from one unified platform built for modern Indian schools.
          </p>

          <ol className="text-xs text-[#94a3b8]">
            <li className="mb-2 flex items-center gap-2">
              <span className="span-dot"></span>Student & Staff Management
            </li>
            <li className="mb-2 flex items-center gap-2">
              <span className="span-dot"></span>Smart Attendance Tracking
            </li>
            <li className="mb-2 flex items-center gap-2">
              <span className="span-dot"></span>Fee & Finance Management
            </li>
            <li className="mb-2 flex items-center gap-2">
              <span className="span-dot"></span>Academics & Examinations
            </li>
          </ol>
        </div>
      </div>
      <div className="w-[50%] right-box px-12 py-12">
        <div className="login-box w-full h-full">
          <div>
            <h1 className="text-white font-extrabold text-xl">Welcome Back</h1>
            <p className="text-xs text-[#94a3b8]">
              Sign into your school dashboard
            </p>
          </div>

          <form className="login-form" onSubmit={(e) => submitHandler(e)}>
            <div className="login-field">
              <label
                className=" text-[#94a3b8] font-semibold text-[0.7rem]  block"
                htmlFor="email"
              >
                School Email Address
              </label>
              <div className="relative">
                <span className="input-icon">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 6.75C3 5.23122 4.23122 4 5.75 4H18.25C19.7688 4 21 5.23122 21 6.75V17.25C21 18.7688 19.7688 20 18.25 20H5.75C4.23122 20 3 18.7688 3 17.25V6.75Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3.75 6.75L12 12.75L20.25 6.75"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  type="email"
                  placeholder="principal@school.edu.in"
                  className="input-field w-full py-2 px-3"
                />
              </div>
            </div>

            <div className="login-field">
              <label
                className=" text-[#94a3b8] block font-semibold text-[0.7rem]"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <span className="input-icon">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17 10V8.5C17 5.46243 14.5376 3 11.5 3C8.46243 3 6 5.46243 6 8.5V10"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5 10H18.5C19.3284 10 20 10.6716 20 11.5V18.5C20 19.3284 19.3284 20 18.5 20H5.5C4.67157 20 4 19.3284 4 18.5V11.5C4 10.6716 4.67157 10 5.5 10H5Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="input-field w-full py-2 px-3"
                />
                <span className="input-icon right-icon">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 12C1 12 5 5 12 5C19 5 23 12 23 12C23 12 19 19 12 19C5 19 1 12 1 12Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 15.5C13.933 15.5 15.5 13.933 15.5 12C15.5 10.067 13.933 8.5 12 8.5C10.067 8.5 8.5 10.067 8.5 12C8.5 13.933 10.067 15.5 12 15.5Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-[#94a3b8] mb-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-[#94a3b8] bg-transparent text-[#7c3aed] focus:ring-[#7c3aed]/60"
                />
                Remember me
              </label>
              <button
                type="button"
                className="text-[12px] text-cyan-400 hover:text-cyan-300"
              >
                Forgot Password?
              </button>
            </div>
            {loading == true ? (
              <div className="h-10 flex justify-center items-center mt-2 w-full rounded-[10px] bg-linear-to-r from-purple-600 via-violet-500 to-cyan-400 py-1 text-[0.8rem] font-semibold text-white shadow-lg shadow-purple-500/20 transition hover:brightness-110 overflow-hidden">
                <img className="loading-image" src="/output-onlinegiftools.gif" />
              </div>
            ) : (
              <button
                type="submit"
                className="mt-2 w-full rounded-[10px] bg-linear-to-r from-purple-600 via-violet-500 to-cyan-400 py-1 text-[0.8rem] font-semibold text-white shadow-lg shadow-purple-500/20 transition hover:brightness-110"
              >
                Sign In To dashboard
              </button>
            )}
          </form>
          <div className="login-form-footer mt-6 text-center flex flex-col justify-center gap-1">
            <p className="text-[0.7rem] font-semibold text-[#94a3b856] mb-3 flex items-center justify-center gap-4">
              <span className="block w-[20%] h-px bg-[#64748b42]"></span>New to
              CampusOS?
              <span className="block w-[20%] h-px bg-[#64748b40]"></span>
            </p>
            <p className="text-[0.7rem] font-semibold text-[#94a3b8] mb-3">
              Register your school to get started{" "}
              <Link
                to={"/register"}
                className=" text-cyan-400 font-semibold hover:text-cyan-300"
              >
                Create Account →
              </Link>
            </p>
            <p className="text-[10px] text-[#64748b6c] leading-5 max-w-88 mx-auto font-semibold">
              By signing in you agree to our{" "}
              <a className=" text-[#94a3b899] underline">Terms of Service</a>
              and
              <a href="#" className="text-[#94a3b892] underline">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
