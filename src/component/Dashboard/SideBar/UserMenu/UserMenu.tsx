import { useState } from "react";
import { BsFillHouseAddFill } from "react-icons/bs";
import { MdOutlineManageHistory } from "react-icons/md";
import { AiOutlineDown } from "react-icons/ai";

import { NavLink } from "react-router-dom";

const UserMenu = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleDropdown = (menu: string) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  return (
    <div className="space-y-5 mt-10">
      {/* User Profile Dropdown */}

      <div>
        <NavLink
          to="/dashboard/profile-view"
          className={({ isActive }) =>
            `flex items-center px-4 py-2 mt-5  transition-colors border  cursor-pointer duration-300 transform  hover:bg-gray-300   hover:text-gray-700 dark:hover:bg-slate-800 dark:hover:text-white rounded-lg ${
              isActive
                ? "bg-slate-700 dark:bg-slate-900  text-gray-100"
                : "text-text-primary"
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
          <MdOutlineManageHistory className="w-5 h-5 dark:text-yellow-400 text-yellow-600" />
          <span className="mx-4 font-medium">Manage Bookings</span>
          <AiOutlineDown
            className={`ml-auto transform transition-transform ${
              activeDropdown === "manageBookings" ? "rotate-180" : ""
            }`}
          />
        </button>

        {activeDropdown === "manageBookings" && (
          <div className="  w-full  bg-gray-200 dark:bg-slate-800 border rounded  z-10 pb-2 px-1">
            <NavLink
              to="/dashboard/all-bookings"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 mt-5  transition-colors border  cursor-pointer duration-300 transform  hover:bg-gray-300   hover:text-gray-700 dark:hover:bg-slate-800 bg-slate-300 dark:bg-slate-700 dark:hover:text-white rounded-lg ${
                  isActive
                    ? "bg-slate-700 dark:bg-slate-900  text-gray-100"
                    : "text-text-primary"
                }`
              }
            >
              My Bookings
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserMenu;
