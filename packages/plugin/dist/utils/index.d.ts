interface RecastComponent {
    base?: string | string[] | Record<string, string | string[]>;
    variants?: Record<string, Record<string, string | string[] | Record<string, string | string[]>>>;
}
interface RecastUsage {
    componentName: string;
    props: Record<string, any>;
}
declare function parseRecastComponents(content: string): Record<string, RecastComponent>;
declare function parseRecastUsages(content: string): RecastUsage[];
declare function parseProps(propsString: string): Record<string, any>;
declare function getFilePatterns(contentConfig: any): string[];
declare function addToSafelist(safelist: Set<string>, classes: string | string[] | Record<string, string | string[]>, prefix?: string): void;

export { type RecastComponent, type RecastUsage, addToSafelist, getFilePatterns, parseProps, parseRecastComponents, parseRecastUsages };
