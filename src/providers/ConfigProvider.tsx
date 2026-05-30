import { useState, type ReactNode } from "react";
import { ConfigContext } from "../hooks/useConfig";
import type { BlogConfig } from "../types/config";
import configData from "../../config.json";

const typedConfig = configData as unknown as BlogConfig;

export function ConfigProvider({ children }: { children: ReactNode }) {
  const [config] = useState<BlogConfig>(typedConfig);
  return (
    <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
  );
}
