import type { Config } from "tailwindcss";
import type { PluginAPI } from "tailwindcss/types/config";

/**
 * Interface for the Recast Tailwind Plugin
 */
export interface RecastComponent {
  base?: string | string[];
  variants?: Record<string, Record<string, string | string[]>>;
  breakpoints?: string[];
}

export interface RecastTailwindPlugin {
  handler: (api: PluginAPI) => void;
  config?: Partial<Config>;
  __pluginResult?: {
    extractedComponents: Record<string, RecastComponent>;
    safelist: string[];
  };
}
