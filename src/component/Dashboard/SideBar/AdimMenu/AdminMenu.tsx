import { useState } from "react";
import { AiOutlineDown } from "react-icons/ai";
import { BsFillHouseAddFill } from "react-icons/bs";
import { MdOutlineManageHistory } from "react-icons/md";
import { FaCar, FaClipboardList } from "react-icons/fa"; // New icons
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleDropdown = (menu: string) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  return (
    <div className="space-y-5 mt-10">
      {/* User Profile Dropdown */}
      <div>
        <NavLink
          to="/dashboard/admin-profile-view"
          className={({ isActive }) =>
            `flex items-center px-4 py-2 mt-5  transition-colors border  cursor-pointer duration-300 transform  hover:bg-gray-300   hover:text-gray-700 dark:hover:bg-slate-800 dark:hover:text-white rounded-lg ${
              isActive ? "bg-slate-700 dark:bg-slate-900  text-gray-100" : "text-text-primary"
            }`
          }
        >
          <BsFillHouseAddFill className="w-5 h-5 dark:text-yellow-400 text-yellow-600" />

          <span className="mx-4 font-medium">User Profile</span>
        </NavLink>
      </div>

      {/* Manage Bookings Dropdown */}
      <div className="relative">
        <button
          onClick={() => toggleDropdown("manageBookings")}
          className="flex items-center px-4 py-2 w-full text-left transition-colors duration-300 transform rounded-lg text-text-primary border hover:bg-gray-300 hover:text-gray-700"
        >
          <FaClipboardList className="w-5 h-5 dark:text-yellow-400 text-yellow-600" /> {/* Updated icon */}
          <span className="mx-4 font-medium">Manage<br/> Bookings</span>
          <AiOutlineDown
            className={`ml-auto transform transition-transform ${
              activeDropdown === "manageBookings" ? "rotate-180" : ""
            }`}
          />
        </button>

        {activeDropdown === "manageBookings" && (
          <div className="  w-full  bg-gray-200 dark:bg-slate-800 border rounded  z-10 pb-2 px-1">
            <NavLink
              to="/dashboard/admin-bookings"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 mt-5  transition-colors border  cursor-pointer duration-300 transform  hover:bg-gray-300   hover:text-gray-700 dark:hover:bg-slate-800 bg-slate-300 dark:bg-slate-700 dark:hover:text-white rounded-lg ${
                  isActive ? "bg-slate-700 dark:bg-slate-900  text-gray-100" : "text-text-primary"
                }`
              }
            >
              All Bookings
            </NavLink>
          </div>
        )}
      </div>

      {/* User Management Dropdown */}
      <div className="relative">
        <button
          onClick={() => toggleDropdown("userManagement")}
         className="flex items-center px-4 py-2 w-full text-left transition-colors duration-300 transform rounded-lg text-text-primary border hover:bg-gray-300 hover:text-gray-700"
        >
          <MdOutlineManageHistory className="w-5 h-5 dark:text-yellow-400 text-yellow-600" />
          <span className="mx-4 font-medium">User<br/> Management</span>
          <AiOutlineDown
            className={`ml-auto transform transition-transform ${
              activeDropdown === "userManagement" ? "rotate-180" : ""
            }`}
          />
        </button>

        {activeDropdown === "userManagement" && (
          <div className="  w-full  bg-gray-200 dark:bg-slate-800 border rounded  z-10 pb-2 px-1">
            <NavLink
              to="/dashboard/all-users"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 mt-5  transition-colors border  cursor-pointer duration-300 transform  hover:bg-gray-300   hover:text-gray-700 dark:hover:bg-slate-800 bg-slate-300 dark:bg-slate-700 dark:hover:text-white rounded-lg ${
                  isActive ? "bg-slate-700 dark:bg-slate-900  text-gray-100" : "text-text-primary"
                }`
              }
            >
              All Users
            </NavLink>
          </div>
        )}
      </div>

      {/* Car Management Dropdown */}
      <div className="relative">
        <button
          onClick={() => toggleDropdown("carManagement")}
         className="flex items-center px-4 py-2 w-full text-left transition-colors duration-300 transform rounded-lg text-text-primary border hover:bg-gray-300 hover:text-gray-700"
        >
          <FaCar className="w-5 h-5 dark:text-yellow-400 text-yellow-600" /> {/* Updated icon */}
          <span className="mx-4 font-medium">Car<br/> Management</span>
          <AiOutlineDown
            className={`ml-auto transform transition-transform ${
              activeDropdown === "carManagement" ? "rotate-180" : ""
            }`}
          />
        </button>

        {activeDropdown === "carManagement" && (
         <div className="  w-full  bg-gray-200 dark:bg-slate-800 border rounded  z-10 pb-2 px-1">
            <NavLink
              to="/dashboard/add-car"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 mt-5  transition-colors border  cursor-pointer duration-300 transform  hover:bg-gray-300   hover:text-gray-700 dark:hover:bg-slate-800 bg-slate-300 dark:bg-slate-700 dark:hover:text-white rounded-lg ${
                  isActive ? "bg-slate-700 dark:bg-slate-900  text-gray-100" : "text-text-primary"
                }`
              }
            >
              Add Cars
            </NavLink>
            <NavLink
              to="/dashboard/all-cars"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 mt-5  transition-colors border  cursor-pointer duration-300 transform  hover:bg-gray-300   hover:text-gray-700 dark:hover:bg-slate-800 bg-slate-300 dark:bg-slate-700 dark:hover:text-white rounded-lg ${
                  isActive ? "bg-slate-700 dark:bg-slate-900  text-gray-100" : "text-text-primary"
                }`
              }
            >
              All Cars
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminMenu;
