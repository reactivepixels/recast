import "@rpxl/recast";
import { breakpoints } from "../tailwind.config";

type BreakpointKeys = keyof typeof breakpoints;

declare module "@rpxl/recast" {
  export interface RecastBreakpoints extends Record<BreakpointKeys, string> {}
}

// import "@rpxl/recast";

// declare module "@rpxl/recast" {
//   export interface RecastBreakpoints {
//     tiny: string;
//     huge: string;
//   }
// }
