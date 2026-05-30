import { type FC } from "react";
import { useParams } from "react-router-dom";
import MarkdownRenderer from "../components/MarkdownRenderer";

const FilePage: FC = () => {
  const params = useParams();
  const filePath = `/${params["*"] || ""}`;

  return <MarkdownRenderer filePath={filePath} />;
};

export default FilePage;
