import React from "react";
import "../../styles/dashboard.css";
import "remixicon/fonts/remixicon.css";
const AddClassForm = (props) => {
  return (
    <div className="text-sm">
      <div className="flex justify-between items-center">
        <button
          className="sec-btn"
          onClick={() => {
            props.setCurrPage("classTablePage");
          }}
        >
          <i class="ri-arrow-left-s-line"></i>back{" "}
        </button>
      </div>
      <h1 className="text-white font-bold text-center text-lg">
        Add a New Class
      </h1>
      <hr className="w-[30%] ml-auto mr-auto mt-2 h-px bg-purple-500" />

      <form className="classForm">
        <div>
          <label htmlFor="class">Class</label>
          <div className="input-group">
            <i className="ri-artboard-line"></i>
            <input type="text" placeholder="e.g. VI or 6"/>
          </div>
        </div>
        <div>
          <label htmlFor="section">Section</label>
          <div className="input-group">
            <i className="ri-pages-line"></i>
            <input type="text" placeholder="e.g. A , B "/>
          </div>
        </div>
        <div>
          <label htmlFor="Room_no">Room No.</label>
          <div className="input-group">
           <i className="ri-map-pin-4-line"></i>
            <input type="text" placeholder="e.g. D301 "/>
          </div>
        </div>
        <div>
          <label htmlFor="medium">Room No.</label>
          <i class="ri-english-input"></i>
          <select>
            <option value="English" selected>English</option>
            <option value="Hindi" selected>Hindi</option>
            <option value="Other" selected>Others..</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default AddClassForm;
