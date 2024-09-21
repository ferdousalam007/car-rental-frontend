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
            `flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
              isActive ? "bg-gray-300  text-gray-700" : "text-gray-600"
            }`
          }
        >
          <BsFillHouseAddFill className="w-5 h-5" />

          <span className="mx-4 font-medium">User Profile</span>
        </NavLink>
      </div>

      {/* Manage Bookings Dropdown */}
      <div className="relative">
        <button
          onClick={() => toggleDropdown("manageBookings")}
          className="flex items-center px-4 py-2 w-full text-left transition-colors duration-300 transform rounded-lg text-gray-600 hover:bg-gray-300 hover:text-gray-700"
        >
          <MdOutlineManageHistory className="w-5 h-5" />
          <span className="mx-4 font-medium">Manage Bookings</span>
          <AiOutlineDown
            className={`ml-auto transform transition-transform ${
              activeDropdown === "manageBookings" ? "rotate-180" : ""
            }`}
          />
        </button>

        {activeDropdown === "manageBookings" && (
          <div className="absolute left-0 mt-2 w-full bg-white border rounded shadow-lg z-10">
            <NavLink
              to="/dashboard/all-bookings"
              className={({ isActive }) =>
                `block px-4 py-2 transition-colors duration-300 transform ${
                  isActive
                    ? "bg-gray-300 text-gray-700"
                    : "text-gray-600 hover:bg-gray-300 hover:text-gray-700"
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
