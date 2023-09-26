import { RecastClientOptions } from "./types";

// Set the default values for any Recast client options
export const DEFAULT_RECAST_CLIENT_OPTIONS: Required<RecastClientOptions> = {
  viewports: { sm: 640, md: 768, lg: 1024, xl: 1280 },
  delay: 0, // ms
};
