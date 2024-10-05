import { Menu } from "antd";
import {
  UserOutlined,
  CarOutlined,
  HistoryOutlined,
  DownOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";

const AdminMenu = ({ collapsed }: { collapsed: boolean }) => {
  const menuItems = [
    {
      key: "userProfile",
      label: "User Profile",
      icon: <UserOutlined />,
      link: "/dashboard/admin-profile-view",
    },
    {
      key: "manageBookings",
      label: "Manage Bookings",
      icon: <UnorderedListOutlined />,
      children: [
        {
          key: "allBookings",
          label: "All Bookings",
          link: "/dashboard/admin-bookings",
        },
      ],
    },
    {
      key: "userManagement",
      label: "User Management",
      icon: <HistoryOutlined />,
      children: [
        {
          key: "allUsers",
          label: "All Users",
          link: "/dashboard/all-users",
        },
      ],
    },
    {
      key: "carManagement",
      label: "Car Management",
      icon: <CarOutlined />,
      children: [
        {
          key: "addCar",
          label: "Add Cars",
          link: "/dashboard/add-car",
        },
        {
          key: "allCars",
          label: "All Cars",
          link: "/dashboard/all-cars",
        },
      ],
    },
  ];

  return (
    <Menu
      theme="light"
      mode="inline"
      defaultSelectedKeys={["userProfile"]}
      className="mt-4"
      style={{
        borderRight: "none",
        padding: collapsed ? "0" : "10px 0",
      }}
    >
      {menuItems.map((item) =>
        item.children ? (
          <Menu.SubMenu
            key={item.key}
            title={
              <span>
                {item.icon}
                <span>{item.label}</span>
              </span>
            }
            icon={<DownOutlined />}
          >
            {item.children.map((child) => (
              <Menu.Item key={child.key}>
                <NavLink to={child.link}>{child.label}</NavLink>
              </Menu.Item>
            ))}
          </Menu.SubMenu>
        ) : (
          <Menu.Item key={item.key} icon={item.icon}>
            <NavLink to={item.link}>{item.label}</NavLink>
          </Menu.Item>
        )
      )}
    </Menu>
  );
};

export default AdminMenu;
