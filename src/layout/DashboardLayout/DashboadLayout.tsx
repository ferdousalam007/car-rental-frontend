import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Layout, Button } from "antd"; // Import Button for toggling
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons"; // Icons for the toggle button
import SideBar from "../../component/Dashboard/SideBar/SideBar";

const { Content } = Layout;

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false); // State to manage collapsed sidebar

  const handleToggle = () => {
    setCollapsed((prev) => !prev); // Toggle the collapsed state
  };

  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth <= 768); // Collapse sidebar if screen width is 768px or less
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Check initial screen size

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Layout className="min-h-screen">
      {/* Sidebar */}
      <SideBar collapsed={collapsed} onToggle={handleToggle} />

      {/* Main Content */}
      <Layout
        className="site-layout"
        style={{ marginLeft: collapsed ? "80px" : "270px" }}
      >
        {/* Toggle Button */}
        <Button
          onClick={handleToggle}
          style={{ margin: "16px" }} // Adjust margins as needed
          className="bg-[#000] text-white hover:bg-[#000] hover:text-white"
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
        <Content style={{ margin: "24px 16px", overflow: "initial" }}>
          <div style={{ padding: 24, minHeight: 360 }} className="container">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
