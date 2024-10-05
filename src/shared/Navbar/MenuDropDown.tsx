
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../redux/hooks";
import { logOut, useCurrentToken } from "../../redux/features/Auth/AuthSlice";
import { verifyToken } from "../../utils/verifyToken";
import { JwtPayload } from "jsonwebtoken";
import { Dropdown, Menu, Button } from "antd";
import { FaAngleDown } from "react-icons/fa6";

interface CustomJwtPayload extends JwtPayload {
  role: string;
}

const MenuDropDown = () => {
  const dispatch = useDispatch();
  const token = useAppSelector(useCurrentToken);

  const handleLogOut = () => {
    dispatch(logOut());
  };

  // The isOpen state is not used, so we can remove it.

  let user;
  if (token) {
    user = verifyToken(token) as CustomJwtPayload;
  }

  const menu = (
    <Menu>
      {user ? (
        <>
          <Menu.Item key="dashboard">
            <Link
              to={
                user.role === "admin"
                  ? "/dashboard/admin-profile-view"
                  : "/dashboard/profile-view"
              }
            >
              Dashboard
            </Link>
          </Menu.Item>
          <Menu.Item key="logout" onClick={handleLogOut}>
            Logout
          </Menu.Item>
        </>
      ) : (
        <>
          <Menu.Item key="login">
            <Link to="/login">Login</Link>
          </Menu.Item>
          <Menu.Item key="register">
            <Link to="/register">Sign Up</Link>
          </Menu.Item>
        </>
      )}
    </Menu>
  );

  return (
    <div className="relative hidden md:block">
      <Dropdown
        overlay={menu}
        trigger={["click"]}
    
      >
        <Button className="flex items-center gap-3 cursor-pointer">
          <FaAngleDown className="text-yellow-700 text-xl dark:text-gray-300" />
        </Button>
      </Dropdown>
    </div>
  );
};

export default MenuDropDown;
