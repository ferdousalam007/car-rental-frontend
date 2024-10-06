import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logOut } from "../../redux/features/Auth/AuthSlice";
interface MobileDropdownProps {
  onClick?: () => void;
}
const MobileDropdown: React.FC<MobileDropdownProps> = ({
  onClick,

}) => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(logOut());
    navigate("/");
  };
  return (
    <div className="block md:hidden">
      <div className="rounded ">
        {user ? (
          <>
            <Link
              onClick={onClick}
              to={
                user.role === "admin"
                  ? "/dashboard/admin-profile-view"
                  : "/dashboard/profile-view"
              }
              className="dark:text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Dashboard
            </Link>
            <div onClick={onClick}>
              <div
                onClick={handleLogOut}
                className="dark:text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Logout
              </div>
            </div>
          </>
        ) : (
          <>
            <Link
              onClick={onClick}
              to="/login"
              className="dark:text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Login
            </Link>
            <Link
              onClick={onClick}
              to="/register"
              className="dark:text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
export default MobileDropdown;
