import type { RelaxedRecastStyleProps } from "./types.js";

/**
 * Default Recast style props.
 * This constant provides an initial empty state for Recast style properties.
 * It's used as a fallback or default value in various parts of the library
 * to ensure that there's always a valid structure for Recast styles, even
 * when no styles have been explicitly defined.
 *
 * @example
 * // This might be used in a function like:
 * function getStyles(userStyles?: RelaxedRecastStyleProps): RelaxedRecastStyleProps {
 *   return userStyles || RECAST_STYLE_PROPS;
 * }
 */
export const RECAST_STYLE_PROPS: RelaxedRecastStyleProps = { className: "", cls: {} };
