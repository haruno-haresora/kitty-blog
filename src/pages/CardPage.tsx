import { type FC } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useConfig, findCardModule } from "../hooks/useConfig";
import CardView from "../components/CardView";

const CardPage: FC = () => {
  const { moduleName } = useParams<{ moduleName: string }>();
  const config = useConfig();
  const navigate = useNavigate();

  const module = moduleName ? findCardModule(config, decodeURIComponent(moduleName)) : undefined;

  if (!module) {
    return (
      <div
        style={{
          padding: "80px 32px",
          textAlign: "center",
          color: "var(--color-text-muted)",
        }}
      >
        <p>Module not found: {moduleName}</p>
      </div>
    );
  }

  return (
    <CardView
      module={module}
      onSelectPassage={(filePath: string) => {
        navigate(`/read/${filePath.replace(/^\.\//, "")}`);
      }}
    />
  );
};

export default CardPage;
