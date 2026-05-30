import { type FC } from "react";
import type { CardModule } from "../types/config";

interface CardViewProps {
  module: CardModule;
  onSelectPassage: (filePath: string) => void;
}

const CardView: FC<CardViewProps> = ({ module, onSelectPassage }) => {
  return (
    <div style={{ maxWidth: "48rem", margin: "0 auto", padding: "48px 40px" }}>
      <h2
        style={{
          color: "var(--color-text)",
          fontSize: "1.75rem",
          fontWeight: 700,
          marginBottom: "32px",
          letterSpacing: "-0.02em",
        }}
      >
        {module.moduleName}
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "24px",
        }}
      >
        {module.inCard.map((card, idx) => {
          const hasCover = card.passageCover && card.passageCover.trim().length > 0;

          return (
            <article
              key={idx}
              onClick={() => onSelectPassage(card.filePath)}
              style={{
                cursor: "pointer",
                borderRadius: "var(--radius-md)",
                backgroundColor: "var(--color-card-bg)",
                border: `1px solid var(--color-border-light)`,
                boxShadow: "var(--shadow-xs)",
                transition: "all 0.25s ease",
                overflow: "hidden",
                padding: hasCover ? "0" : "28px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "var(--shadow-md)";
                e.currentTarget.style.borderColor = "var(--color-accent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "var(--shadow-xs)";
                e.currentTarget.style.borderColor = "var(--color-border-light)";
              }}
            >
              {hasCover && (
                <div
                  style={{
                    width: "100%",
                    height: "180px",
                    overflow: "hidden",
                    backgroundColor: "var(--color-bg-secondary)",
                  }}
                >
                  <img
                    src={card.passageCover}
                    alt={card.passageTitle}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.style.display = "none";
                    }}
                  />
                </div>
              )}
              <div style={{ padding: hasCover ? "20px 24px 24px" : "0" }}>
                <h3
                  style={{
                    color: "var(--color-text)",
                    fontSize: "1.15rem",
                    fontWeight: 600,
                    marginBottom: "10px",
                  }}
                >
                  {card.passageTitle}
                </h3>
                <p
                  style={{
                    color: "var(--color-text-secondary)",
                    fontSize: "0.9rem",
                    lineHeight: 1.65,
                    marginBottom: "18px",
                  }}
                >
                  {card.passageDescription}
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    fontSize: "0.8rem",
                    color: "var(--color-text-muted)",
                    paddingTop: "16px",
                    borderTop: `1px solid var(--color-border-light)`,
                  }}
                >
                  <span>{card.passageAuthor}</span>
                  <span>{card.publishDate}</span>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default CardView;
