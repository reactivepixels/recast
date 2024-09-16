/**
 * @fileoverview Tailwind CSS configuration with Recast plugin integration
 * @requires @rpxl/recast-plugin
 */
import "@rpxl/recast";
import { breakpoints } from "../tailwind.config";

/**
 * Type definition for user breakpoints
 * @typedef {RecastBreakpoints<typeof breakpoints>} UserBreakpoints
 */
type BreakpointKeys = keyof typeof breakpoints;

/**
 * Module augmentation for @rpxl/recast
 * Extends the RecastBreakpoints interface with custom user breakpoints
 * @module "@rpxl/recast"
 */
declare module "@rpxl/recast" {
  export interface RecastBreakpoints extends Record<BreakpointKeys, string> {}
}
