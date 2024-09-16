/**
 * Logs debug information with formatted output.
 * @param {string} label - The label for the debug information.
 * @param {any} data - The data to be logged.
 */
declare function debugLog(label: string, data: any): void;
interface RecastComponent {
    base?: string | string[] | Record<string, string | string[]>;
    variants?: Record<string, Record<string, string | string[] | Record<string, string | string[]>>>;
}
interface RecastUsage {
    componentName: string;
    props: Record<string, any>;
}
/**
 * Parses Recast component definitions from the given content.
 * @param {string} content - The content to parse for Recast components.
 * @returns {Record<string, RecastComponent>} An object containing parsed Recast components.
 */
declare function parseRecastComponents(content: string): Record<string, RecastComponent>;
/**
 * Parses Recast component usages from the given content.
 * @param {string} content - The content to parse for Recast usages.
 * @returns {RecastUsage[]} An array of parsed Recast usages.
 */
declare function parseRecastUsages(content: string): RecastUsage[];
/**
 * Parses props from a string representation.
 * @param {string} propsString - The string containing props to parse.
 * @returns {Record<string, any>} An object containing parsed props.
 */
declare function parseProps(propsString: string): Record<string, any>;
/**
 * Extracts file patterns from the content configuration.
 * @param {any} contentConfig - The content configuration object.
 * @returns {string[]} An array of file patterns.
 */
declare function getFilePatterns(contentConfig: any): string[];
/**
 * Adds classes to the safelist with the given prefix.
 * @param {Set<string>} safelist - The set to add safelist items to.
 * @param {string | string[] | Record<string, string | string[]>} classes - The classes to add to the safelist.
 * @param {string} [prefix=""] - The prefix to apply to the classes.
 */
declare function addToSafelist(safelist: Set<string>, classes: string | string[] | Record<string, string | string[]>, prefix?: string): void;

export { type RecastComponent, type RecastUsage, addToSafelist, debugLog, getFilePatterns, parseProps, parseRecastComponents, parseRecastUsages };
