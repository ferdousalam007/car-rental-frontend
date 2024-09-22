
import { Link } from "react-router-dom";
import Avatar from "./Avater";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../redux/hooks";
// import { logOut, useCurrentToken } from "../../redux/features/Auth/authSlice";
import { logOut, useCurrentToken } from "../../redux/features/Auth/AuthSlice";
import { verifyToken } from "../../utils/verifyToken";
import { JwtPayload } from "jsonwebtoken";

interface CustomJwtPayload extends JwtPayload {
  role: string;
}

const MenuDropDown = () => {
 
  const dispatch = useDispatch();
  const token = useAppSelector(useCurrentToken);

 

  



  const handleLogOut = () => {
    dispatch(logOut());
  };

  let user;
  if (token) {
    user = verifyToken(token) as CustomJwtPayload;
  }

  return (
    <div className="">
      <div className="text-sm">
        <div className="flex gap-3 cursor-pointer">
          {user ? (
            <>
              <Link
                to={
                  user.role === "admin"
                    ? "/dashboard/admin-profile-view"
                    : "/dashboard/profile-view"
                }
                className="px-4 py-3 dark:text-gray-300 hover:bg-gray-700 hover:text-white transition font-semibold"
              >
                Dashboard
              </Link>
              <div
                onClick={handleLogOut}
                className="px-4 py-3 dark:text-gray-300 hover:bg-gray-700 hover:text-white transition font-semibold cursor-pointer"
              >
                Logout
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-3 dark:text-gray-300 hover:bg-gray-700 hover:text-white transition font-semibold"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-3 dark:text-gray-300 hover:bg-gray-700 hover:text-white transition font-semibold"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuDropDown;
