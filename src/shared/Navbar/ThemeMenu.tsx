import React from "react";
import { Menu, Dropdown } from "antd";
import { useDispatch, useSelector } from "react-redux";
// import { setThemeMode } from "../../redux/features/theme/themeSlice";
import { DownOutlined } from "@ant-design/icons";
import { RootState } from "@/redux/store";
import { setThemeMode } from "@/redux/features/theme/tehemeSlice";

interface MenuClickEventHandler {
  key: string;
  keyPath: string[];
  item: React.ReactInstance;
  domEvent: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>;
}

const ThemeMenu = () => {
  const dispatch = useDispatch();
  const currentTheme = useSelector((state: RootState) => state.theme.mode);

  const handleMenuClick = ({ key }: MenuClickEventHandler) => {
    dispatch(setThemeMode(key as "system" | "light" | "dark"));
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="system">System</Menu.Item>
      <Menu.Item key="light">Light</Menu.Item>
      <Menu.Item key="dark">Dark</Menu.Item>
    </Menu>
  );

  return (
    <div className="flex justify-between items-center p-4">
      <Dropdown overlay={menu} trigger={["click"]}>
        <a className="ant-dropdown-link cursor-pointer flex items-center gap-2">
          Theme - {currentTheme.toUpperCase()} <DownOutlined />
        </a>
      </Dropdown>
    </div>
  );
};

export default ThemeMenu;
