import React from "react";
import { Menu, Dropdown } from "antd";
import { useDispatch, useSelector } from "react-redux";
// import { setThemeMode } from "../../redux/features/theme/themeSlice";
import { DownOutlined } from "@ant-design/icons";
import { RootState } from "@/redux/store";
import { setThemeMode } from "@/redux/features/theme/tehemeSlice";
import { FaLaptop, FaSun, FaMoon } from "react-icons/fa6";
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
          {currentTheme === "system" ? (
            <span className="text-yellow-500">
              <FaLaptop />
            </span>
          ) : currentTheme === "light" ? (
            <span className="text-yellow-500">
              <FaSun />
            </span>
          ) : (
            <span className="text-yellow-500">
              <FaMoon />
            </span>
          )}
          <span
            className={`text-black dark:text-yellow-500 ${
              currentTheme === "system" ? "text-gray-500" : ""
            }`}
          >
            {currentTheme.toUpperCase()}
          </span>{" "}
          <DownOutlined
            className={`text-black dark:text-yellow-500 ${
              currentTheme === "system" ? "text-gray-500" : ""
            }`}
          />
        </a>
      </Dropdown>
    </div>
  );
};

export default ThemeMenu;
