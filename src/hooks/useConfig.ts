import { createContext, useContext } from "react";
import type { BlogConfig, CardModule } from "../types/config";
import configData from "../../config.json";

const typedConfig = configData as unknown as BlogConfig;

export const ConfigContext = createContext<BlogConfig>(typedConfig);

export function useConfig(): BlogConfig {
  return useContext(ConfigContext);
}

export function findCardModule(
  config: BlogConfig,
  moduleName: string
): CardModule | undefined {
  for (const mod of config.sidebar) {
    if (mod.moduleStyle === "card" && mod.moduleName === moduleName) {
      return mod as CardModule;
    }
    if (mod.moduleStyle === "directory") {
      for (const sub of mod.inDirectory) {
        if (sub.moduleStyle === "card" && sub.moduleName === moduleName) {
          return sub as CardModule;
        }
        if (sub.moduleStyle === "directory") {
          for (const inner of sub.inDirectory) {
            if (
              inner.moduleStyle === "card" &&
              inner.moduleName === moduleName
            ) {
              return inner as CardModule;
            }
          }
        }
      }
    }
  }
  return undefined;
}
