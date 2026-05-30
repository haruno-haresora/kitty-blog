import { useState, useCallback, type FC } from "react";
import { useNavigate } from "react-router-dom";
import type { SidebarModule, DirectoryModule, FileModule, CardModule } from "../types/config";

interface SidebarProps {
  modules: SidebarModule[];
  copyrightInfo: string;
  avatarPath: string;
  websiteAuthor: string;
  collapsed: boolean;
  onClose: () => void;
}

function isDirectory(m: SidebarModule): m is DirectoryModule {
  return m.moduleStyle === "directory";
}

function isFile(m: SidebarModule): m is FileModule {
  return m.moduleStyle === "file";
}

function isCard(m: SidebarModule): m is CardModule {
  return m.moduleStyle === "card";
}

const itemStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  width: "100%",
  textAlign: "left",
  padding: "10px 14px",
  margin: "0 8px",
  borderRadius: "var(--radius-sm)",
  transition: "all 0.15s ease",
  cursor: "pointer",
  border: "none",
  background: "transparent",
  fontFamily: "inherit",
};

const SubModuleItem: FC<{
  module: SidebarModule;
  depth: number;
  onClose: () => void;
}> = ({ module, depth, onClose }) => {
  const [expanded, setExpanded] = useState(true);
  const navigate = useNavigate();

  const handleFileClick = useCallback(
    (filePath: string) => {
      navigate(`/read/${filePath.replace(/^\.\//, "")}`);
      onClose();
    },
    [navigate, onClose]
  );

  const handleCardClick = useCallback(
    (cardModule: CardModule) => {
      navigate(`/cards/${encodeURIComponent(cardModule.moduleName)}`);
      onClose();
    },
    [navigate, onClose]
  );

  if (isDirectory(module)) {
    return (
      <div style={{ marginBottom: "2px" }}>
        <button
          onClick={() => setExpanded((v) => !v)}
          style={{
            ...itemStyle,
            paddingLeft: `${16 + depth * 18}px`,
            color: "var(--color-text-secondary)",
            fontSize: "12px",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.6px",
            width: "calc(100% - 16px)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--color-sidebar-hover)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
          }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            style={{
              transform: expanded ? "rotate(90deg)" : "rotate(0deg)",
              transition: "transform 0.2s ease",
              flexShrink: 0,
              opacity: 0.7,
            }}
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
          {module.moduleName}
        </button>
        {expanded && (
          <div style={{ marginTop: "2px" }}>
            {module.inDirectory.map((sub, idx) => (
              <SubModuleItem
                key={idx}
                module={sub}
                depth={depth + 1}
                onClose={onClose}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  if (isFile(module)) {
    return (
      <button
        onClick={() => handleFileClick(module.dir)}
        style={{
          ...itemStyle,
          paddingLeft: `${16 + depth * 18}px`,
          color: "var(--color-text)",
          fontSize: "14px",
          fontWeight: 400,
          width: "calc(100% - 16px)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "var(--color-sidebar-hover)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "transparent";
        }}
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          style={{ flexShrink: 0, opacity: 0.5 }}
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
        {module.moduleName}
      </button>
    );
  }

  if (isCard(module)) {
    return (
      <button
        onClick={() => handleCardClick(module)}
        style={{
          ...itemStyle,
          paddingLeft: `${16 + depth * 18}px`,
          color: "var(--color-text)",
          fontSize: "14px",
          fontWeight: 400,
          width: "calc(100% - 16px)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "var(--color-sidebar-hover)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "transparent";
        }}
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          style={{ flexShrink: 0, opacity: 0.5 }}
        >
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
        </svg>
        {module.moduleName}
      </button>
    );
  }

  return null;
};

const Sidebar: FC<SidebarProps> = ({ modules, copyrightInfo, avatarPath, websiteAuthor, collapsed, onClose }) => {
  if (collapsed) {
    return null;
  }

  return (
    <>
      <div
        className="fixed top-[52px] inset-x-0 bottom-0 z-20 md:hidden"
        style={{
          backgroundColor: "var(--color-overlay)",
          backdropFilter: "blur(2px)",
        }}
        onClick={onClose}
      />
      <aside
        className="flex flex-col fixed top-[52px] left-0 bottom-0 w-[272px] md:relative md:top-auto md:left-auto md:bottom-auto md:shrink-0 overflow-hidden z-30 transition-all duration-300"
        style={{
          backgroundColor: "var(--color-sidebar-bg)",
          borderRight: `1px solid var(--color-border-light)`,
        }}
      >
        <div
          className="flex items-center justify-between shrink-0"
          style={{ padding: "18px 20px 14px" }}
        >
          <span
            style={{
              color: "var(--color-text-muted)",
              fontSize: "11px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            Navigation
          </span>
          <button
            onClick={onClose}
            className="flex items-center justify-center cursor-pointer border-none bg-transparent md:hidden"
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "var(--radius-sm)",
              color: "var(--color-text-muted)",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto" style={{ padding: "6px 0 16px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "8px 20px 20px",
            }}
          >
            <div
              style={{
                width: "72px",
                height: "72px",
                borderRadius: "var(--radius-full)",
                overflow: "hidden",
                marginBottom: "12px",
                border: `2px solid var(--color-border-light)`,
                boxShadow: "var(--shadow-sm)",
                backgroundColor: "var(--color-surface)",
              }}
            >
              <img
                src={avatarPath}
                alt={websiteAuthor}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = "none";
                  target.parentElement!.style.display = "flex";
                  target.parentElement!.style.alignItems = "center";
                  target.parentElement!.style.justifyContent = "center";
                  target.parentElement!.style.fontSize = "28px";
                  target.parentElement!.style.fontWeight = "700";
                  target.parentElement!.style.color = "var(--color-accent)";
                  target.parentElement!.textContent =
                    websiteAuthor.charAt(0).toUpperCase();
                }}
              />
            </div>
            <span
              style={{
                color: "var(--color-text)",
                fontSize: "14px",
                fontWeight: 600,
              }}
            >
              {websiteAuthor}
            </span>
          </div>
          {modules.map((mod, idx) => (
            <SubModuleItem
              key={idx}
              module={mod}
              depth={0}
              onClose={onClose}
            />
          ))}
        </nav>

        <div
          className="shrink-0 text-center"
          style={{
            padding: "16px 20px",
            borderTop: `1px solid var(--color-border-light)`,
          }}
        >
          <span
            style={{
              color: "var(--color-text-muted)",
              fontSize: "11px",
              lineHeight: 1.5,
            }}
          >
            {copyrightInfo}
          </span>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
