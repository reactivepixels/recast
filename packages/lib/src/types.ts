/**
 * A record of class names, where each key maps to a string or array of strings.
 */
export type ClassNameRecord = Record<string, string | string[]>;

/**
 * A function to merge class names.
 * @param classes - The primary classes to be merged.
 * @param className - An optional additional class name to be merged.
 * @returns The merged class name string.
 */
export type MergeFn = (classes: string | string[], className?: string) => string;

/**
 * Represents null or undefined values.
 */
export type Nullish = null | undefined;

/**
 * Extracts the leaf types from a nested object type.
 */
export type Leaves<T> = {
  [K in keyof T]: T[K];
}[keyof T];

/**
 * Adds an optional `cls` prop to a component's props for Recast class object properties.
 */
export type RecastWithClassNameProps<Props extends { [K in keyof Props]: string }> = {
  /** Recast class object properties */
  cls?: { [P in keyof Props]?: string };
};

/**
 * Utility type to handle optional variants.
 */
export type MaybeVariants<V> = keyof V extends Nullish ? "variants" : "";

/**
 * Extracts modifier props from a modifier configuration object.
 */
export type ExtractModifierProps<M> = {
  [K in keyof M]?: boolean;
};

/**
 * Extracts variant props from a variant configuration object.
 */
export type ExtractVariantProps<V> = V extends object
  ? {
      [K in keyof V]?: keyof V[K] & string;
    }
  : never;

/**
 * Base props for Recast components.
 */
export type RecastProps<T> = { [K in keyof T]: T[K] } & { cls?: object };

/**
 * Configuration object for Recast styles.
 */
export interface RecastStyles<V, M, P> {
  /**
   * Default values for variants and modifiers. Defaults will only be applied
   * if the variant or modifier is not provided.
   */
  defaults?: {
    variants?: Omit<{ [K in keyof V]?: keyof V[K] }, MaybeVariants<V>>;
    modifiers?: (keyof M)[];
  };

  /**
   * Base styles for component. These will always be applied.
   */
  base?: keyof NonNullable<Leaves<P>> extends Nullish
    ? string | string[]
    :
        | string
        | string[]
        | {
            [K in keyof NonNullable<Leaves<P>>]: string | string[];
          };

  /**
   * Variants can be used to create distinct variations for a component.
   */
  variants?: {
    [K in keyof V]: Record<
      keyof V[K],
      keyof NonNullable<Leaves<P>> extends Nullish
        ? string | string[]
        :
            | string
            | string[]
            | {
                [K in keyof NonNullable<Leaves<P>>]: string | string[];
              }
    >;
  };

  /**
   * Modifiers are variations of a component that can be "mixed-in"
   * and combined with other modifiers and all variants.
   */
  modifiers?: {
    [K in keyof M]:
      | string
      | string[]
      | {
          [K in keyof NonNullable<Leaves<P>>]: string | string[];
        };
  };

  /**
   * Conditionals are a way to define conditional styles that will only be applied if certain rules are met.
   */
  conditionals?: {
    variants?: V extends object
      ? {
          [K in keyof V]?: K extends string ? keyof V[K] | Array<keyof V[K]> : never;
        }
      : never;
    modifiers?: keyof M | (keyof M)[];
    className: keyof NonNullable<Leaves<P>> extends Nullish
      ? string | string[]
      :
          | string
          | string[]
          | {
              [K in keyof NonNullable<Leaves<P>>]: string | string[];
            };
  }[];
}

/**
 * Loosley typed for usage as arguments to different utility methods
 */
export interface RelaxedStyles {
  base?: string | string[] | ClassNameRecord;
  variants?: {
    [key: string]: {
      [key: string]: string | string[] | ClassNameRecord;
    };
  };
  modifiers?: {
    [key: string]: string | string[] | ClassNameRecord;
  };
  conditionals?: Array<{
    variants?: { [key: string]: string };
    modifiers?: string | string[];
    className: string | string[] | ClassNameRecord;
  }>;
  defaults?: {
    variants?: { [key: string]: string };
    modifiers?: string[];
  };
}

/**
 * Relaxed version of default styles for internal use.
 */
export type RelaxedDefaults = { variants?: Record<string, string>; modifiers?: string[] };

/**
 * Relaxed version of base styles for internal use.
 */
export type RelaxedBase = string | string[] | Record<string, string | string[]>;

/**
 * Relaxed version of conditional styles for internal use.
 */
export type RelaxedCondition = {
  variants?: Record<string, string | string[]>;
  modifiers?: string | string[];
  className: string | string[] | Record<string, string | string[]>;
};

/**
 * Props returned by getRecastClasses function.
 */
export type RelaxedRecastStyleProps = {
  className: string;
  cls: ClassNameRecord;
};

/**
 * Relaxed version of variant props for internal use.
 */
export type RelaxedVariantProps = {
  [key: string]: string;
};

/**
 * Relaxed version of modifier props for internal use.
 */
export type RelaxedModifierProps = {
  [key: string]: boolean;
};
