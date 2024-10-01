import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../redux/hooks";
// import { logOut, useCurrentToken } from "../../redux/features/Auth/authSlice";
import { logOut, useCurrentToken } from "../../redux/features/Auth/AuthSlice";
import { verifyToken } from "../../utils/verifyToken";
import { JwtPayload } from "jsonwebtoken";
import { useState } from "react"; // Add this import
import { FaAngleDown } from "react-icons/fa6";

interface CustomJwtPayload extends JwtPayload {
  role: string;
}

const MenuDropDown = () => {
  const [isOpen, setIsOpen] = useState(false); // Add state for dropdown visibility

  const dispatch = useDispatch();
  const token = useAppSelector(useCurrentToken);

  const handleLogOut = () => {
    dispatch(logOut());
  };

  let user;
  if (token) {
    user = verifyToken(token) as CustomJwtPayload;
  }

  const toggleDropdown = () => {
    setIsOpen(!isOpen); // Toggle dropdown visibility
  };

  return (
    <div className="relative">
      {" "}
      {/* Add relative positioning for dropdown */}
      <div className="text-sm">
        <div className="flex gap-3 cursor-pointer" onClick={toggleDropdown}>
          {" "}
          {/* Toggle dropdown on click */}
          <FaAngleDown className="text-yellow-700 text-xl dark:text-gray-300" />
        </div>
        {isOpen && ( // Conditionally render dropdown items
          <div className="absolute bg-white dark:bg-gray-800 shadow-lg rounded mt-3 -ml-[70px] border-t-[1px] border-gray-300">
            {user ? (
              <>
                <Link
                  to={
                    user.role === "admin"
                      ? "/dashboard/admin-profile-view"
                      : "/dashboard/profile-view"
                  }
                  className="block px-4 py-3 dark:text-gray-300 hover:bg-gray-700 hover:text-white transition font-semibold"
                >
                  Dashboard
                </Link>
                <div
                  onClick={handleLogOut}
                  className="block px-4 py-3 dark:text-gray-300 hover:bg-gray-700 hover:text-white transition font-semibold cursor-pointer"
                >
                  Logout
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-4 py-3 dark:text-gray-300 hover:bg-gray-700 hover:text-white transition font-semibold"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block px-4 py-3 dark:text-gray-300 hover:bg-gray-700 hover:text-white transition font-semibold"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuDropDown;
