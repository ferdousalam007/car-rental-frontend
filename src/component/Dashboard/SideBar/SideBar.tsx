import { Link, NavLink, useNavigate } from "react-router-dom";
import { Layout, Menu, Avatar as AntdAvatar } from "antd";
import { LogoutOutlined, HomeOutlined } from "@ant-design/icons";
import { useAppDispatch } from "../../../redux/hooks";
import { logOut } from "../../../redux/features/Auth/AuthSlice";
import { authApi } from "../../../redux/features/Auth/authApi";
import AdminMenu from "./AdimMenu/AdminMenu";
import UserMenu from "./UserMenu/UserMenu";
import ThemeMenu from "@/shared/Navbar/ThemeMenu";

const { Sider } = Layout;

const SideBar = ({
  collapsed,
  onToggle,
}: {
  collapsed: boolean;
  onToggle: () => void;
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data: profileData } = authApi.useGetMeQuery(undefined);
  const user = profileData?.data;

  const handleLogOut = () => {
    dispatch(logOut());
    navigate("/");
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onToggle}
      className="bg-gray-200 z-10"
      width={270}
      style={{ position: "fixed", height: "100%", transition: "width 0.3s" }} // Fixed position and full height
    >
      {/* Logo Section */}
      <div className="flex items-center justify-center pt-8 pb-4 bg-white dark:bg-gray-900">
        <Link to="/">
          <h2 className="dark:text-white font-bold text-2xl">
            Rent
            <span className="text-white bg-yellow-600 px-2 rounded">O</span>
          </h2>
        </Link>
      </div>

      {/* Avatar & User Info */}
      <div className="flex flex-col items-center pt-6 bg-white dark:bg-gray-900">
        <Link to="/">
          <AntdAvatar
            size={collapsed ? "small" : 96}
            src={user?.image || "https://i.ibb.co/0Q7nYBq/company.png"}
            className="border border-gray-300"
          />
        </Link>
        {!collapsed && (
          <>
            <Link to="/dashboard">
              <h4 className="mt-2 font-bold text-text-primary">{user?.name}</h4>
            </Link>
            <Link to="/dashboard">
              <p className="text-sm text-gray-600 dark:text-white">
                {user?.userEmail}
              </p>
            </Link>
          </>
        )}
      </div>

      {/* Menu Items Wrapper with Scrolling */}
      <div
        className="bg-white dark:bg-gray-900"
        style={{ overflowY: "auto", height: "calc(100vh - 150px)" }}
      >
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["1"]}
          className="mt-4 custom-menu"
          style={{
            borderRight: "none",
            padding: collapsed ? "0" : "10px 0",
          }}
        >
          {/* Render Admin or User Menu based on collapsed state */}
          {user?.role === "admin" ? (
            <AdminMenu collapsed={collapsed ?? false} />
          ) : (
            <UserMenu collapsed={collapsed ?? false} />
          )}

          <div className="px-2">
            <div className="flex gap-2 justify-start pl-5 hover:bg-[#e0e0e0] p-3 rounded">
              <HomeOutlined />
              <NavLink
                className="dark:text-white w-full hover:text-[#000] pt-2"
                style={{ display: collapsed ? "none" : "block" }}
                to="/"
              >
                Home
              </NavLink>
            </div>
          </div>

          <Menu.Item
            key="2"
            icon={<LogoutOutlined />}
            onClick={handleLogOut}
            className="rounded-lg"
          >
            {!collapsed && "Logout"} {/* Show text only when not collapsed */}
          </Menu.Item>
          <ThemeMenu />
        </Menu>
      </div>
    </Sider>
  );
};

export default SideBar;
