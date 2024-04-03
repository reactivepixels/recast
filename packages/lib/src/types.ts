/**
 * Recast utility types
 */
export type ClassNameRecord = Record<string, string | string[]>;
export type MergeFn = (classes: string | string[], className?: string) => string;
export type Nullish = null | undefined;

export type Leaves<T> = {
  [K in keyof T]: T[K];
}[keyof T];

export type RecastWithClassNameProps<Props extends { [K in keyof Props]: string }> = {
  /** Recast class object properties */
  rcx?: { [P in keyof Props]?: string };
};

/*
 * Strongly typed Recast generic types
 */
export type MaybeVariants<V> = keyof V extends Nullish ? "variants" : "";
export type ExtractModifierProps<M> = { [K in keyof M]?: boolean };
export type ExtractVariantProps<V> = V extends object
  ? {
      [K in keyof V]?: K extends string ? keyof V[K] : never;
    }
  : never;

export type RecastProps<T> = { [K in keyof T]: T[K] } & { rcx?: object };

export type RecastStyles<V, M, P> = {
  /**
   * Default values for variants and modifiers. Defaults will only be applied
   * if the variant or modifier is not provided.
   * {@link https://reactivepixels.github.io/recast/theming#set-some-defaults | See docs}.
   *
   * @example
   * ```ts
   * defaults: {
   *  variants: { variant: "primary", size: "md" },
   * }
   * ```
   */
  defaults?: {
    variants?: Omit<{ [K in keyof V]?: keyof V[K] }, MaybeVariants<V>>;
    modifiers?: (keyof M)[];
  };

  /**
   * Base styles for component. These will always be applied.
   * {@link https://reactivepixels.github.io/recast/theming#add-base-styles | See docs}.
   *
   * @example
   * ```ts
   * { base: "bg-blue-500 rounded-md" }
   * ```
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
   * {@link https://reactivepixels.github.io/recast/theming#add-variants | See docs}.
   *
   * @example
   * ```ts
   * variants: {
   *  size: {
   *    sm: "text-sm",
   *    md: "text-md",
   *    lg: "text-lg"
   *  }
   * }
   * ```
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
   * {@link https://reactivepixels.github.io/recast/theming#add-modifiers | See docs}.
   *
   * @example
   * ```ts
   * modifiers: {
   *  block: "w-full",
   *  floating: "shadow-lg",
   *  pill: "rounded-full px-8",
   * }
   * ```
   */
  modifiers?: {
    [K in keyof M]: keyof NonNullable<Leaves<P>> extends Nullish
      ? string | string[]
      :
          | string
          | string[]
          | {
              [K in keyof NonNullable<Leaves<P>>]: string | string[];
            };
  };

  /**
   * Conditonals are a way to define conditional styles that will only be applied if certain rules are met.
   * {@link https://reactivepixels.github.io/recast/theming#add-conditional-styles | See docs}.
   *
   * @example
   * ```ts
   * conditionals: [
   *  {
   *    variants: { size: "lg" },
   *    modifiers: ["floating"],
   *    className: "border-4 border-blue-500 text-white",
   *  },
   * ]
   * ```
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
};

/**
 * Loosley typed for usage as arguments to different utility methods
 */
export type RelaxedStyles = {
  defaults?: RelaxedDefaults;
  base?: RelaxedBase;
  variants?: Record<string, Record<string, string | string[] | Record<string, string | string[]>>>;
  modifiers?: Record<string, string | string[] | Record<string, string | string[]>>;
  conditionals?: RelaxedCondiiton[];
};

export type RelaxedDefaults = { variants?: Record<string, string>; modifiers?: string[] };
export type RelaxedBase = string | string[] | Record<string, string | string[]>;

export type RelaxedCondiiton = {
  variants?: Record<string, string | string[]>;
  modifiers?: string | string[];
  className: string | string[] | Record<string, string | string[]>;
};

export type RelaxedRecastStyleProps = {
  className: string;
  rcx: ClassNameRecord;
};

export type RelaxedVariantProps = Record<string, string>;
export type RelaxedModifierProps = string[];
