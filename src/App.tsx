import { useState, useEffect, useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import { useTheme } from "./hooks/useTheme";
import { useConfig } from "./hooks/useConfig";
import TopBar from "./components/TopBar";
import Sidebar from "./components/Sidebar";
import WelcomePage from "./pages/WelcomePage";
import FilePage from "./pages/FilePage";
import CardPage from "./pages/CardPage";

function App() {
  const config = useConfig();
  const { mode, toggle: toggleTheme } = useTheme();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

  useEffect(() => {
    document.title = config.websiteTitle;
    document.documentElement.setAttribute("data-theme", config.websiteStyle);
  }, [config]);

  const handleToggleSidebar = useCallback(() => {
    setSidebarCollapsed((v) => !v);
  }, []);

  const handleCloseSidebar = useCallback(() => {
    setSidebarCollapsed(true);
  }, []);

  return (
    <div
      className="flex flex-col h-screen overflow-hidden"
      style={{ fontFamily: "var(--font-body)" }}
    >
      <TopBar
        title={config.titleOnTopBar}
        isDark={mode === "dark"}
        sidebarCollapsed={sidebarCollapsed}
        onToggleSidebar={handleToggleSidebar}
        onToggleTheme={toggleTheme}
      />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          modules={config.sidebar}
          copyrightInfo={config.copyrightInfo}
          avatarPath={config.avatarPath}
          websiteAuthor={config.websiteAuthor}
          collapsed={sidebarCollapsed}
          onClose={handleCloseSidebar}
        />
        <main
          className="flex-1 overflow-y-auto"
          style={{ backgroundColor: "var(--color-bg)" }}
        >
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/read/*" element={<FilePage />} />
            <Route path="/cards/:moduleName" element={<CardPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
