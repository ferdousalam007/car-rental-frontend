// import React, { useEffect } from "react";
// import { useSelector } from "react-redux";
// import { RootState } from "./redux/store";
// import { ConfigProvider, theme } from "antd";
// const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const themeMode = useSelector((state: RootState) => state.theme.mode);

//   useEffect(() => {
//     const isDarkMode =
//       themeMode === "dark" ||
//       (themeMode === "system" &&
//         window.matchMedia("(prefers-color-scheme: dark)").matches);

//     if (isDarkMode) {
//       document.documentElement.classList.add("dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//     }
//   }, [themeMode]);

//   return (
//     <ConfigProvider
//       theme={{
//         algorithm:
//           themeMode === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,
//       }}
//     >
//       {children}
//     </ConfigProvider>
//   );
// };

// export default ThemeProvider;
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { ConfigProvider, theme } from "antd";
import { AliasToken } from 'antd/es/theme/interface';

interface CustomAliasToken extends AliasToken {
  colorBgInput?: string;
  colorBgButton?: string;
  colorButtonHover?: string;
}

// Then use CustomAliasToken instead of AliasToken when defining your theme

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const themeMode = useSelector((state: RootState) => state.theme.mode);

  useEffect(() => {
    const isDarkMode =
      themeMode === "dark" ||
      (themeMode === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      document.documentElement.style.colorScheme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.style.colorScheme = "light";
    }
  }, [themeMode]);

  return (
    <ConfigProvider
      theme={{
        algorithm:
          themeMode === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: "var(--color-primary)",
          colorPrimaryHover: "var(--color-primary-hover)",
          colorSuccess: "var(--color-success)",
          colorWarning: "var(--color-warning)",
          colorError: "var(--color-error)",
          colorBgContainer: "var(--color-background-primary)",
          colorBgElevated: "var(--color-background-secondary)",
          colorText: "var(--color-text-primary)",
          colorTextSecondary: "var(--color-text-secondary)",
          colorTextTertiary: "var(--color-text-tertiary)",
          colorBgInput: "var(--color-background-input)",
          colorBgButton: "var(--color-mybtn)",
          colorButtonHover: "var(--color-mybtn-hover)",
          colorBorder: "var(--color-border)",
        } as CustomAliasToken,
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default ThemeProvider;