import { useState } from "react";
import { AiOutlineBars } from "react-icons/ai";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { GrLogout } from "react-icons/gr";
import { useAppDispatch } from "../../../redux/hooks";
// import { logOut } from "../../../redux/features/Auth/AuthSlice";
import { logOut } from "../../../redux/features/Auth/AuthSlice";

import Avatar from "../../../shared/Navbar/Avater";
import UserMenu from "./UserMenu/UserMenu";
import Logo from "../../../shared/Navbar/Logo";
import AdminMenu from "./AdimMenu/AdminMenu";
import { FaHome } from "react-icons/fa";
import { authApi } from "../../../redux/features/Auth/authApi";

const SideBar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isActive, setActive] = useState<boolean>(false);
  // const token = useAppSelector(useCurrentToken);
  // let user;

  // if (token) {
  //   user = verifyToken(token);
  // }

  // const profile = user?.image;
  const { data: profileData } = authApi.useGetMeQuery(undefined);
  const user = profileData?.data;

  //   sidebar responsive handler
  const handleToggle = () => {
    setActive(!isActive);
  };

  const handleLogOut = () => {
    dispatch(logOut());
    navigate("/");
  };

  return (
    <>
      {/* Small Screen Navbar */}
      <div className="bg-[#F7F7F7] text-gray-800 flex justify-between md:hidden">
        <div>
          <div className="block cursor-pointer p-4 font-bold">
            <Avatar />
          </div>
        </div>

        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-200"
        >
          <AiOutlineBars className="h-5 w-5" />
        </button>
      </div>
      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-[#fff] dark:bg-slate-700 shadow-lg border-r-2 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          {/* Branding & Profile Info */}
          <div>
            <div className="w-full hidden md:flex py-2 justify-center items-center  shadow-md mx-auto">
              <Logo />
            </div>
            <div className="flex flex-col items-center mt-6 -mx-2">
              <Link to="/">
                <img
                  className="object-cover w-24 h-24 mx-2 rounded"
                  src={user?.image || "https://i.ibb.co/0Q7nYBq/company.png"}
                  alt="avatar"
                  referrerPolicy="no-referrer"
                />
              </Link>
              <Link to="/dashboard">
                <h4 className="mx-2 mt-2 font-bold text-yellow-800 dark:text-white hover:underline">
                  {user?.name}
                </h4>
              </Link>
              <Link to="/dashboard">
                <p className="mx-2 mt-1 text-sm font-medium text-gray-600 dark:text-white hover:underline">
                  {user?.userEmail}
                </p>
              </Link>
            </div>
          </div>

          {/* Nav Items */}

          <div>{user?.role === "admin" ? <AdminMenu /> : <UserMenu />}</div>
        </div>

        <div>
          <hr />
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                isActive ? "bg-gray-300  text-gray-700" : "text-gray-600"
              }`
            }
          >
            <FaHome className="w-5 h-5 text-gray-700 dark:text-white" />

            <span className="mx-4 font-medium text-gray-700 dark:text-white">
              Home
            </span>
          </NavLink>
          <button
            onClick={handleLogOut}
            className="flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform"
          >
            <GrLogout className="w-5 h-5" />

            <span className="mx-4 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default SideBar;
