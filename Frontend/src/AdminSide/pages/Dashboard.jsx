import React from "react";
import "../styles/dashboard.css";
import "remixicon/fonts/remixicon.css";

const Dashboard = () => {
  return (
    <div className="dashboard h-screen w-screen">
      <div className="dashboard-menu">
        <div className="school-logo">
          <img
            src="/Gemini_Generated_Image_lk6x0elk6x0elk6x-removebg-preview.png"
            alt=""
          />
        </div>
        <div className="selection-menu">
          <div className="menu-part">
            <h6 className="text-[#94a3b88b] uppercase text-[10px] tracking-wide relative left-2">
              Main Menu
            </h6>
            <div className="menu-item">
              <div className="p-1">
                <i className="ri-dashboard-horizontal-line text-[#94a3b8b9] text-base"></i>
              </div>
              <div>Dashboard</div>
            </div>
            <div className="menu-item">
              <div className="p-1">
                <i className="ri-group-line text-[#94a3b8b9] text-base"></i>
              </div>
              <div>Students </div>
            </div>
            <div className="menu-item">
              <div className="p-1">
                <i className="ri-user-6-line text-[#94a3b8b9] text-base"></i>
              </div>
              <div>Teachers</div>
            </div>
            <div className="menu-item">
              <div className="p-1">
                <i className="ri-checkbox-line text-[#94a3b8b9] text-base"></i>
              </div>
              <div>Attendence</div>
            </div>
          </div>
          <div className="menu-part">
            <h6 className="text-[#94a3b88b] uppercase text-[10px] tracking-wide relative left-2">
              Academics
            </h6>

            <div className="menu-item">
              <div className="p-1">
                <i className="ri-book-open-line text-[#94a3b8b9] text-base"></i>
              </div>
              <div>Academics</div>
            </div>
            <div className="menu-item">
              <div className="p-1">
                <i className="ri-money-rupee-circle-line text-[#94a3b8b9] text-base"></i>
              </div>
              <div>Fee Management</div>
            </div>
            <div className="menu-item">
              <div className="p-1">
                <i className="ri-calendar-todo-line text-[#94a3b8b9] text-base"></i>
              </div>
              <div>Time Table </div>
            </div>
            <div className="menu-item">
              <div className="p-1">
                <i className="ri-file-3-fill text-[#94a3b8b9] text-base"></i>
              </div>
              <div>Examinations</div>
            </div>
          </div>
          <div className="menu-part">
            <h6 className="text-[#94a3b88b] uppercase text-[10px] tracking-wide relative left-2">
              Facilities
            </h6>
            <div className="menu-item">
              <div className="p-1">
                <i className="ri-book-shelf-line text-[#94a3b8b9] text-base"></i>
              </div>
              <div>Library</div>
            </div>
            <div className="menu-item">
              <div className="p-1">
                <i className="ri-truck-line text-[#94a3b8b9] text-base"></i>
              </div>
              <div>Transport</div>
            </div>
          </div>
          <div className="menu-part">
            <h6 className="text-[#94a3b88b] uppercase text-[10px] tracking-wide relative left-2">
              Communications
            </h6>
            <div className="menu-item">
              <div className="p-1">
                <i className="ri-notification-2-line text-[#94a3b8b9] text-base"></i>
              </div>
              <div>Announcement</div>
            </div>
            <div className="menu-item">
              <div className="p-1">
                <i className="ri-bar-chart-line text-[#94a3b8b9] text-base"></i>
              </div>
              <div>Report</div>
            </div>
            <div className="menu-item">
              <div className="p-1">
                <i className="ri-settings-2-line text-[#94a3b8b9] text-base"></i>
              </div>
              <div>Settings</div>
            </div>
          </div>
        </div>
      </div>
      <div className="dashboard-content">
        <div className="navbar">
          <div className="flex gap-2 items-center">
            <div className="hamburger-icon">
              <i class="ri-menu-line"></i>
            </div>

            <div className="current-page">
              <p className="text-xs text-[#94a3b88b] font-semibold">
                CampusOS &gt; <span className="text-white">Dashboard</span>
              </p>
            </div>
          </div>

          <div className="search-box">
            <i class="ri-search-line"></i>
            <input
              type="text"
              placeholder="Search , Students , Classes , fees...."
            />
          </div>
          <div className="flex gap-2 items-center">
            <div className="notification-icon">
              <i class="ri-notification-line"></i>
            </div>
            <div className="admin">
              <div>
                <i class="ri-user-line"></i>
              </div>
              <div>
                <h3 className="text-sm">Sanket Parihar</h3>
                <p className="text-[8px]">Principal</p>
              </div>
              <div>
                <i class="ri-arrow-drop-down-fill"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
