
import { Menu } from "antd";
import { UserOutlined, HistoryOutlined, DownOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";

const UserMenu = ({ collapsed }: { collapsed: boolean }) => {
 
 

  const menuItems = [
    {
      key: "userProfile",
      label: "User Profile",
      icon: <UserOutlined />,
      link: "/dashboard/profile-view",
    },
    {
      key: "manageBookings",
      label: "Manage Bookings",
      icon: <HistoryOutlined />,
      children: [
        {
          key: "myBookings",
          label: "My Bookings",
          link: "/dashboard/all-bookings",
        },
      ],
    },
  ];

  return (
    <Menu
    
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

export default UserMenu;
