import React, { useState } from "react";
import "../../styles/dashboard.css";
import "remixicon/fonts/remixicon.css";
import { useClasses } from "../../hooks/useClasses";
const AddClassForm = (props) => {
  const { addClass, loading } = useClasses();
  const [className, setClassName] = useState("");
  const [section, setSection] = useState("");
  const [room, setRoom] = useState("");
  const [medium, setMedium] = useState("English");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await addClass({ className, section, room, medium });

      props.setCurrPage("classTablePage");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="text-sm">
      <div className="flex justify-between items-center">
        <button
          className="sec-btn"
          onClick={() => {
            props.setCurrPage("classTablePage");
          }}
        >
          <i className="ri-arrow-left-s-line"></i>back
        </button>
      </div>
      <h1 className="text-white font-bold text-center text-lg">
        Add a New Class
      </h1>
      <hr className="w-[30%] ml-auto mr-auto mt-2 h-px bg-purple-500" />

      <form className="classForm" onSubmit={(e) => submitHandler(e)}>
        <div className="classForm-input">
          <label htmlFor="class">Class</label>
          <div className="input-group">
            <i className="ri-artboard-line"></i>
            <input
              type="text"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              placeholder="e.g. VI or 6"
            />
          </div>
        </div>
        <div className="classForm-input">
          <label htmlFor="section">Section</label>
          <div className="input-group">
            <i className="ri-pages-line"></i>
            <input
              type="text"
              value={section}
              onChange={(e) => setSection(e.target.value)}
              placeholder="e.g. A , B "
            />
          </div>
        </div>
        <div className="classForm-input">
          <label htmlFor="Room_no">Room No.</label>
          <div className="input-group">
            <i className="ri-map-pin-4-line"></i>
            <input
              type="text"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              placeholder="e.g. D301 "
            />
          </div>
        </div>
        <div className="classForm-input relative">
          <label htmlFor="medium">Medium</label>
          <br />
          <i className="ri-english-input"></i>
          <select
            className="mt-3 w-1/2 border border-[#1c295c] outline-0 rounded py-1.5 px-7 "
            value={medium}
            onChange={(e) => setMedium(e.target.value)}
          >
            <option className="bg-[#0d132a] " value="English">
              English
            </option>
            <option className="bg-[#0d132a] " value="Hindi">
              Hindi
            </option>
            <option className="bg-[#0d132a] " value="Other">
              Others..
            </option>
          </select>
        </div>

        <br />
        <br />
        <div className="form-btn">
          <button className="primary-btn"> Add Class</button>
        </div>
      </form>
    </div>
  );
};

export default AddClassForm;
