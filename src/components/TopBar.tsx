import type { FC } from "react";

interface TopBarProps {
  title: string;
  isDark: boolean;
  sidebarCollapsed: boolean;
  onToggleSidebar: () => void;
  onToggleTheme: () => void;
}

const TopBar: FC<TopBarProps> = ({
  title,
  isDark,
  sidebarCollapsed,
  onToggleSidebar,
  onToggleTheme,
}) => {
  const btnBase: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "36px",
    height: "36px",
    borderRadius: "var(--radius-sm)",
    cursor: "pointer",
    color: "var(--color-text-secondary)",
    background: "transparent",
    border: "none",
    transition: "all 0.2s ease",
  };

  return (
    <header
      className="flex items-center justify-between shrink-0 select-none z-30"
      style={{
        height: "52px",
        padding: "0 20px",
        backgroundColor: "var(--color-topbar-bg)",
        borderBottom: `1px solid var(--color-topbar-border)`,
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="flex items-center gap-3">
        {sidebarCollapsed && (
          <button
            onClick={onToggleSidebar}
            style={btnBase}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "var(--color-sidebar-hover)";
              e.currentTarget.style.color = "var(--color-text)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "var(--color-text-secondary)";
            }}
            title="Show sidebar"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        )}
        <h1
          className="text-base font-semibold tracking-tight m-0"
          style={{ color: "var(--color-text)", letterSpacing: "-0.01em" }}
        >
          {title}
        </h1>
      </div>

      <button
        onClick={onToggleTheme}
        style={btnBase}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "var(--color-sidebar-hover)";
          e.currentTarget.style.color = "var(--color-text)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "transparent";
          e.currentTarget.style.color = "var(--color-text-secondary)";
        }}
        title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      >
        {isDark ? (
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        ) : (
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        )}
      </button>
    </header>
  );
};

export default TopBar;
