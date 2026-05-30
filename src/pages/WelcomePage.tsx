import { type FC } from "react";

const WelcomePage: FC = () => {
  return (
    <div
      className="flex flex-col items-center justify-center h-full text-center"
      style={{ padding: "64px 32px" }}
    >
      <div
        style={{
          width: "80px",
          height: "80px",
          borderRadius: "var(--radius-lg)",
          background: "var(--color-accent-soft)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "28px",
        }}
      >
        <svg
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      </div>
      <h2
        style={{
          fontSize: "1.75rem",
          fontWeight: 700,
          color: "var(--color-text)",
          marginBottom: "12px",
          letterSpacing: "-0.02em",
        }}
      >
        Welcome
      </h2>
      <p
        style={{
          color: "var(--color-text-secondary)",
          fontSize: "1.05rem",
          maxWidth: "380px",
          lineHeight: 1.7,
        }}
      >
        Select a module from the sidebar to begin reading.
      </p>
    </div>
  );
};

export default WelcomePage;
